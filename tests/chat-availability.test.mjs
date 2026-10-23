import assert from 'node:assert/strict';
import chatHandler from '../api/chat.js';
import { getAvailabilityReply, GROQ_MODEL, PORTFOLIO_CONTEXT } from '../lib/chat.js';

const context = JSON.parse(PORTFOLIO_CONTEXT);
assert.deepEqual(context.personalInfo.availability, {
  summary: 'Noor Setia is open to internship and full-time opportunities, including Frontend Developer, React Developer, Backend Developer, MERN Stack Developer, and Full Stack Developer roles.',
  internships: true,
  fullTimeRoles: true,
  preferredRoles: ['Frontend Developer', 'React Developer', 'MERN Stack Developer', 'Full Stack Developer', 'Backend Developer'],
  relevantSkills: ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB'],
});

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
  assert.equal(getAvailabilityReply('Tell me about Noor’s internship project.'), null);

  const originalApiKey = process.env.GROQ_API_KEY;
  let upstreamRequest;
  process.env.GROQ_API_KEY = 'test-only-key';
  globalThis.fetch = async (url, options) => {
    upstreamRequest = { url, options, body: JSON.parse(options.body) };
    return {
      ok: true,
      status: 200,
      async json() {
        return { choices: [{ message: { content: 'NESTORA is one of Noor’s portfolio projects.' } }] };
      },
    };
  };
  try {
    const unrelatedResult = await requestChat('Tell me about the NESTORA project.');
    assert.equal(unrelatedResult.statusCode, 200);
    assert.match(unrelatedResult.body.reply, /NESTORA/);
    assert.equal(upstreamRequest.url, 'https://api.groq.com/openai/v1/chat/completions');
    assert.equal(upstreamRequest.body.model, GROQ_MODEL);
    assert.equal(upstreamRequest.body.messages[0].content.includes('"availability":{"summary"'), true);
    assert.equal(upstreamRequest.body.messages.at(-1).content, 'Tell me about the NESTORA project.');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = originalApiKey;
  }
  process.stdout.write('Availability context and API checks passed.\n');
}

await run();
