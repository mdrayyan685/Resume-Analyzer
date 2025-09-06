const pool = require('../db');
const { parsePdf, analyzeResume } = require('../services/analysisService');

function sanitizeText(t) {
  if (typeof t !== 'string') return t;
  return t.replace(/\u0000/g, '');
}

async function uploadResume(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    if (!req.file.originalname.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ error: 'Only PDF files are supported' });
    }

    const resumeText = await parsePdf(req.file.buffer);
    const analysis = await analyzeResume(resumeText);

    const a = analysis || {};
    const insertQuery = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills, projects, certifications,
        resume_rating, improvement_areas, upskill_suggestions
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;
    `;

    const values = [
      req.file.originalname,
      sanitizeText(a.name ?? null),
      sanitizeText(a.email ?? null),
      sanitizeText(a.phone ?? null),
      sanitizeText(a.linkedin_url ?? null),
      sanitizeText(a.portfolio_url ?? null),
      sanitizeText(a.summary ?? null),
      JSON.stringify(a.work_experience ?? []),
      JSON.stringify(a.education ?? []),
      JSON.stringify(a.technical_skills ?? []),
      JSON.stringify(a.soft_skills ?? []),
      JSON.stringify(a.projects ?? []),
      JSON.stringify(a.certifications ?? []),
      Number.isFinite(a.resume_rating) ? a.resume_rating : null,
      sanitizeText(a.improvement_areas ?? null),
      JSON.stringify(a.upskill_suggestions ?? []),
    ];

    const result = await pool.query(insertQuery, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Resume processing failed', detail: String(err?.message || err) });
  }
}

async function getAllResumes(req, res) {
  try {
    const result = await pool.query('SELECT * FROM resumes ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
}

async function getResumeById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM resumes WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
}

module.exports = { uploadResume, getAllResumes, getResumeById };