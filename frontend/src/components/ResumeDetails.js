import React from "react";

export default function ResumeDetails({ data }) {
  const Work = ({ items }) => (
    <ul>
      {(items || []).map((w, i) => (
        <li key={i}>
          <strong>{w.role}</strong> @ {w.company} — {w.duration}
          {w.description && Array.isArray(w.description) && (
            <ul>
              {w.description.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  const Edu = ({ items }) => (
    <ul>
      {(items || []).map((e, i) => (
        <li key={i}>
          <strong>{e.degree}</strong>, {e.institution} — {e.graduation_year}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ marginTop: 16, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>{data.name || "Candidate"}</h2>
      <p><strong>Email:</strong> {data.email || "-"}</p>
      <p><strong>Phone:</strong> {data.phone || "-"}</p>
      <p><strong>LinkedIn:</strong> {data.linkedin_url || "-"}</p>
      <p><strong>Portfolio:</strong> {data.portfolio_url || "-"}</p>
      <p><strong>Summary:</strong> {data.summary || "-"}</p>

      <h3>Work Experience</h3>
      <Work items={data.work_experience} />

      <h3>Education</h3>
      <Edu items={data.education} />

      <h3>Technical Skills</h3>
      <p>{(data.technical_skills || []).join(", ") || "-"}</p>

      <h3>Soft Skills</h3>
      <p>{(data.soft_skills || []).join(", ") || "-"}</p>

      <h3>Projects</h3>
      <ul>
        {(data.projects || []).map((p, i) => (
          <li key={i}><strong>{p.name}:</strong> {p.description}</li>
        ))}
      </ul>

      <h3>Certifications</h3>
      <ul>
        {(data.certifications || []).map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <h3>Rating & Suggestions</h3>
      <p><strong>Rating:</strong> {data.resume_rating ?? "-"}/10</p>
      <p><strong>Improvement Areas:</strong> {data.improvement_areas || "-"}</p>
      <p><strong>Upskill Suggestions:</strong> {(data.upskill_suggestions || []).join(", ") || "-"}</p>
    </div>
  );
}
