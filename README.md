# Noor Setia - Professional Developer Portfolio 🚀

A sleek, modern, and highly interactive developer portfolio built with React and Tailwind CSS. Designed to showcase projects, technical skills, and professional experience with premium UI/UX interactions inspired by top-tier Figma designs.

## ✨ Features

- **Dark & Light Mode Toggle:** Seamless system-aware and user-controlled theme switching.
- **Scroll-Reveal Animations:** Custom intersection-observer animations (slide-up, slide-in from left/right) that replay on scroll.
- **Functional Contact Form:** Fully working contact form that sends messages directly to email using the [Web3Forms](https://web3forms.com/) API (No backend required!).
- **Glassmorphism UI:** Modern translucent code boxes, glowing background gradients, and premium shadow effects.
- **"Bento Box" Layouts:** Clean, grid-based layouts for the About and Skills sections.
- **Smooth Scrolling:** Seamless one-page navigation.
- **Fully Responsive:** Beautifully optimized for mobile, tablet, and desktop screens.

## 🛠 Tech Stack

- **Frontend Framework:** React (JavaScript, Functional Components)
- **Styling:** Tailwind CSS (Custom keyframes and utility-first styling)
- **Form Handling:** Web3Forms API
- **Icons:** Inline SVG paths (Zero external library dependencies for maximum performance)
- **Build Tool:** Vite

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) 22.23.3 installed. This project uses Vite 7, whose locked dependency requires Node.js `^20.19.0 || >=22.12.0`.

If you use NVM:
```bash
nvm install
nvm use
```

The repository includes `.nvmrc` so interactive shells can select the project runtime automatically. Non-interactive task shells may not load NVM; verify with `node -v` and run `source "$NVM_DIR/nvm.sh" && nvm use` before building when necessary.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/noorsetia/Mine_Portfolio.git
   
1. Navigate into the project directory:
    cd Mine_Portfolio

2. Install the dependencies:
    npm install

3. Start the development server:
    npm run dev

4. Open your browser and visit http://localhost:5173 (or the port Vite provides).


## ⚙️ Configuration & Personalization

### Deploying the portfolio and chat on Vercel

The Vite site is built as static files in `dist`. Vercel deploys the chat endpoints separately from the `api/` serverless functions; `server.ts` is only the local Express development server and is not deployed automatically. The browser calls same-origin `/api/chat/status` and `/api/chat` endpoints.

In the Vercel project, set server-side `GEMINI_API_KEY` and build-time `VITE_WEB3FORMS_ACCESS_KEY` for Production (and Preview/Development if needed), then redeploy. Do not create a `VITE_GEMINI_API_KEY` variable. The deployed status endpoint reports whether the Gemini key is present; it does not validate the key with Google until a chat request is made. The assistant uses the `gemini-3.8-flash` model through the `@google/genai` SDK.

For local Express development, copy `.env.example` to `.env` and fill in the values. `GEMINI_API_KEY` is read only by the server. The contact form uses `VITE_WEB3FORMS_ACCESS_KEY` to call Web3Forms from the browser. Vite includes every `VITE_` value in the public JavaScript bundle; this key is intentionally public, and must never be used for Gemini or any credential that needs to remain secret.

### Activating the Contact Form

The form submits directly to the official `https://api.web3forms.com/submit` endpoint using `VITE_WEB3FORMS_ACCESS_KEY` for the configured portfolio form. Keep the form's Website URL set to the deployed portfolio origin. This avoids duplicate submissions and Web3Forms' restrictions on server-side requests. A successful API response confirms Web3Forms accepted the submission; check the Web3Forms Submissions dashboard or recipient inbox to confirm delivery.

### Updating Resume Link

Place your actual resume PDF in the public folder and name it resume.pdf.
The "Resume" button in the Navbar/Footer will automatically link to it.

### Updating Social Links

Open src/components/Hero.jsx and src/components/Footer.jsx and replace YOUR_GITHUB_USERNAME and YOUR_LINKEDIN_USERNAME with your real social media handles.


## 📁 Folder Structure

├── public/
│   ├── resume.pdf          # Your resume file
│   └── vite.svg            
├── src/
│   ├── components/         # Reusable React components
│   │   ├── About.jsx       # Bento-box style about section
│   │   ├── Contact.jsx     # Form with Web3Forms integration
│   │   ├── Experience.jsx  # Vertical timeline
│   │   ├── Footer.jsx      # Social links and copyright
│   │   ├── Header.jsx      # Sticky nav with Theme Toggle
│   │   ├── Hero.jsx        # Glassmorphism hero section
│   │   ├── Projects.jsx    # Project cards grid
│   │   ├── Reveal.jsx      # Custom Intersection Observer wrapper
│   │   └── Skills.jsx      # Categorized skills pills
│   ├── App.jsx             # Main application wrapper
│   ├── index.css           # Tailwind imports & global styles
│   └── main.jsx            # React DOM rendering
├── tailwind.config.js      # Custom animations & Dark Mode config
└── package.json


## 📄 License

This project is open-source and available under the MIT License.

## Designed & Built by Noor Setia.
