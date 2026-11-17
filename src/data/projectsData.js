/**
 * Authentic Project Showcase Data for Noor Setia
 * 
 * Strict Authenticity Guidelines:
 * - All live URLs and GitHub repository URLs are verified active (HTTP 200).
 * - Verified capabilities reflect genuine code implementations.
 * - Architecture blueprint card visuals provide clean, intentional, and high-fidelity project presentation.
 */

export const projectsData = [
  {
    id: 1,
    title: "NESTORA — MERN E-Commerce Platform",
    category: "MERN Stack",
    status: "Completed",
    description: "A full-stack e-commerce platform for books, interiors, and furniture, built to provide a complete product discovery, shopping, and checkout experience. Features user credentials and Google OAuth authentication, product browsing, dynamic cart state with Zustand, checkout pipeline with Razorpay, and modular REST endpoints.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose", "Zustand", "Razorpay", "REST APIs"],
    screenshotUrl: null,
    screenshotPlaceholder: "E-Commerce Catalog, Shopping Cart & Razorpay Checkout Workflow",
    previewLabel: "Illustrative interface preview",
    problem: "Shoppers need a clear way to discover home products, manage a cart, and move through an authenticated checkout flow.",
    intendedUsers: "Customers browsing books, interiors, and furniture online.",
    contribution: [
      "Built the React/Vite storefront structure, reusable product UI, routing, and cart experience.",
      "Integrated Axios-based frontend services with the Express API and Zustand stores.",
      "Implemented backend authentication, validation, user/account services, and Mongoose models across the companion backend repository."
    ],
    caseStudyFeatures: [
      { title: "Catalog and cart", description: "Product discovery and client-side cart state are organized around reusable React views and Zustand." },
      { title: "Authentication", description: "The backend documents email/password and Google authentication flows with JWT and cookie-based sessions." },
      { title: "Checkout integration", description: "The project includes a Razorpay checkout pipeline and order-oriented data models." },
      { title: "REST architecture", description: "The frontend communicates with modular Express routes instead of accessing MongoDB directly." }
    ],
    architecture: ["React + Vite", "Express REST API", "Node.js services", "MongoDB / Mongoose"],
    architectureSummary: "The React/Vite client communicates with the Express API. Node.js services handle authentication and validation, while Mongoose models persist application data in MongoDB; Razorpay handles the checkout handoff.",
    challenge: "Keeping authentication, cart state, and checkout data consistent across separate frontend and backend applications led to a service-oriented API boundary, validation middleware, and dedicated client state stores.",
    // Verified Live Deployment & GitHub Repositories (HTTP 200):
    liveLink: "https://nestora-frontend-eight.vercel.app",
    repoLink: "https://github.com/noorsetia/Nestora_Frontend",
    backendRepoLink: "https://github.com/noorsetia/Nestora_Backend",
    verifiedCapabilities: [
      "User credentials and Google OAuth authentication workflows",
      "Dynamic catalog browsing for books, interior items, and furniture",
      "Client-side shopping cart state management powered by Zustand",
      "Integrated checkout transaction pipeline with Razorpay payment gateway",
      "Modular Express.js backend REST API endpoints with middleware validation",
      "MongoDB database modeling using Mongoose schemas for orders, products, and users"
    ]
  },
  {
    id: 2,
    title: "CareSync — React Healthcare Portal",
    category: "Frontend & UI",
    status: "Completed",
    description: "A responsive React-based healthcare portal designed to provide a structured, accessible, and user-friendly digital experience for healthcare workflows. Features modular components, client-side routing, patient appointment scheduling, interactive inquiries, and clean form validation.",
    tags: ["React", "JavaScript", "HTML5", "CSS3", "React Router", "TanStack React Query", "Context API"],
    screenshotUrl: null,
    screenshotPlaceholder: "Healthcare Patient Dashboard, Clinical Forms & Scheduling Workflow",
    previewLabel: "Illustrative demo-data preview",
    problem: "Patients need one accessible place to review appointments, find doctors, and manage healthcare information.",
    intendedUsers: "Patients using a responsive healthcare portal; the visual preview uses demonstration data and contains no PHI.",
    contribution: [
      "Built reusable React pages and healthcare-focused UI components with responsive layouts.",
      "Implemented client-side routing, protected route structure, forms, validation, and clear success/error states.",
      "Organized authentication context, query/mutation hooks, and mock API boundaries for the portal flows."
    ],
    caseStudyFeatures: [
      { title: "Protected access", description: "Registration, login, persistent sessions, logout, and protected dashboard routes are represented in the application structure." },
      { title: "Doctor search", description: "Patients can filter doctors by name, specialty, location, availability, fee, and rating." },
      { title: "Appointments", description: "The portal supports booking, viewing, rescheduling, and cancelling appointment records." },
      { title: "Responsive UI", description: "Reusable components, validation feedback, and responsive layouts support cross-device use." }
    ],
    architecture: ["React + Vite", "React Router", "Auth Context", "React Query / mock API"],
    architectureSummary: "The React/Vite client uses React Router for page flows, Context for authentication state, and TanStack Query for server-state boundaries. The repository documents mock/API boundaries rather than claiming a deployed backend.",
    challenge: "The portal separates authentication state, route protection, query logic, and reusable UI components so healthcare flows remain understandable as the number of dashboard views grows.",
    // Verified Live Deployment & GitHub Repository (HTTP 200):
    liveLink: "https://caresynchealthportal.netlify.app/",
    repoLink: "https://github.com/noorsetia/CareSync",
    backendRepoLink: null,
    verifiedCapabilities: [
      "Modular component hierarchy with reusable UI patterns and layouts",
      "Multi-view client-side routing powered by React Router",
      "Structured clinical appointment and patient inquiry forms with input validation",
      "Responsive cross-device layouts styled with modern CSS"
    ]
  },
  {
    id: 3,
    title: "World Countries Data Explorer",
    category: "Data & Tools",
    status: "Completed",
    description: "An interactive explorer allowing users to search, sort, and visualize country demographic data dynamically. Features real-time debounced filtering, multi-criteria column sorting, and interactive data charts displaying top populated countries and most spoken languages.",
    tags: ["JavaScript (ES6+)", "Chart.js", "HTML5 / CSS3", "DOM Manipulation"],
    screenshotUrl: null,
    screenshotPlaceholder: "Interactive Demographic Data Explorer, Search Filters & Chart.js Visuals",
    previewLabel: "Illustrative data-visualization preview",
    problem: "Country demographic datasets are difficult to compare when search, sorting, and visual summaries are disconnected.",
    intendedUsers: "Learners and users exploring country population and language data.",
    contribution: [
      "Built the vanilla JavaScript data exploration interface and DOM update flow.",
      "Implemented debounced search, multi-criteria sorting, and dynamic table filtering.",
      "Connected filtered records to Chart.js visualizations for population and language comparisons."
    ],
    caseStudyFeatures: [
      { title: "Debounced search", description: "Search updates are delayed until input settles, reducing unnecessary work while users type." },
      { title: "Multi-column sorting", description: "Country records can be compared across demographic indicators and metrics." },
      { title: "Data visualization", description: "Chart.js presents population and language summaries alongside the tabular data." }
    ],
    architecture: ["HTML + CSS", "Vanilla JavaScript", "Country dataset", "Chart.js"],
    architectureSummary: "The browser keeps the current filtered country dataset in the page state, applies search and sorting in vanilla JavaScript, and passes the resulting records to Chart.js for visual summaries. No backend is represented.",
    challenge: "Keeping table filters, sorting state, and chart summaries synchronized required a lightweight single-page data flow centered on the current filtered dataset.",
    // Verified Live Deployment & GitHub Repository (HTTP 200):
    liveLink: "https://worldvisual.netlify.app/",
    repoLink: "https://github.com/noorsetia/World-Visual",
    backendRepoLink: null,
    verifiedCapabilities: [
      "Instant real-time search across global country records with debounced input",
      "Multi-criteria column sorting across demographic indicators and country metrics",
      "Interactive data visualizations powered by Chart.js for population and languages",
      "Lightweight vanilla JavaScript (ES6+) architecture with native DOM manipulation"
    ]
  },
  {
    id: 4,
    title: "GYM – MERN Platform",
    category: "MERN Stack",
    status: "Completed",
    description: "A responsive fitness platform with workout regimens, membership tier exploration, and a client-side BMI calculator. Integrated REST APIs using Node.js and Express for form handling and MongoDB for membership data operations.",
    tags: ["React", "MongoDB", "Node.js", "Express", "REST APIs"],
    screenshotUrl: null,
    screenshotPlaceholder: "Fitness Regimen Split, Membership Tier Explorer & BMI Calculator",
    previewLabel: "Illustrative interface preview",
    problem: "Fitness visitors need a simple way to explore workout plans, membership options, and basic health metrics.",
    intendedUsers: "People exploring fitness programs and membership information.",
    contribution: [
      "Built the responsive React interface for workout regimens, membership tiers, and the BMI calculator.",
      "Integrated Node.js and Express REST endpoints for inquiries and membership data operations.",
      "Connected MongoDB persistence for submitted membership and inquiry information."
    ],
    caseStudyFeatures: [
      { title: "Workout regimens", description: "Training plans are presented through structured, responsive sections." },
      { title: "BMI calculator", description: "The client-side calculator provides immediate BMI values and health classifications." },
      { title: "Membership flow", description: "Membership tiers and inquiry forms connect the interface to backend processing." }
    ],
    architecture: ["React frontend", "Express REST API", "Node.js", "MongoDB"],
    architectureSummary: "The React client communicates with Express endpoints for inquiry and membership flows. The separate Node.js backend uses MongoDB persistence for the documented membership and contact data operations.",
    challenge: "The application keeps fast client-side interactions such as BMI calculation separate from server-backed inquiry and membership persistence, making each flow easier to reason about.",
    // Verified Live Deployment & GitHub Repositories (HTTP 200):
    liveLink: "https://gym-frontend-eiqi.onrender.com/",
    repoLink: "https://github.com/noorsetia/GYM_MERN_Frontend",
    backendRepoLink: "https://github.com/noorsetia/GYM_Backend",
    verifiedCapabilities: [
      "Interactive fitness training regimen displays and membership pricing tiers",
      "Real-time client-side Body Mass Index (BMI) calculator with health classifications",
      "REST API integration with Node.js and Express for contact and inquiry processing",
      "MongoDB database operations for membership signups and inquiry persistence"
    ]
  },
  {
    id: 5,
    title: "Developer Arcade — Interactive Gaming Platform",
    category: "Full Stack",
    status: "Completed",
    description: "An interactive browser-based arcade featuring 15 playable mini-games, game-specific themes, player progression, and an achievement system.",
    tags: ["React.js", "Vite", "Tailwind CSS", "Lucide React", "Motion", "Node.js", "Express.js", "MongoDB", "Mongoose", "Firebase", "Zod", "Google Gemini API"],
    screenshotUrl: null,
    previewType: "illustration",
    previewLabel: "Illustrative interface preview",
    problem: "Players need an engaging browser-based place to explore multiple mini-games and track their progression.",
    intendedUsers: "Players looking for interactive mini-games in a themed browser experience.",
    contribution: [
      "Built 15 playable browser mini-games inside one React and Vite app, each with its own theme and controls.",
      "Added player progression with levels and an achievement system backed by the Node.js and Express.js API.",
      "Styled the interface with Tailwind CSS, animated it with Motion, and added Firebase authentication and AI features through the Google Gemini API."
    ],
    caseStudyFeatures: [
      { title: "15 mini-games", description: "Fifteen distinct games share one arcade shell, so players move between them without leaving the app." },
      { title: "Game-specific themes", description: "Each game carries its own visual theme, separating it from the rest of the arcade." },
      { title: "Player progression", description: "Levels and achievements give players a reason to return across games." },
      { title: "Animated UI", description: "Motion drives the interface animation, with Lucide React icons and Tailwind CSS styling throughout." }
    ],
    architecture: ["React.js + Vite", "Tailwind CSS + Motion", "Node.js + Express.js", "MongoDB / Mongoose", "Firebase Auth + Google Gemini API"],
    architectureSummary: "The platform combines a React.js and Vite browser interface styled with Tailwind CSS and animated with Motion with a Node.js and Express.js backend and MongoDB through Mongoose. Firebase Authentication handles sign-in, Zod validates requests, and the Google Gemini API powers the in-app AI features.",
    challenge: "Bringing multiple games together while giving each a distinct theme and retaining a consistent progression experience.",
    liveLink: "https://arcade-game-t5d8.vercel.app/",
    repoLink: "https://github.com/noorsetia/Arcade-Game",
    backendRepoLink: null,
    verifiedCapabilities: [
      "Multiple interactive browser-based mini-games",
      "Game-specific themes and immersive visual design",
      "Player levels and an achievement system",
      "Firebase Authentication with Google Gemini API integration"
    ]
  },
  {
    id: 6,
    title: "JiraProj — AI Project Management Platform",
    category: "Full Stack + AI Integration",
    status: "Completed",
    description: "A Jira-style project management platform with projects, sprints, and a drag-and-drop Kanban board, team management under role-based access, real-time updates over Socket.IO, analytics dashboards, and an AI assistant that drafts tasks, plans sprints, and flags blocked work.",
    tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Socket.IO", "OpenAI API"],
    screenshotUrl: null,
    previewType: "illustration",
    previewLabel: "Illustrative interface preview",
    screenshotPlaceholder: "Dark animated Kanban demo — sample board, not the live screen",
    problem: "Teams need one workspace where projects, sprints, and tasks stay in sync, progress is visible at a glance, and role rules decide who can change what.",
    intendedUsers: "Project managers planning sprints and work, and team members tracking and updating their assigned tasks.",
    contribution: [
      "Built the Express and MongoDB backend with JWT authentication, bcrypt password hashing, and project manager / team member role checks.",
      "Implemented project, task, and sprint controllers, express-validator request validation, and a shared response envelope with a global error handler.",
      "Built the React and Vite client with protected routes, a Kanban board with position-tracked drag and drop, analytics views, and read-only public preview pages.",
      "Added Socket.IO project rooms for live task and project updates, plus an AI assistant layer for task generation, sprint planning, and issue detection."
    ],
    caseStudyFeatures: [
      { title: "Kanban board", description: "Tasks move across To Do, In Progress, Review, and Done, with bulk position updates persisted through a dedicated endpoint." },
      { title: "Sprints", description: "Sprints are created per project with goals and date ranges, and tasks are assigned to them with progress statistics." },
      { title: "Role-based access", description: "Project managers get full CRUD and team performance data; team members are limited to their projects, status updates, and comments." },
      { title: "Real-time updates", description: "Socket.IO project rooms push task and project changes to everyone viewing the same project." },
      { title: "AI assistant", description: "Generates tasks from a description, suggests task priorities, drafts sprint plans, summarizes project progress, and detects blocked work." },
      { title: "Public previews", description: "Read-only dashboard, project, calendar, and summary pages are served without authentication so the app can be explored without an account." }
    ],
    architecture: ["React + Vite", "Express REST API", "JWT auth middleware", "MongoDB / Mongoose", "Socket.IO"],
    architectureSummary: "The React/Vite client calls an Express REST API over /api routes with a Bearer JWT on protected calls. Controllers validate requests with express-validator, apply role checks, and persist User, Project, Task, and Sprint models in MongoDB through Mongoose. Socket.IO project rooms broadcast task and project events, and a dedicated AI routes layer calls an OpenAI-compatible chat completions endpoint.",
    challenge: "Keeping a drag-and-drop board responsive while task positions, status changes, and assignments are stored server-side led to a bulk position update endpoint and a shared task model that supports per-task comments, attachments, sprints, and user-specific notifications.",
    // Verified Live Deployment & GitHub Repositories (HTTP 200):
    liveLink: "https://jira-proj-frontend.vercel.app/public-dashboard",
    repoLink: "https://github.com/noorsetia/JiraProj_Frontend",
    backendRepoLink: "https://github.com/noorsetia/JiraProj_Backend",
    verifiedCapabilities: [
      "JWT authentication with bcrypt hashing and project manager / team member role checks",
      "Project, task, and sprint CRUD APIs validated with express-validator",
      "Kanban drag-and-drop ordering persisted through bulk position updates",
      "Real-time task and project updates broadcast through Socket.IO project rooms",
      "AI assistant endpoints for task generation, sprint planning, and issue detection",
      "Analytics endpoints for dashboard, per-project, and team performance metrics"
    ]
  }
];
