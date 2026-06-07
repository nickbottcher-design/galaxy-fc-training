import { useState } from "react";
import GalaxyFCHome from "./GalaxyFCHome";
import SoccerProgram from "./SoccerProgram";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" ? (
        <GalaxyFCHome onNavigate={setPage} />
      ) : (
        <div>
          <div style={{
            background: "#060D1F",
            borderBottom: "1px solid rgba(27,79,216,0.2)",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "sticky",
            top: 0,
            zIndex: 100
          }}>
            <button
              onClick={() => setPage("home")}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
              ← Galaxy Soccer
            </button>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
            <span style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#60a5fa",
              fontFamily: "Georgia, serif"
            }}>30-Day Training Program</span>
          </div>
          <SoccerProgram />
        </div>
      )}
    </div>
  );
}
