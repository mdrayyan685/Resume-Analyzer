import React, { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import PastResumesTable from "./components/PastResumesTable";

export default function App() {
  const [tab, setTab] = useState("upload");

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Resume Analyzer</h1>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => setTab("upload")}>Resume Analysis</button>
        <button onClick={() => setTab("history")} style={{ marginLeft: 12 }}>Historical Viewer</button>
      </div>
      <div style={{ marginTop: 24 }}>
        {tab === "upload" ? <ResumeUploader /> : <PastResumesTable />}
      </div>
    </div>
  );
}
