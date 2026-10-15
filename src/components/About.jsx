import React, { useState } from 'react';
import Reveal from './Reveal';
import { personalInfo } from '../data/personalInfo';

const principleIcons = [
  <svg key="arch" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="perf" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="scale" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  <svg key="maint" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
];

const codeTabs = [
  {
    id: 'profile',
    title: 'developer.ts',
    lang: 'TypeScript',
    output: `// Execution Result [Status: 200 OK - 14ms]
{
  "engineer": "Noor Setia",
  "status": "Available for Opportunities",
  "education": "BCA (Software Dev, 2024–2027)",
  "specialization": "Full Stack MERN & REST APIs",
  "verifiedProjects": 4,
  "activeFocus": "AI / ML & System Architecture"
}`,
    raw: `// Noor Setia — Engineering Profile
const engineer = {
  name: "Noor Setia",
  role: "Full Stack MERN Developer",
  education: "BCA (Software Dev, 2024–2027)",
  stack: ["React 19", "Node.js", "Express", "MongoDB"],
  focus: ["Clean Architecture", "AI/ML Fundamentals"]
};`,
    codeLines: [
      { text: '// Noor Setia — Engineering Profile', type: 'comment' },
      { text: 'const engineer = {', type: 'code' },
      { text: '  name: "Noor Setia",', type: 'property-str' },
      { text: '  role: "Full Stack MERN Developer",', type: 'property-str' },
      { text: '  education: "BCA (Software Dev, 2024–2027)",', type: 'property-str' },
      { text: '  stack: ["React 19", "Node.js", "Express", "MongoDB"],', type: 'property-arr' },
      { text: '  focus: ["Clean Architecture", "AI/ML Fundamentals"]', type: 'property-arr' },
      { text: '};', type: 'code' }
    ]
  },
  {
    id: 'arch',
    title: 'api-controller.ts',
    lang: 'TypeScript',
    output: `// Execution Result [POST /api/v1/orders - 201 Created]
{
  "success": true,
  "order": {
    "orderId": "ord_9a7b2c",
    "gateway": "Razorpay",
    "status": "captured",
    "verified": true
  }
}`,
    raw: `// Modular Controller & Gateway Integration
export const createOrder = async (req, res) => {
  const { cart, userId } = req.body;
  const order = await orderService.checkout({
    userId,
    items: cart,
    gateway: "Razorpay"
  });
  return res.status(201).json({ success: true, order });
};`,
    codeLines: [
      { text: '// Modular Controller & Gateway Integration', type: 'comment' },
      { text: 'export const createOrder = async (req, res) => {', type: 'code' },
      { text: '  const { cart, userId } = req.body;', type: 'code' },
      { text: '  const order = await orderService.checkout({', type: 'code' },
      { text: '    userId,', type: 'property' },
      { text: '    items: cart,', type: 'property' },
      { text: '    gateway: "Razorpay"', type: 'property-str' },
      { text: '  });', type: 'code' },
      { text: '  return res.status(201).json({ success: true, order });', type: 'code' },
      { text: '};', type: 'code' }
    ]
  },
  {
    id: 'schema',
    title: 'order.model.ts',
    lang: 'Mongoose Schema',
    output: `// Mongoose Model Registered [Collection: "orders"]
{
  "indexes": ["userId_1", "createdAt_-1"],
  "validation": "strict",
  "connection": "mongodb+srv://.../nestora_prod"
}`,
    raw: `// Structured Mongoose Schema with Strict Validation
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: String, quantity: Number, price: Number }],
  total: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });`,
    codeLines: [
      { text: '// Structured Mongoose Schema with Strict Validation', type: 'comment' },
      { text: 'const orderSchema = new Schema({', type: 'code' },
      { text: '  userId: { type: ObjectId, ref: "User", required: true },', type: 'property' },
      { text: '  items: [{ productId: String, quantity: Number }],', type: 'property' },
      { text: '  total: { type: Number, required: true },', type: 'property' },
      { text: '  paymentStatus: { type: String, enum: ["pending", "paid"] }', type: 'property-str' },
      { text: '}, { timestamps: true });', type: 'code' }
    ]
  }
];

export default function About() {
  const { about } = personalInfo;
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const activeSnippet = codeTabs.find(t => t.id === activeTab) || codeTabs[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSnippet = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 450);
  };

  return (
    <section id="about" className="py-24 sm:py-28 px-4 sm:px-6 bg-white dark:bg-[#07090E] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="mb-14 sm:mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              01. Background & Perspective
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
              Engineering Mindset & Architecture
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full"></div>
          </div>
        </Reveal>
        
        {/* TOP ROW: Narrative vs Interactive Code Card */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          
          {/* Left Column: Narrative Cards */}
          <div className="lg:col-span-7 space-y-5">
            <Reveal direction="up" delay={150}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Who I Am</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {about.whoIAm}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={250}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">What I Build</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {about.whatIBuild}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={350}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">How I Think</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {about.howIThink}
                </p>
              </div>
            </Reveal>
          </div>
          
          {/* Right Column: Interactive Code Sandbox Card */}
          <div className="lg:col-span-5 w-full min-w-0 mt-2 lg:mt-0">
            <Reveal direction="right" delay={300} className="w-full">
              <div className="rounded-2xl bg-slate-950 dark:bg-[#090D17] border border-slate-800 dark:border-white/10 shadow-2xl overflow-hidden w-full">
                {/* Window Bar with File Tabs, Run action & Copy Action */}
                <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 bg-slate-900 dark:bg-[#0D1222] border-b border-slate-800 dark:border-white/[0.08] gap-2">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-none" role="tablist" aria-label="Code snippet files">
                    {codeTabs.map((tab) => (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setShowOutput(false);
                        }}
                        className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                          activeTab === tab.id
                            ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>

                  {/* Actions: Run & Copy */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleRunSnippet}
                      disabled={isRunning}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded transition-colors cursor-pointer"
                      title="Simulate executing this code snippet"
                    >
                      {isRunning ? (
                        <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                      ) : (
                        <span>▶ Run</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 transition-colors"
                      aria-label="Copy code to clipboard"
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Code Body with Protected Flow & Syntax Coloring */}
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-300 max-w-full">
                  <pre className="whitespace-pre overflow-x-auto scrollbar-thin">
                    <code>
                      {activeSnippet.codeLines.map((line, idx) => (
                        <div key={idx} className="table-row">
                          <span className="table-cell select-none pr-3 sm:pr-4 text-slate-600 text-right text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="table-cell">
                            {line.type === 'comment' && (
                              <span className="text-slate-500 italic">{line.text}</span>
                            )}
                            {line.type === 'code' && (
                              <span className="text-slate-200">{line.text}</span>
                            )}
                            {line.type === 'property-str' && (
                              <span>
                                <span className="text-blue-400">{line.text.split(':')[0]}:</span>
                                <span className="text-emerald-400">{line.text.slice(line.text.indexOf(':') + 1)}</span>
                              </span>
                            )}
                            {line.type === 'property-arr' && (
                              <span>
                                <span className="text-blue-400">{line.text.split(':')[0]}:</span>
                                <span className="text-amber-300">{line.text.slice(line.text.indexOf(':') + 1)}</span>
                              </span>
                            )}
                            {line.type === 'property' && (
                              <span className="text-slate-300">{line.text}</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>

                {/* Simulated Terminal Output Tray */}
                {showOutput && (
                  <div className="bg-[#05080E] border-t border-slate-800 px-4 py-3 font-mono text-xs animate-fade-in">
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800/60 text-[10px] text-slate-500">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        TERMINAL OUTPUT
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setShowOutput(false)} 
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <pre className="text-emerald-300/90 whitespace-pre overflow-x-auto text-[11px] leading-relaxed">
                      {activeSnippet.output}
                    </pre>
                  </div>
                )}

                {/* Footer Status */}
                <div className="px-4 py-2.5 bg-slate-950 dark:bg-[#070A12] border-t border-slate-800 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{activeSnippet.lang}</span>
                  <span className="text-blue-400 font-medium">Clean Modular Architecture</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* BOTTOM ROW: Engineering Principles Grid */}
        <Reveal direction="up" delay={200}>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Core Engineering Principles
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Guiding standards applied to every codebase I write.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {about.principles.map((item, index) => (
            <Reveal key={index} direction="up" delay={150 + (index * 80)}>
              <div className="bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-white/[0.06] hover:border-blue-500/40 p-5 sm:p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-sm h-full group">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {principleIcons[index]}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
