/**
 * Certifications Data for Noor Setia
 *
 * Each entry carries a `subcategory` field that groups items for display:
 *   "Certifications & Training"  — online courses and completed training programmes
 *   "Workshops & Training"       — offline/in-person workshop participation
 *   "Awards & Recognition"       — appreciation letters and institutional recognition
 *
 * Verified sources (October 2026):
 *  1  https://www.coursera.org/account/accomplishments/verify/ELE720Z03GI4
 *  2  https://coursera.org/share/260be12d7415b9651ea573f3258eb93b
 *  3  https://coursera.org/share/b1fc4941d75a09c1ef5128aebdaeb166
 *  4  https://coursera.org/share/b678711c975ebf1294388708f472b0d7
 *  5  https://coursera.org/share/efb3dc07d7713a6c211f3601e1914320
 *  6  https://drive.google.com/file/d/1C0KlZTMZffndSUr2kWH2dJBwJ7X0wzef/view  — React Bootcamp (Zuvy)
 *  7  https://www.udacity.com/certificate/e/18ea47ce-5955-11f0-a36d-d3a0cc34b084
 *  8  https://cert.efset.org/en/D3UmNm
 *  9  https://drive.google.com/file/d/1F_MV30d-QvKqqAvFWXnRJYNUl4g8rkln/view  — NavGurukul Certificate of Appreciation
 * 10  https://drive.google.com/file/d/1JmWz1sqkSiku3yHLlgxOmk5erE78CEE1/view  — AI Workshop (Eternal University × NavGurukul)
 * 11  https://drive.google.com/file/d/1ed5GQ5ixNe1jjj8sQm9C32bWhidmv4jq/view  — AI Fundamentals (NavGurukul × Anudip Foundation)
 *
 * NOTE: The Vedonyx internship extension letter
 *   (https://drive.google.com/file/d/12upwdhgg0xNiVswe2qPcxcSHJJVsnv2t/view)
 *   is an employment document and is intentionally excluded from this public list.
 */

export const certifications = [
  // ── Certifications & Training ─────────────────────────────────────────────
  {
    id: 1,
    title: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University · Coursera",
    date: null,
    skills: ["Prompt Patterns", "Prompt Engineering", "LLM Applications", "AI Literacy", "ChatGPT"],
    verifiedUrl: "https://www.coursera.org/account/accomplishments/verify/ELE720Z03GI4?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    category: "AI / ML",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 2,
    title: "Version Control",
    issuer: "Meta · Coursera",
    date: null,
    skills: ["Git", "GitHub", "Unix Shell", "Version Control", "Software Development"],
    verifiedUrl: "https://coursera.org/share/260be12d7415b9651ea573f3258eb93b",
    category: "Developer Tools",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 3,
    title: "Introduction to Git and GitHub",
    issuer: "Google · Coursera",
    date: null,
    skills: ["Git", "GitHub", "Version Control", "Continuous Integration", "Code Review"],
    verifiedUrl: "https://coursera.org/share/b1fc4941d75a09c1ef5128aebdaeb166",
    category: "Developer Tools",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 4,
    title: "Introduction to Front-End Development",
    issuer: "Meta · Coursera",
    date: null,
    skills: ["HTML & CSS", "Responsive Web Design", "React.js", "Bootstrap", "Front-End Development"],
    verifiedUrl: "https://coursera.org/share/b678711c975ebf1294388708f472b0d7",
    category: "Frontend",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 5,
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM · Coursera",
    date: null,
    skills: ["Machine Learning", "Deep Learning", "Neural Networks", "AI Fundamentals"],
    verifiedUrl: "https://coursera.org/share/efb3dc07d7713a6c211f3601e1914320",
    category: "AI / ML",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 6,
    title: "React Bootcamp",
    issuer: "Zuvy",
    date: "10 February 2026",
    duration: "3 months",
    skills: ["React", "Modern Frontend Development", "Real-world Projects", "Industry Best Practices"],
    verifiedUrl: "https://drive.google.com/file/d/1C0KlZTMZffndSUr2kWH2dJBwJ7X0wzef/view",
    category: "Frontend",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 7,
    title: "Introducing Generative AI with AWS",
    issuer: "Udacity",
    date: null,
    skills: ["Generative AI", "AWS", "Large Language Models", "Cloud AI"],
    verifiedUrl: "https://www.udacity.com/certificate/e/18ea47ce-5955-11f0-a36d-d3a0cc34b084",
    category: "AI / ML",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 8,
    title: "EF SET English Certificate — B2 Upper Intermediate",
    issuer: "EF Standard English Test (EF SET)",
    date: null,
    skills: ["English Reading (B2)", "English Listening (B2)", "English Writing (C1)", "Score: 59/100"],
    verifiedUrl: "https://cert.efset.org/en/D3UmNm",
    category: "Language",
    subcategory: "Certifications & Training",
    titleVerified: true,
  },
  {
    id: 11,
    title: "AI Fundamentals",
    issuer: "NavGurukul · Anudip Foundation for Social Welfare",
    date: "21 July 2025",
    duration: null,
    skills: ["Artificial Intelligence", "Machine Learning", "Ethical AI", "AI Applications"],
    verifiedUrl: "https://drive.google.com/file/d/1ed5GQ5ixNe1jjj8sQm9C32bWhidmv4jq/view",
    category: "AI / ML",
    subcategory: "Certifications & Training",
    titleVerified: true,
    note: "AI Opportunity Fund: Asia-Pacific programme, associated with AVPN and supported by Google.org and the Asian Development Bank.",
  },

  // ── Workshops & Training ───────────────────────────────────────────────────
  {
    id: 10,
    title: "Unlocking the Power of Artificial Intelligence",
    issuer: "Eternal University · NavGurukul",
    date: "15 July 2025",
    duration: "1 day (offline)",
    skills: ["Artificial Intelligence", "Machine Learning", "Ethical AI", "Real-world AI Applications"],
    verifiedUrl: "https://drive.google.com/file/d/1JmWz1sqkSiku3yHLlgxOmk5erE78CEE1/view",
    category: "AI / ML",
    subcategory: "Workshops & Training",
    titleVerified: true,
  },

  // ── Awards & Recognition ──────────────────────────────────────────────────
  {
    id: 9,
    title: "Certificate of Appreciation — Hackathon & Innovation In-charge",
    issuer: "NavGurukul",
    date: "30 November 2025",
    duration: "15 October 2024 – 30 July 2025",
    skills: ["Hackathon Facilitation", "Innovation", "Leadership", "Technical Coordination"],
    verifiedUrl: "https://drive.google.com/file/d/1F_MV30d-QvKqqAvFWXnRJYNUl4g8rkln/view",
    category: "Achievement",
    subcategory: "Awards & Recognition",
    titleVerified: true,
  },
];
