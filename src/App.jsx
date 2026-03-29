import { useState } from "react";
import GapAnalysis from "./GapAnalysis.jsx";
import AssessmentMatrix from "./AssessmentMatrix.jsx";

export default function App() {
  const [view, setView] = useState("gaps");

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", background: "#08080e", minHeight: "100vh" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0a0a12", borderBottom: "1px solid #1a1a2a",
        padding: "10px 20px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <span style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14, fontWeight: 700, color: "#fff", marginRight: 8,
        }}>
          Polymarket Research
        </span>
        <div style={{ width: 1, height: 20, background: "#222" }} />
        {[
          { key: "gaps", label: "Gap Analysis" },
          { key: "assess", label: "Assessment Matrix" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            style={{
              padding: "6px 16px", borderRadius: 5, fontSize: 11,
              fontFamily: "inherit", cursor: "pointer",
              border: `1px solid ${view === tab.key ? "#6366f1" : "#222"}`,
              background: view === tab.key ? "#6366f1" : "transparent",
              color: view === tab.key ? "#fff" : "#71717a",
              fontWeight: view === tab.key ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#555" }}>
          Data verified Mar 27, 2026
        </span>
      </nav>
      {view === "gaps" ? <GapAnalysis /> : <AssessmentMatrix />}
    </div>
  );
}
