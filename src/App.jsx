import { useState, useEffect } from "react";
import GalaxyFCHome from "./GalaxyFCHome";
import SoccerProgram from "./SoccerProgram";

const STORAGE_KEY = "galaxy-fc-progress";

export default function App() {
  const [page, setPage] = useState("home");

  // Load saved progress from the browser (this device only)
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save progress back to the browser whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
    } catch {
      // Storage may be unavailable (private mode, quota) — progress just won't persist.
    }
  }, [completedDays]);

  // Save/toggle a completed day
  const toggleComplete = (position, weekIdx, dayIdx) => {
    const key = `${position}-w${weekIdx}d${dayIdx}`;
    setCompletedDays(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavigate = (dest) => {
    setPage(dest);
  };

  return (
    <div>
      {page === "home" ? (
        <GalaxyFCHome onNavigate={handleNavigate} />
      ) : (
        <div>
          <div style={{
            background: "#060D1F",
            borderBottom: "1px solid rgba(27,79,216,0.2)",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <button
                onClick={() => setPage("home")}
                style={{
                  background: "transparent", border: "none",
                  color: "rgba(255,255,255,0.5)", fontSize: 12,
                  letterSpacing: 2, textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "Georgia, serif", padding: 0,
                  display: "flex", alignItems: "center", gap: 6
                }}>
                ← Galaxy Soccer
              </button>
              <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#60a5fa", fontFamily: "Georgia, serif" }}>
                30-Day Training Program
              </span>
            </div>
          </div>
          <SoccerProgram
            completedDays={completedDays}
            onToggleComplete={toggleComplete}
          />
        </div>
      )}
    </div>
  );
}
