import React, { useEffect, useState } from "react";
import axios from "axios";
import ResumeDetails from "./ResumeDetails";

export default function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/api/resumes");
        setResumes(res.data);
      } catch (e) {
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>File Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Uploaded At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.file_name}</td>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{new Date(r.uploaded_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setSelected(r)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div style={{ marginTop: 16 }}>
          <h3>Resume #{selected.id} Details</h3>
          <ResumeDetails data={selected} />
        </div>
      )}
    </div>
  );
}
