# Noor Setia — Developer Portfolio

A modern, responsive developer portfolio showcasing my skills, projects, experience, and achievements as a Full Stack Developer specializing in the MERN stack. The portfolio includes an AI-powered personal assistant that helps visitors learn about my technical background and projects.

**Live Portfolio:** [noor-setia-portfolio.vercel.app](https://noor-setia-portfolio.vercel.app/)

## Overview

This portfolio is designed to present my development journey, technical expertise, and projects in an interactive and accessible way. Visitors can explore my work, download my resume, contact me, and interact with **Ask Noor AI**, an AI assistant designed to answer questions about my experience and projects.

## Features

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Hero Section:** Introduction, professional role, social links, and calls to action.
- **About Me:** Background, education, interests, and development journey.
- **Skills Section:** Technical skills and technologies.
- **Projects Showcase:** Selected projects with technology details and relevant links.
- **Experience & Achievements:** Professional experience, accomplishments, and learning milestones.
- **Resume Download:** Direct access to my resume.
- **Ask Noor AI:** An AI-powered chat assistant that answers questions about my background, experience, skills, and projects.
- **Suggested Questions:** Conversation starters displayed when the chat is empty and hidden after the user begins a conversation.
- **Conversation History:** Displays user messages and AI responses during the active conversation.
- **Contact Form:** Allows visitors to send messages through Web3Forms.
- **Loading and Error Handling:** Provides feedback when AI requests are processing or fail.
- **Animations and Interactions:** Smooth transitions and interactive elements.
- **SEO & Accessibility:** Semantic content and discoverability improvements.

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Bootstrap
- AOS (Animate On Scroll)

### Backend
- Node.js
- Express.js
- TypeScript
- REST APIs

### AI Integration
- Groq API for AI-powered responses
- Server-side API key management
- Chat status and message endpoints
- Loading, error, and conversation-state handling

### Contact & Deployment
- Web3Forms for contact form submissions
- Vercel for frontend deployment
- Node.js-compatible hosting for the backend

### Development Tools
- Visual Studio Code
- Git and GitHub
- npm
- Browser Developer Tools

## Featured Projects

Some of the projects showcased in my portfolio include:

| Project | Description | Technologies |
|---|---|---|
| **NESTORA** | MERN-stack e-commerce application | React, Node.js, Express, MongoDB |
| **CareSync** | Healthcare portal focused on accessible healthcare workflows | React, JavaScript, CSS |
| **World Countries Data Explorer** | Interactive application for exploring country information | React, JavaScript, REST APIs |
| **GYM Platform** | Gym management and fitness platform | MERN Stack |
| **Hyderabad AC Services** | Responsive website for air-conditioning services | HTML, CSS, JavaScript |

See the live portfolio for project details and available links.

## Ask Noor AI

Ask Noor AI is an interactive assistant that helps visitors learn more about my professional profile without manually navigating every section of the portfolio.

### How it works

1. Visitors open the chat widget.
2. Suggested questions appear when the conversation is empty.
3. Visitors select a suggested question or enter their own.
4. The backend processes the request and communicates with the configured AI provider.
5. The response appears in the chat interface.
6. Suggested questions remain hidden throughout the active conversation, keeping the interface focused on the discussion.
7. Visitors can continue asking follow-up questions.

### API endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/chat/status` | Checks whether the AI assistant is configured and available. |
| `POST /api/chat` | Processes chat messages and returns AI responses. |
| `POST /api/contact` | Contact submission endpoint, if configured in the application. |

The actual request format and response structure are defined by the backend implementation.

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm
- Git
- A Groq API key for AI functionality
- A Web3Forms access key for contact submissions

### 1. Clone the repository

```bash
git clone https://github.com/noorsetia/Noor-Setia-Portfolio.git
cd Noor-Setia-Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the variables required by your existing backend:

```env
GROQ_API_KEY=your_groq_api_key
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

**Important:** Confirm the exact environment variable names against the current source code. If Web3Forms is called directly from the frontend, its access key may be configured in the frontend form instead of the backend.

- Obtain a Groq API key from [Groq Console](https://console.groq.com/keys).
- Obtain your Web3Forms access key from [Web3Forms](https://web3forms.com/).

Never commit real API keys or secrets to GitHub. Ensure `.env` is included in `.gitignore`. Configure production environment variables separately in the appropriate hosting dashboard.

### 4. Start the development server

```bash
npm run dev
```

The application uses the project's configured development command. When configured as in the current setup, the portfolio server is available at:

`http://localhost:3000`

Use the actual address printed in your terminal if the port differs.

### 5. Build for production

```bash
npm run build
```

If the project provides a preview script, you can test the production build locally:

```bash
npm run preview
```

## Contact Form Configuration

The contact form uses Web3Forms to deliver visitor messages.

To configure it:

1. Create a form in the Web3Forms dashboard.
2. Configure the recipient email address.
3. Add the correct access key according to the current integration.
4. Set the production website URL.
5. Submit a test message.
6. Verify that the message reaches the configured recipient.

Do not expose private email credentials or server-only secrets in frontend code.

## Deployment

### Frontend

The portfolio is deployed on Vercel.

1. Connect the GitHub repository to Vercel.
2. Configure the required frontend environment variables, if any.
3. Set the correct build command and output directory for the Vite project.
4. Deploy the application.
5. Verify the live site and all internal links.

### Backend and AI

If the backend runs as a separate production service:

1. Deploy the Node.js backend to a compatible hosting provider.
2. Configure `GROQ_API_KEY` in the backend service's environment settings.
3. Configure any other required server-side variables.
4. Ensure the frontend sends requests to the correct production API.
5. Configure CORS and request validation as appropriate.
6. Test `/api/chat/status` and submit a chat message in production.

The AI assistant will not work in production merely because the local `.env` file contains an API key. The deployed backend must have its own valid configuration.

## Testing Checklist

- [ ] All portfolio sections load correctly.
- [ ] Navigation and social links work.
- [ ] Resume link opens the correct document.
- [ ] Project links work.
- [ ] Contact form submits successfully.
- [ ] Ask Noor AI reports its configuration status correctly.
- [ ] Suggested questions appear when the chat is empty.
- [ ] Suggested questions disappear immediately after the first message.
- [ ] AI responses render correctly.
- [ ] Follow-up questions work.
- [ ] Suggestions do not reappear during loading or after an API error.
- [ ] Chat remains responsive on mobile devices.
- [ ] No API keys or private credentials are committed to GitHub.
- [ ] Production deployment is tested independently of local development.

## Future Improvements

- Add more detailed project case studies and architecture diagrams.
- Improve automated testing for the chat and contact form.
- Add stronger accessibility checks and keyboard navigation.
- Optimize performance and loading behavior.
- Expand AI assistant knowledge using verified portfolio content.
- Improve production monitoring and API error diagnostics.

## About Me

I am Noor Setia, a BCA student specializing in Software Development at Eternal University, Baru Sahib, Himachal Pradesh (2024–2027). I am focused on building responsive, user-centered web applications and strengthening my skills in frontend development, backend engineering, and the MERN stack.

I enjoy learning new technologies, solving programming problems, and building practical projects that solve real-world problems.

## Connect With Me

- **Portfolio:** [noor-setia-portfolio.vercel.app](https://noor-setia-portfolio.vercel.app/)
- **GitHub:** [github.com/noorsetia](https://github.com/noorsetia)
- **LinkedIn:** Add your LinkedIn profile URL here.
- **Email:** Add your preferred professional email address here.

---

*Built with React, JavaScript, Node.js, and a focus on clean, user-friendly web experiences.*
