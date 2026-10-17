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
  }
];
