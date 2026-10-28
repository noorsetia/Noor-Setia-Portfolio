import assert from 'node:assert/strict';
import chatHandler from '../api/chat.js';
import { getAvailabilityReply, GROQ_MODEL, PORTFOLIO_CONTEXT } from '../lib/chat.js';

// ── 1. Availability shape ────────────────────────────────────────────────────
const context = JSON.parse(PORTFOLIO_CONTEXT);
assert.deepEqual(context.personalInfo.availability, {
  summary: 'Noor Setia is open to internship and full-time opportunities, including Frontend Developer, React Developer, Backend Developer, MERN Stack Developer, and Full Stack Developer roles.',
  internships: true,
  fullTimeRoles: true,
  preferredRoles: ['Frontend Developer', 'React Developer', 'MERN Stack Developer', 'Full Stack Developer', 'Backend Developer'],
  relevantSkills: ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB'],
});

// ── 2. Four verified portfolio items are present ─────────────────────────────
const certs = context.certifications;

// A. NavGurukul Certificate of Appreciation
const appreciation = certs.find((c) => c.id === 9);
assert.ok(appreciation, 'NavGurukul appreciation certificate (id 9) must be present');
assert.equal(appreciation.subcategory, 'Awards & Recognition');
assert.equal(appreciation.issuer, 'NavGurukul');
assert.equal(appreciation.verifiedUrl, 'https://drive.google.com/file/d/1F_MV30d-QvKqqAvFWXnRJYNUl4g8rkln/view');
assert.equal(appreciation.titleVerified, true);

// B. AI Workshop (Eternal University × NavGurukul)
const aiWorkshop = certs.find((c) => c.id === 10);
assert.ok(aiWorkshop, 'AI Workshop certificate (id 10) must be present');
assert.equal(aiWorkshop.subcategory, 'Workshops & Training');
assert.equal(aiWorkshop.issuer, 'Eternal University · NavGurukul');
assert.equal(aiWorkshop.verifiedUrl, 'https://drive.google.com/file/d/1JmWz1sqkSiku3yHLlgxOmk5erE78CEE1/view');
assert.equal(aiWorkshop.titleVerified, true);

// C. AI Fundamentals (NavGurukul × Anudip Foundation)
const aiFundamentals = certs.find((c) => c.id === 11);
assert.ok(aiFundamentals, 'AI Fundamentals certificate (id 11) must be present');
assert.equal(aiFundamentals.subcategory, 'Certifications & Training');
assert.equal(aiFundamentals.issuer, 'NavGurukul · Anudip Foundation for Social Welfare');
assert.equal(aiFundamentals.verifiedUrl, 'https://drive.google.com/file/d/1ed5GQ5ixNe1jjj8sQm9C32bWhidmv4jq/view');
assert.equal(aiFundamentals.titleVerified, true);

// D. React Bootcamp (Zuvy)
const reactBootcamp = certs.find((c) => c.id === 6);
assert.ok(reactBootcamp, 'React Bootcamp certificate (id 6) must be present');
assert.equal(reactBootcamp.subcategory, 'Certifications & Training');
assert.equal(reactBootcamp.issuer, 'Zuvy');
assert.equal(reactBootcamp.verifiedUrl, 'https://drive.google.com/file/d/1C0KlZTMZffndSUr2kWH2dJBwJ7X0wzef/view');
assert.equal(reactBootcamp.titleVerified, true);
assert.equal(reactBootcamp.title, 'React Bootcamp');

// ── 3. Vedonyx extension letter must NOT appear anywhere ─────────────────────
const VEDONYX_EXTENSION_ID = '12upwdhgg0xNiVswe2qPcxcSHJJVsnv2t';
const hasVedonyx = certs.some((c) => c.verifiedUrl?.includes(VEDONYX_EXTENSION_ID));
assert.equal(hasVedonyx, false, 'Vedonyx extension letter must NOT appear in public certifications');

// ── 4. All four items have correct certificate URLs ───────────────────────────
const EXPECTED_URLS = [
  'https://drive.google.com/file/d/1F_MV30d-QvKqqAvFWXnRJYNUl4g8rkln/view',
  'https://drive.google.com/file/d/1JmWz1sqkSiku3yHLlgxOmk5erE78CEE1/view',
  'https://drive.google.com/file/d/1ed5GQ5ixNe1jjj8sQm9C32bWhidmv4jq/view',
  'https://drive.google.com/file/d/1C0KlZTMZffndSUr2kWH2dJBwJ7X0wzef/view',
];
for (const url of EXPECTED_URLS) {
  assert.ok(certs.some((c) => c.verifiedUrl === url), `Expected certificate URL missing: ${url}`);
}

// ── 5. AI context contains all four items ────────────────────────────────────
const rawContext = PORTFOLIO_CONTEXT;
assert.ok(rawContext.includes('React Bootcamp'), 'PORTFOLIO_CONTEXT must contain React Bootcamp');
assert.ok(rawContext.includes('AI Fundamentals'), 'PORTFOLIO_CONTEXT must contain AI Fundamentals');
assert.ok(rawContext.includes('Unlocking the Power of Artificial Intelligence'), 'PORTFOLIO_CONTEXT must contain AI workshop title');
assert.ok(rawContext.includes('Certificate of Appreciation'), 'PORTFOLIO_CONTEXT must contain NavGurukul appreciation title');
assert.ok(rawContext.includes('Awards & Recognition'), 'PORTFOLIO_CONTEXT must contain Awards & Recognition subcategory');
assert.ok(rawContext.includes('Workshops & Training'), 'PORTFOLIO_CONTEXT must contain Workshops & Training subcategory');

// ── 6. Availability chat handler tests ───────────────────────────────────────
async function requestChat(message) {
  const result = { statusCode: null, body: null };
  const response = {
    status(code) {
      result.statusCode = code;
      return this;
    },
    json(body) {
      result.body = body;
      return this;
    },
  };
  await chatHandler({
    method: 'POST',
    body: { message },
    headers: {},
    ip: `availability-test-${Math.random()}`,
  }, response);
  return result;
}

async function run() {
  const originalFetch = globalThis.fetch;
  let availabilityFetchCalls = 0;
  globalThis.fetch = async () => {
    availabilityFetchCalls += 1;
    throw new Error('Availability questions must not call Groq.');
  };
  try {
    for (const message of [
      'Is Noor open to internships?',
      'Is Noor available for internships?',
      'Is Noor looking for a full-time job?',
      'Is Noor open to frontend developer roles?',
      'Is Noor available for React development?',
      'Can I hire Noor as a MERN developer?',
      'Can I hire Noor?',
      'Is Noor available for backend development opportunities?',
    ]) {
      const result = await requestChat(message);
      assert.equal(result.statusCode, 200);
      assert.deepEqual(result.body, {
        reply: 'Yes! Noor Setia is open to internship and full-time opportunities, including Frontend Developer, React Developer, Backend Developer, MERN Stack Developer, and Full Stack Developer roles. Please use the contact section of the portfolio to discuss an opportunity.',
        configured: Boolean(process.env.GROQ_API_KEY?.trim()),
      });
    }
    assert.equal(availabilityFetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(getAvailabilityReply('What compensation does Noor expect?'), null);
  assert.equal(getAvailabilityReply('When can Noor start?'), null);
  assert.equal(getAvailabilityReply('Does Noor need employment authorization?'), null);
  assert.equal(getAvailabilityReply('Tell me about Noor\u2019s internship project.'), null);

  // ── 7. Certification questions reach Groq and the context is correct ────────
  const originalApiKey = process.env.GROQ_API_KEY;
  let upstreamRequest;
  process.env.GROQ_API_KEY = 'test-only-key';
  globalThis.fetch = async (url, options) => {
    upstreamRequest = { url, options, body: JSON.parse(options.body) };
    return {
      ok: true,
      status: 200,
      async json() {
        return { choices: [{ message: { content: 'NESTORA is one of Noor\u2019s portfolio projects.' } }] };
      },
    };
  };
  try {
    const unrelatedResult = await requestChat('Tell me about the NESTORA project.');
    assert.equal(unrelatedResult.statusCode, 200);
    assert.match(unrelatedResult.body.reply, /NESTORA/);
    assert.equal(upstreamRequest.url, 'https://api.groq.com/openai/v1/chat/completions');
    assert.equal(upstreamRequest.body.model, GROQ_MODEL);
    // System prompt must carry availability and the new certificate data
    const systemMsg = upstreamRequest.body.messages[0].content;
    assert.ok(systemMsg.includes('"availability":{"summary"'), 'System prompt must include availability');
    assert.ok(systemMsg.includes('React Bootcamp'), 'System prompt must include React Bootcamp');
    assert.ok(systemMsg.includes('AI Fundamentals'), 'System prompt must include AI Fundamentals');
    assert.ok(systemMsg.includes('Awards & Recognition'), 'System prompt must include Awards & Recognition');
    assert.ok(systemMsg.includes('Workshops & Training'), 'System prompt must include Workshops & Training');
    assert.ok(!systemMsg.includes('12upwdhgg0xNiVswe2qPcxcSHJJVsnv2t'), 'System prompt must NOT include Vedonyx extension letter');
    assert.equal(upstreamRequest.body.messages.at(-1).content, 'Tell me about the NESTORA project.');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = originalApiKey;
  }

  // ── 8. Certification question is forwarded to Groq ──────────────────────────
  let certUpstreamRequest;
  process.env.GROQ_API_KEY = 'test-only-key';
  globalThis.fetch = async (url, options) => {
    certUpstreamRequest = { url, options, body: JSON.parse(options.body) };
    return {
      ok: true,
      status: 200,
      async json() {
        return {
          choices: [{
            message: {
              content: 'Noor has completed a React Bootcamp (Zuvy), AI Fundamentals (NavGurukul × Anudip Foundation), an AI workshop (Eternal University × NavGurukul), and received a Certificate of Appreciation from NavGurukul.',
            },
          }],
        };
      },
    };
  };
  try {
    const certResult = await requestChat('What certifications does Noor have?');
    assert.equal(certResult.statusCode, 200);
    assert.ok(certResult.body.reply.includes('React Bootcamp'), 'Cert reply must mention React Bootcamp');
    assert.ok(certResult.body.reply.includes('AI Fundamentals'), 'Cert reply must mention AI Fundamentals');
    // Confirm the question was forwarded to Groq (not short-circuited)
    assert.equal(certUpstreamRequest.url, 'https://api.groq.com/openai/v1/chat/completions');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = originalApiKey;
  }

  process.stdout.write('All certificate, availability, and API context checks passed.\n');
}

await run();
