import dotenv from 'dotenv'
import { connectDB } from '../db/index.db.js';
import { Profile } from '../models/profile.model.js';

dotenv.config({
    path:'./.env'
})

const profiles = [
  {
    name: 'Aisha Kapoor',
    title: 'Senior Product Designer',
    company: 'Nimbus AI',
    location: 'Bengaluru, India',
    summary: 'Designing intuitive AI-driven experiences with a focus on usability and scalable design systems.',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Interaction Design'],
    experience: [
      {
        title: 'Senior Product Designer',
        company: 'Nimbus AI',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Leading end-to-end UX for AI dashboard products, building scalable component libraries.'
      }
    ],
    education: [
      { degree: 'B.Des Interaction Design', school: 'NID Delhi', year: '2018' }
    ]
  },
  {
    name: 'Rohit Sharma',
    title: 'Product Designer',
    company: 'Insight Labs',
    location: 'Mumbai, India',
    summary: 'Crafting user-centric digital products with a strong focus on data-informed UX decisions.',
    skills: ['Figma', 'User Personas', 'Wireframing', 'UX Research', 'Design Thinking'],
    experience: [
      {
        title: 'Product Designer',
        company: 'Insight Labs',
        startDate: '2021-03',
        endDate: 'Present',
        description: 'Designing interfaces for analytics platforms, improving feature adoption by 30%.'
      }
    ],
    education: [
      { degree: 'M.Des UX Design', school: 'IDC IIT Bombay', year: '2020' }
    ]
  },
  {
    name: 'Neha Verma',
    title: 'Mid-Level Product Designer',
    company: 'PixelCraft',
    location: 'Pune, India',
    summary: 'Passionate about designing accessible and visually compelling user experiences.',
    skills: ['Figma', 'Prototyping', 'Usability Testing', 'Visual Design', 'Design Systems'],
    experience: [
      {
        title: 'Product Designer',
        company: 'PixelCraft',
        startDate: '2020-06',
        endDate: 'Present',
        description: 'Improved onboarding UX, reducing drop-off rate by 25% through iterative testing.'
      }
    ],
    education: [
      { degree: 'B.Des UX/UI', school: 'MIT Institute of Design', year: '2019' }
    ]
  },
  {
    name: 'Karan Mehta',
    title: 'Senior Product Designer',
    company: 'CloudSync',
    location: 'Gurugram, India',
    summary: 'Designing enterprise SaaS platforms with focus on usability, automation, and scalability.',
    skills: ['Figma', 'UX Strategy', 'Prototyping', 'Design Systems', 'Enterprise UX'],
    experience: [
      {
        title: 'Senior Product Designer',
        company: 'CloudSync',
        startDate: '2021-05',
        endDate: 'Present',
        description: 'Redesigned cloud management console improving task efficiency by 40%.'
      }
    ],
    education: [
      { degree: 'B.Des Product Design', school: 'IIT Guwahati', year: '2017' }
    ]
  },
  {
    name: 'Simran Kaur',
    title: 'Product Designer',
    company: 'TechNova',
    location: 'Delhi, India',
    summary: 'Blending business thinking and design to craft seamless SaaS product experiences.',
    skills: ['Figma', 'User Flows', 'Journey Mapping', 'Prototyping', 'UX Research'],
    experience: [
      {
        title: 'Product Designer',
        company: 'TechNova',
        startDate: '2020-01',
        endDate: 'Present',
        description: 'Leading product UX for SaaS tools used by 500k+ monthly users.'
      }
    ],
    education: [
      { degree: 'MBA Design Management', school: 'IIM Ahmedabad', year: '2019' }
    ]
  },
  {
    name: 'Aditya Nair',
    title: 'Mobile Product Designer',
    company: 'AppNest',
    location: 'Hyderabad, India',
    summary: 'Specializing in mobile UX, motion design, and interaction design systems.',
    skills: ['Figma', 'Motion Design', 'Prototyping', 'Mobile UX', 'Interaction Design'],
    experience: [
      {
        title: 'Product Designer',
        company: 'AppNest',
        startDate: '2022-02',
        endDate: 'Present',
        description: 'Designed cross-platform mobile UI improving retention rate by 20%.'
      }
    ],
    education: [
      { degree: 'B.Des Communication Design', school: 'SRM Institute', year: '2020' }
    ]
  },
  {
    name: 'Priya Das',
    title: 'Lead Product Designer',
    company: 'DesignHub',
    location: 'Kolkata, India',
    summary: 'Leading design strategy with expertise in UX research and high-fidelity prototyping.',
    skills: ['Figma', 'Service Design', 'UI Design', 'Interaction Design', 'Team Leadership'],
    experience: [
      {
        title: 'Lead Product Designer',
        company: 'DesignHub',
        startDate: '2019-09',
        endDate: 'Present',
        description: 'Managing a design team and driving UX strategy across client products.'
      }
    ],
    education: [
      { degree: 'B.Des Interaction Design', school: 'NID Ahmedabad', year: '2018' }
    ]
  },
  {
    name: 'Arjun Patel',
    title: 'Product Designer',
    company: 'TechSphere',
    location: 'Ahmedabad, India',
    summary: 'Generalist product designer focused on problem-solving, UX strategy, and scalable UI systems.',
    skills: ['Figma', 'Wireframing', 'Design Systems', 'Prototyping', 'User Research'],
    experience: [
      {
        title: 'Product Designer',
        company: 'TechSphere',
        startDate: '2021-04',
        endDate: 'Present',
        description: 'Designed modular UI kit adopted across 3 product teams.'
      }
    ],
    education: [
      { degree: 'B.Des Digital Design', school: 'DA-IICT', year: '2019' }
    ]
  },
  {
    name: 'Meera Iyer',
    title: 'UX Product Designer',
    company: 'SoftTest Solutions',
    location: 'Chennai, India',
    summary: 'UX-focused designer passionate about problem discovery and usability improvements.',
    skills: ['Figma', 'UX Research', 'Usability Testing', 'Prototyping', 'Interaction Design'],
    experience: [
      {
        title: 'UX Product Designer',
        company: 'SoftTest Solutions',
        startDate: '2020-07',
        endDate: 'Present',
        description: 'Led usability improvements that increased customer satisfaction by 35%.'
      }
    ],
    education: [
      { degree: 'B.Sc Visual Communication', school: 'Loyola College', year: '2018' }
    ]
  },
  {
    name: 'Vikram Singh',
    title: 'Product Designer',
    company: 'SecureNet',
    location: 'Noida, India',
    summary: 'Designing secure, user-friendly enterprise dashboards for cybersecurity platforms.',
    skills: ['Figma', 'Dashboard UX', 'Enterprise Design', 'Wireframing', 'User Research'],
    experience: [
      {
        title: 'Product Designer',
        company: 'SecureNet',
        startDate: '2021-09',
        endDate: 'Present',
        description: 'Designed security monitoring dashboards used by global enterprise clients.'
      }
    ],
    education: [
      { degree: 'B.Des UX Design', school: 'Amity University', year: '2019' }
    ]
  }
]


await connectDB(process.env.MONGO_URI);
await Profile.deleteMany({});
await Profile.insertMany(profiles);
console.log('✅ Seeded profiles successfully');
process.exit();