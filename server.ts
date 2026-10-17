import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '16kb' }));

const contactAttempts = new Map<string, number[]>();
const CONTACT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_MAX_ATTEMPTS = 5;
const chatAttempts = new Map<string, number[]>();

function getClientAddress(req: express.Request) {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(address: string) {
  const now = Date.now();
  const recentAttempts = (contactAttempts.get(address) || []).filter(
    (timestamp) => now - timestamp < CONTACT_WINDOW_MS
  );

  if (recentAttempts.length >= CONTACT_MAX_ATTEMPTS) {
    contactAttempts.set(address, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  contactAttempts.set(address, recentAttempts);
  return false;
}

function isChatRateLimited(address: string) {
  const now = Date.now();
  const recentAttempts = (chatAttempts.get(address) || []).filter(
    (timestamp) => now - timestamp < 60 * 1000
  );

  if (recentAttempts.length >= 12) {
    chatAttempts.set(address, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  chatAttempts.set(address, recentAttempts);
  return false;
}

app.post('/api/contact', async (req, res) => {
  const address = getClientAddress(req);
  if (isRateLimited(address)) {
    return res.status(429).json({
      error: 'Too many messages were submitted. Please try again later.',
    });
  }

  const { name, email, subject, message, company } = req.body || {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (company) {
    return res.status(400).json({ error: 'Unable to process this submission.' });
  }

  if (
    !cleanName ||
    cleanName.length > 100 ||
    !cleanEmail ||
    cleanEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    !cleanMessage ||
    cleanMessage.length > 5000 ||
    cleanSubject.length > 200
  ) {
    return res.status(400).json({ error: 'Please check the submitted fields and try again.' });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return res.status(503).json({
      error: 'The contact service is not configured yet. Please email Noor directly.',
    });
  }

  try {
    const providerResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject || `Portfolio contact from ${cleanName}`,
        message: cleanMessage,
      }),
    });

    const providerResult = await providerResponse.json().catch(() => null);
    if (!providerResponse.ok || !providerResult?.success) {
      return res.status(502).json({
        error: 'The contact service could not accept your message. Please email Noor directly.',
      });
    }

    return res.json({ success: true });
  } catch {
    return res.status(502).json({
      error: 'The contact service is temporarily unavailable. Please email Noor directly.',
    });
  }
});

// System prompt grounding the AI assistant in Noor Setia's verified facts
const SYSTEM_INSTRUCTION = `
You are the AI portfolio assistant for Noor Setia, a dedicated Full Stack MERN Developer and React Engineer.
Your tone is professional, technical, friendly, and articulate.
Answer questions directly using ONLY the following verified portfolio facts. If asked something unknown or personal outside this scope, politely clarify that you can discuss Noor's engineering background, verified projects, skills, education, and career opportunities.

VERIFIED FACTS ABOUT NOOR SETIA:
- Title: Full Stack MERN Developer & React Frontend Engineer
- Contact: 
  * Email: noorsetia24@navgurukul.org
  * Phone: +91 62803 69606
  * Location: Fazilka, Punjab (Open to Remote & Global opportunities)
- Social Profiles:
  * GitHub: https://github.com/noorsetia/
  * LinkedIn: https://www.linkedin.com/in/noorsetia/
  * Resume: https://drive.google.com/file/d/1VO_7dSa70heU7h01Pl6C4cwrsp5CT4ul/view?usp=sharing (also accessible via direct button in header and footer)
- Education:
  * Bachelor of Computer Applications (Software Development)
  * Institution: Eternal University, Himachal Pradesh (2024 – 2027)
  * Senior Secondary (Class XII – Non-Medical), Singh Sabha Kanya Pathshala Sr. Sec. School, Abohar (Graduated 2024)
- Professional Experience:
  * Full Stack Developer Intern at Vedonyx (2025)
    - Built reusable React and JavaScript components for full-stack web application workflows.
    - Implemented and integrated Express.js REST APIs for database-driven functionality.
    - Worked with MongoDB for data modeling, queries, and CRUD operations.
    - Debugged frontend/backend issues and used Git-based collaboration workflows.
  * Hackathon & Innovation Facilitator at Navgurukul (Oct 2024 – Jul 2025)
    - Coordinated campus-level, central, and global hackathon initiatives end-to-end.
    - Supported participating teams from ideation through to working prototypes.
    - Handled technical coordination, team logistics, and assisted participants with Git workflows and debugging.
- Verified Projects:
  1. NESTORA — MERN E-Commerce Platform
     * Description: Full-stack online store for books, furniture, and home decor.
     * Tech: React, Node.js, Express.js, MongoDB, Mongoose, Zustand, Razorpay, Google OAuth, REST APIs.
     * Live Demo: https://nestora-frontend-eight.vercel.app
     * Frontend Repo: https://github.com/noorsetia/Nestora_Frontend
     * Backend Repo: https://github.com/noorsetia/Nestora_Backend
  2. CareSync — React Healthcare Portal
     * Description: Structured patient appointment scheduling, clinical inquiries, and client-side routing.
     * Tech: React, JavaScript, HTML5, CSS3, React Router, Bootstrap.
     * Live Demo: https://caresynchealthportal.netlify.app/
     * Repo: https://github.com/noorsetia/CareSync
  3. World Countries Data Explorer
     * Description: Interactive demographic data visualization tool with debounced search, column sorting, and charts.
     * Tech: Vanilla JavaScript (ES6+), Chart.js, HTML5, CSS3.
     * Live Demo: https://worldvisual.netlify.app/
     * Repo: https://github.com/noorsetia/World-Visual
  4. GYM – MERN Platform
     * Description: Fitness workout regimens, membership tier exploration, and client-side BMI calculator.
     * Tech: React, Node.js, Express, MongoDB, REST APIs.
     * Live Demo: https://gym-frontend-eiqi.onrender.com/
     * Frontend Repo: https://github.com/noorsetia/GYM_MERN_Frontend
     * Backend Repo: https://github.com/noorsetia/GYM_Backend
- Technical Skills:
  * Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Tailwind CSS
  * Backend: Node.js, Express.js, REST APIs, JWT, Middleware
  * Databases: MongoDB, Mongoose, CRUD operations
  * Tools & Platforms: Git, GitHub, VS Code, Postman, npm, Vite, Vercel, Netlify, Render
  * Currently learning: AI/ML fundamentals, generative AI, data structures and algorithms, Python, problem solving, recursion, searching and sorting, system design, AWS

When mentioning projects, format links as markdown links like [Project Name](url).
Keep responses concise, clear, informative, and focused on engineering excellence.
`;

// Status endpoint to check if Gemini AI assistant is configured
app.get('/api/chat/status', (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    configured: hasKey,
    model: 'gemini-3.8-flash',
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  if (isChatRateLimited(getClientAddress(req))) {
    return res.status(429).json({
      error: 'The assistant is receiving many requests. Please wait a moment and try again.',
    });
  }

  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'The AI assistant is temporarily unavailable. Please explore the portfolio or contact Noor directly.',
        configured: false,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format chat history if provided
    const contents = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-12)) {
        if (
          (h.role === 'user' || h.role === 'model') &&
          typeof h.content === 'string' &&
          h.content.length <= 2000
        ) {
          contents.push({
            role: h.role,
            parts: [{ text: h.content.trim() }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
      },
    });

    const reply = typeof response.text === 'string' && response.text.trim()
      ? response.text.trim()
      : "I’m here to help with questions about Noor’s skills, projects, education, and experience.";
    res.json({ reply, configured: true });
  } catch (err: any) {
    const rawError = err?.message || String(err);
    console.error('Gemini chat error:', rawError);

    const isKeyIssue = rawError.includes('API key not valid') || 
                       rawError.includes('API_KEY_INVALID') || 
                       rawError.includes('UNAUTHENTICATED');

    if (isKeyIssue) {
      return res.status(503).json({
        error: "AI assistant is waiting for a valid GEMINI_API_KEY to be configured in project secrets.",
        configured: false,
      });
    }

    res.status(500).json({
      error: 'Unable to complete AI response right now. Please try again.',
      configured: true,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/*splat', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
