const API_BASE = "https://devtask-backend-s368.onrender.com/api/" || "http://localhost:8000/api"; // update if your backend uses another port
const container = document.getElementById("profile-detail");

// Helper for escaping text
function esc(str = "") {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

// Get ID from query string (?id=...)
const params = new URLSearchParams(window.location.search);
const profileId = params.get("id");

if (!profileId) {
  container.innerHTML = `<p style="color:#ff7070;text-align:center;">Profile ID not provided in URL.</p>`;
} else {
  loadProfile(profileId);
}

// Fetch and display profile
async function loadProfile(id) {
  try {
    const res = await fetch(`${API_BASE}/profiles/${id}`);
    if (!res.ok) throw new Error(`Profile not found (${res.status})`);
    const p = await res.json();

    container.innerHTML = `
      <div class="profile-header">
        <img src="${esc(p.image || "https://via.placeholder.com/90x90.png?text=User")}" alt="Profile image" />
        <div class="profile-main-info">
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.title || "No title provided")}</p>
          <p>${esc(p.company || "")} • ${esc(p.location || "")}</p>
        </div>
      </div>

      <div class="about">
        <h3 class="section-title">About</h3>
        <p>${esc(p.summary || "No summary available.")}</p>
      </div>

      <div class="skills-section">
        <h3 class="section-title">Skills</h3>
        <div class="skills">
          ${(p.skills || []).map((s) => `<span class="skill">${esc(s)}</span>`).join("")}
        </div>
      </div>

      <div class="education-section">
        <h3 class="section-title">Education</h3>
        ${(p.education || [])
          .map(
            (e) => `
          <div class="edu-item">
            <h4>${esc(e.degree || "Degree")}</h4>
            <p>${esc(e.school || "")} (${esc(e.year || "")})</p>
          </div>`
          )
          .join("")}
      </div>

      <div class="experience-section">
        <h3 class="section-title">Experience</h3>
        ${(p.experience || [])
          .map(
            (exp) => `
          <div class="exp-item">
            <h4>${esc(exp.title || "Role")}</h4>
            <p>${esc(exp.company || "")} (${esc(exp.startDate || "")} - ${esc(exp.endDate || "Present")})</p>
            ${exp.description ? `<p>${esc(exp.description)}</p>` : ""}
          </div>`
          )
          .join("")}
      </div>

      <div class="contact">
        <h3 class="section-title">Contact</h3>
        <a href="mailto:${esc(p.email || "")}">${esc(p.email || "No email")}</a>
        ${
          p.website
            ? `<a href="${esc(p.website)}" target="_blank">${esc(p.website)}</a>`
            : ""
        }
        ${
          p.resume
            ? `<a href="${esc(p.resume)}" target="_blank">View Resume</a>`
            : ""
        }
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:#ff7070;text-align:center;">Error: ${err.message}</p>`;
  }
}
