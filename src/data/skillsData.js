// Categorized skill data for reference and future use
export const skillsCategories = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "Bootstrap", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "Middleware"]
  },
  {
    category: "Database",
    skills: ["MongoDB", "MongoDB Atlas", "Mongoose", "CRUD Operations"]
  },
  {
    category: "Programming & Problem Solving",
    skills: ["Python", "Data Structures & Algorithms", "Problem Solving", "Recursion", "Searching", "Sorting"]
  },
  {
    category: "Tools & Deployment",
    skills: ["Git", "GitHub", "VS Code", "Postman", "npm", "Vercel", "Render"]
  },
  {
    category: "Currently Learning",
    skills: ["AI/ML", "Generative AI", "System Design", "AWS"]
  }
];

// Flat list for backward compatibility with Skills.jsx
export const skillsList = skillsCategories.flatMap((group) => group.skills);
