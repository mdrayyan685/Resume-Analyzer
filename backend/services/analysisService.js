const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function parsePdf(fileBuffer) {
  const data = await pdf(fileBuffer);
  return data.text || '';
}

function buildPrompt(resumeText) {
  const open = '${';
  const close = '}';
  return `You are an expert technical recruiter and career coach.
Return ONLY a valid JSON object matching this exact schema (no backticks, no markdown, no extra words):

{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": [{"name":"string","description":"string"}],
  "certifications": ["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}

Resume Text:
"""
` + open + `resumeText` + close + `
"""`;
}

async function analyzeResume(resumeText) {
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = buildPrompt(resumeText);
  const result = await model.generateContent(prompt);
  const txt = result?.response?.text?.() ?? result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  try {
    return JSON.parse(txt);
  } catch (e) {
    return {
      name: null, email: null, phone: null, linkedin_url: null, portfolio_url: null, summary: null,
      work_experience: [], education: [], technical_skills: [], soft_skills: [],
      projects: [], certifications: [], resume_rating: null, improvement_areas: String(txt).slice(0, 200),
      upskill_suggestions: []
    };
  }
}

module.exports = { parsePdf, analyzeResume };
