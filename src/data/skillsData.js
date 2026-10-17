// Skills used across the portfolio, grouped by how they are currently applied.
export const skills = [
  { name: "React.js", category: "Frontend", aliases: ["react", "reactjs"], projectTag: "Nestora • CareSync", core: true },
  { name: "JavaScript", category: "Frontend", aliases: ["js", "ecmascript"], projectTag: "All Projects", core: true },
  { name: "HTML5", category: "Frontend", aliases: ["html"], projectTag: null },
  { name: "CSS3", category: "Frontend", aliases: ["css"], projectTag: null },
  { name: "Bootstrap", category: "Frontend", aliases: [], projectTag: null },
  { name: "Tailwind CSS", category: "Frontend", aliases: ["tailwind"], projectTag: "Portfolio • CareSync", core: false },

  { name: "Node.js", category: "Backend", aliases: ["node", "nodejs"], projectTag: "Nestora • GYM", core: true },
  { name: "Express.js", category: "Backend", aliases: ["express", "expressjs"], projectTag: "Nestora • GYM", core: true },
  { name: "REST APIs", category: "Backend", aliases: ["rest", "api", "apis", "api integration"], projectTag: "Nestora • CareSync • GYM" },
  { name: "JWT", category: "Backend", aliases: ["json web token", "authentication", "authorization"], projectTag: "Nestora Auth" },
  { name: "Middleware", category: "Backend", aliases: ["api middleware"], projectTag: "Nestora Backend" },

  { name: "MongoDB", category: "Databases", aliases: ["mongo", "mongodb atlas"], projectTag: "Nestora • GYM", core: true },
  { name: "Mongoose", category: "Databases", aliases: ["schema design", "database schema"], projectTag: "Nestora • GYM" },
  { name: "CRUD Operations", category: "Databases", aliases: ["crud", "database operations"], projectTag: "Nestora • GYM" },

  { name: "Git", category: "Tools & Platforms", aliases: ["version control"], projectTag: "Version Control" },
  { name: "GitHub", category: "Tools & Platforms", aliases: ["github repositories", "git hosting"], projectTag: "Open Source" },
  { name: "VS Code", category: "Tools & Platforms", aliases: ["visual studio code"], projectTag: null },
  { name: "Postman", category: "Tools & Platforms", aliases: ["api testing"], projectTag: "API Testing" },
  { name: "npm", category: "Tools & Platforms", aliases: ["node package manager"], projectTag: null },
  { name: "Vite", category: "Tools & Platforms", aliases: ["frontend build tool"], projectTag: "Nestora • CareSync" },
  { name: "Vercel", category: "Tools & Platforms", aliases: ["deployment"], projectTag: "Nestora Deploy" },
  { name: "Netlify", category: "Tools & Platforms", aliases: ["deployment"], projectTag: "CareSync • World Visual" },
  { name: "Render", category: "Tools & Platforms", aliases: ["deployment"], projectTag: "GYM Deploy" },

  { name: "AI/ML Fundamentals", category: "Currently Learning", aliases: ["ai", "ml", "artificial intelligence", "machine learning"], projectTag: null, status: "learning" },
  { name: "Generative AI", category: "Currently Learning", aliases: ["genai", "generative artificial intelligence"], projectTag: null, status: "learning" },
  { name: "Data Structures & Algorithms", category: "Currently Learning", aliases: ["dsa", "algorithms", "data structures"], projectTag: null, status: "learning" },
  { name: "Python", category: "Currently Learning", aliases: ["python programming"], projectTag: null, status: "learning" },
  { name: "Problem Solving", category: "Currently Learning", aliases: ["problem-solving"], projectTag: null, status: "learning" },
  { name: "Recursion", category: "Currently Learning", aliases: [], projectTag: null, status: "learning" },
  { name: "Searching & Sorting", category: "Currently Learning", aliases: ["searching", "sorting"], projectTag: null, status: "learning" },
  { name: "System Design", category: "Currently Learning", aliases: ["architecture", "system architecture"], projectTag: null, status: "learning" },
  { name: "AWS", category: "Currently Learning", aliases: ["amazon web services", "cloud"], projectTag: null, status: "learning" }
];

// Kept for consumers that use the previous grouped shape.
export const skillsCategories = ["Frontend", "Backend", "Databases", "Tools & Platforms", "Currently Learning"].map((category) => ({
  category,
  skills: skills.filter((skill) => skill.category === category).map((skill) => skill.name)
}));

export const skillsList = skills.map((skill) => skill.name);
