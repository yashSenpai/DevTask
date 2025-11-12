export const apiBase = (window._API_BASE = window._API_BASE || 'https://https://devtask-backend-s368.onrender.com/api/');  //http://localhost:8000/api

const profilesGrid = document.getElementById('profiles-grid');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const confirmUnlockBtn = document.getElementById('confirm-unlock');
const cancelUnlockBtn = document.getElementById('cancel-unlock');
const creditsAmountEl = document.getElementById('credits-amount');
const modalCostText = document.getElementById('modal-cost-text');
const modalCost = document.getElementById('modal-cost');

let userCredits = 200;    
let selectedProfileId = null;
let unlockCost = 10;      

creditsAmountEl.textContent = userCredits;
modalCostText.textContent = unlockCost;
modalCost.textContent = unlockCost;

function esc(s){ return String(s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') }

async function loadProfiles(){
  try{
    const res = await fetch(`${apiBase}/profiles`);
    if(!res.ok) throw new Error('Failed to fetch profiles');
    const profiles = await res.json();

    profilesGrid.innerHTML = profiles.map(p => buildCardHtml(p)).join('');
    attachCardEvents();
    renderScoreRings();
  }catch(err){
    profilesGrid.innerHTML = `<div class="card"><p class="muted">Unable to load profiles — ${err.message}</p></div>`;
  }
}

function buildCardHtml(p){
  const unlocked = !!p.unlocked;
  return `
    <article class="card" data-id="${p._id}">
      <div class="card-head">
        <div class="avatar"></div>
        <div style="min-width:0">
          <div style="display:flex;align-items:center;gap:8px">
            <div class="name">${esc(p.name)}</div>
            <div class="role">${esc(p.title || '')}</div>
          </div>
          <div class="muted" style="font-size:13px;margin-top:6px">${esc(p.company || '')} • ${esc(p.location || '')}</div>
        </div>

        <div class="score-wrap">
          <div class="score-ring" style="--score: ${Math.min(100, Number(p.score ?? 80))}%"></div>
        </div>
      </div>

      <div class="card-body">
        <div class="tags">
          ${(p.skills || []).slice(0,7).map(s => `<span class="tag">${esc(s)}</span>`).join('')}
        </div>

        <div style="height:10px"></div>
        <div class="card-footer">
          <button class="reject">✖ Reject</button>

          ${unlocked 
            ? `<a class="unlock-btn" href="profile.html?id=${p._id}">View Profile</a>`
            : `<button class="unlock-btn action-unlock" data-id="${p._id}">🔒 Unlock Profile • <span class="gold">100</span></button>`
          }
        </div>
      </div>
    </article>
  `;
}

function attachCardEvents(){
  document.querySelectorAll('.action-unlock').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedProfileId = btn.dataset.id;
      unlockCost = 10;
      modalCostText.textContent = unlockCost;
      modalCost.textContent = unlockCost;
      openModal();
    });
  });

  document.querySelectorAll('.reject').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      card.style.opacity = 0.45;
      card.style.transform = 'scale(0.995)';
    });
  });
}

function openModal(){
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  selectedProfileId = null;
}

confirmUnlockBtn.addEventListener('click', async () => {
  if (!selectedProfileId) return;
  if (userCredits < unlockCost){
    alert('Insufficient credits');
    return;
  }

  try{
    const res = await fetch(`${apiBase}/profiles/unlock/${selectedProfileId}`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ unlockedBy: 'frontend-user' })
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({message:'server error'}));
      throw new Error(err.message || 'Unlock failed');
    }
    const result = await res.json();
    userCredits -= unlockCost;
    creditsAmountEl.textContent = userCredits;
    closeModal();
    await loadProfiles();
    window.location.href = `profile.html?id=${selectedProfileId}`;
  }catch(err){
    alert('Unlock failed: ' + err.message);
  }
});

cancelUnlockBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

function renderScoreRings(){
  document.querySelectorAll('.score-ring').forEach(el=>{
    const val = el.style.getPropertyValue('--score') || el.dataset.score || '80%';
    const cleaned = String(val).trim().replace('%','')||'0';
    el.style.background = `conic-gradient(var(--green) ${cleaned}%, rgba(255,255,255,0.04) ${cleaned}% 100%)`;
    el.innerHTML = `<div class="score-inner">${cleaned}%</div>`;
  });
}

loadProfiles();