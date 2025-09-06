import React, { useState } from "react";
import axios from "axios";
import ResumeDetails from "./ResumeDetails";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    setError(null);
    if (!file) return alert("Please select a PDF");
    const formData = new FormData();
    formData.append("resume", file);
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAnalysis(res.data);
    } catch (e) {
      setError(e?.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading} style={{ marginLeft: 8 }}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {analysis && <ResumeDetails data={analysis} />}
    </div>
  );
}
