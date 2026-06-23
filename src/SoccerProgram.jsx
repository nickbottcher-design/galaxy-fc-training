import { useState } from "react";
import { CM_PROGRAM } from "./programs/cmProgram";
import { STRIKER_PROGRAM } from "./programs/strikerProgram";
import { WINGER_PROGRAM } from "./programs/wingerProgram";
import { DEFENDER_PROGRAM } from "./programs/defenderProgram";
import { TIPS } from "./programs/tips";

const POSITIONS = {
  cm: { id: "cm", label: "Center Mid", emoji: "🎯", color: "#4ade80", desc: "The engine of the team. Link defense to attack, press, distribute, and lead.", traits: ["Box-to-box runs", "Scanning & vision", "Switching the field", "Pressing triggers"] },
  striker: { id: "striker", label: "Striker", emoji: "🔥", color: "#f97316", desc: "Goalscorer. Movement, finishing, turning defenders, and runs in behind.", traits: ["Finishing & shooting", "Runs in behind", "Hold-up play", "Turning to goal"] },
  winger: { id: "winger", label: "Winger", emoji: "⚡", color: "#f59e0b", desc: "Speed merchant on the flanks. Beat players 1v1, cross, and cut inside.", traits: ["1v1 speed dribbling", "Crossing", "Cutting inside", "Wide sprinting"] },
  defender: { id: "defender", label: "Defender", emoji: "🛡️", color: "#38bdf8", desc: "The foundation. Win duels, read the game, and build from the back.", traits: ["1v1 defending", "Positioning", "Heading & clearing", "Building out"] },
};

const WEEK_THEMES = ["Foundation", "Build Intensity", "Peak Training", "Apply & Refine"];
const WEEK_COLORS = ["#4ade80", "#f59e0b", "#f97316", "#a78bfa"];
const SKILL_COLORS = { fastFeet: "#f97316", feint: "#a78bfa", scanning: "#38bdf8" };

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
function SkillBlock({ color, icon, label, drill, isScanning }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{icon} {label}</div>
      <div style={{ background: color + "0e", border: "1px solid " + color + "28", borderRadius: 12, padding: "11px 13px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{isScanning ? drill.cue : drill.drill}</span>
          {!isScanning && <span style={{ fontSize: 9, color, background: color + "20", padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap", marginLeft: 8 }}>{drill.duration}</span>}
        </div>
        <p style={{ margin: 0, fontSize: 12, color: "#bbb", lineHeight: 1.6 }}>{drill.desc}</p>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{title}</div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "11px 13px" }}>{children}</div>
    </div>
  );
}

export default function SoccerProgram({ completedDays = {}, onToggleComplete }) {
  const [position, setPosition] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  
  const PROGRAMS = { cm: CM_PROGRAM, striker: STRIKER_PROGRAM, winger: WINGER_PROGRAM, defender: DEFENDER_PROGRAM };
  const pos = position ? POSITIONS[position] : null;
  const program = position ? PROGRAMS[position] : null;
  const week = program ? program.weeks[selectedWeek] : null;
  const day = week && selectedDay !== null ? week.days[selectedDay] : null;
  const weekColor = WEEK_COLORS[selectedWeek];

  const toggleComplete = (posKey, weekIdx, dayIdx) => {
      if (onToggleComplete) onToggleComplete(posKey, weekIdx, dayIdx);
  };
    

  const totalDays = 30;
  const completedCount = position ? Object.keys(completedDays).filter(k => k.startsWith(position + "-") && completedDays[k]).length : 0;
  const progressPct = Math.round((completedCount / totalDays) * 100);

  if (!position) {
    return (
      <div style={{ fontFamily: "'Georgia', serif", background: "#0a0f1e", minHeight: "100vh", color: "#f0f0f0", padding: "32px 20px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#4ade80", textTransform: "uppercase", marginBottom: 8 }}>9U Summer Program</div>
          <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>30-Day Training<br />Program</h1>
          <p style={{ margin: "0 0 32px", fontSize: 14, color: "#888" }}>Choose your position to get a customized program built for your role.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {Object.values(POSITIONS).map(p => (
              <button key={p.id} onClick={() => { setPosition(p.id); setSelectedWeek(0); setSelectedDay(null); }}
                style={{ background: p.color + "18", border: "1.5px solid " + p.color + "40", borderRadius: 16, padding: "20px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "Georgia, serif" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: 15, color: p.color, marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5, marginBottom: 10 }}>{p.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {p.traits.map((t, i) => (
                    <div key={i} style={{ fontSize: 10, color: p.color, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ opacity: 0.6 }}>▸</span> {t}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div style={{ fontFamily: "'Georgia', serif", background: "#0a0f1e", minHeight: "100vh", color: "#f0f0f0", padding: "32px 20px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <button onClick={() => { setPosition(null); setSelectedDay(null); }}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: pos.color, fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 24, padding: 0 }}>
            ← Change Position
          </button>
          <div style={{ textAlign: "center", padding: "48px 24px", background: pos.color + "10", border: "1px solid " + pos.color + "30", borderRadius: 16 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{pos.emoji}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{pos.label} Program</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>Coming soon! The {pos.label} 30-day program is still in the works.<br />For now, try the Center Mid program.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0f1e", minHeight: "100vh", color: "#f0f0f0" }}>
      <div style={{ background: "linear-gradient(135deg, #0d3020 0%, #1a5a38 50%, #0a2518 100%)", padding: "24px 20px 20px", borderBottom: "3px solid " + pos.color }}>
        <button onClick={() => { setPosition(null); setSelectedDay(null); }}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: pos.color, fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 12, padding: 0 }}>
          ← Change Position
        </button>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{ fontSize: 32 }}>{pos.emoji}</div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: pos.color, textTransform: "uppercase" }}>9U {pos.label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>30-Day Program</div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#888", marginBottom: 4 }}>
            <span>Progress</span><span>{completedCount}/30 days</span>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 99, height: 8 }}>
            <div style={{ height: 8, borderRadius: 99, width: progressPct + "%", background: "linear-gradient(90deg, " + pos.color + ", " + pos.color + "aa)", transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0d1525" }}>
        {WEEK_THEMES.map((theme, i) => (
          <button key={i} onClick={() => { setSelectedWeek(i); setSelectedDay(null); }}
            style={{ flex: 1, padding: "10px 2px", border: "none", cursor: "pointer", background: selectedWeek === i ? WEEK_COLORS[i] + "15" : "transparent", borderBottom: selectedWeek === i ? "3px solid " + WEEK_COLORS[i] : "3px solid transparent", color: selectedWeek === i ? WEEK_COLORS[i] : "#555", fontSize: 10, fontFamily: "Georgia, serif", transition: "all 0.2s" }}>
            <div style={{ fontWeight: 700 }}>WK {i + 1}</div>
            <div style={{ fontSize: 8, marginTop: 1 }}>{theme.toUpperCase()}</div>
          </button>
        ))}
      </div>

      {day ? (
        <div style={{ paddingBottom: 80 }}>
          <button onClick={() => setSelectedDay(null)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 20px", background: "transparent", border: "none", color: pos.color, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            ← Back to Week {selectedWeek + 1}
          </button>
          <div style={{ padding: "0 20px" }}>
            <div style={{ background: "linear-gradient(135deg, " + weekColor + "22, " + weekColor + "05)", border: "1px solid " + weekColor + "35", borderRadius: 16, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: weekColor, letterSpacing: 2, textTransform: "uppercase" }}>Day {day.day}</div>
              <div style={{ fontSize: 20, fontWeight: 900, marginTop: 3 }}>{day.focus}</div>
            </div>
            <Section title="🔥 Warm-Up" color="#f59e0b"><p style={{ margin: 0, fontSize: 14, color: "#ccc", lineHeight: 1.6 }}>{day.warmup}</p></Section>
            {day.fastFeet && <SkillBlock color={SKILL_COLORS.fastFeet} icon="⚡" label="Fast Feet" drill={day.fastFeet} />}
            {day.feint && <SkillBlock color={SKILL_COLORS.feint} icon="🎭" label="Feint" drill={day.feint} />}
            {day.scanning && <SkillBlock color={SKILL_COLORS.scanning} icon="👁" label="Scanning" drill={day.scanning} isScanning />}
            {day.drills.length > 0 && (
              <Section title="⚽ Drills" color={weekColor}>
                {day.drills.map((d, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "11px 13px", marginBottom: 9, borderLeft: "3px solid " + weekColor }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{d.name}</span>
                      <span style={{ fontSize: 9, color: weekColor, background: weekColor + "20", padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap", marginLeft: 8 }}>{d.duration}</span>
                    </div>
                    <p style={{ margin: "5px 0 0", fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{d.desc}</p>
                  </div>
                ))}
              </Section>
            )}
            <Section title="🎯 Passing / Position Work" color="#60a5fa"><p style={{ margin: 0, fontSize: 14, color: "#ccc", lineHeight: 1.6 }}>{day.passing}</p></Section>
            <Section title="❄️ Cool Down" color="#a78bfa"><p style={{ margin: 0, fontSize: 14, color: "#ccc", lineHeight: 1.6 }}>{day.cooldown}</p></Section>
            <button onClick={() => toggleComplete(position, selectedWeek, selectedDay)}
              style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 14, marginTop: 6, background: completedDays[position + "-w" + selectedWeek + "d" + selectedDay] ? pos.color + "18" : "linear-gradient(135deg, #16a34a, #15803d)", color: completedDays[position + "-w" + selectedWeek + "d" + selectedDay] ? pos.color : "#fff", outline: completedDays[position + "-w" + selectedWeek + "d" + selectedDay] ? "1px solid " + pos.color : "none" }}>
              {completedDays[position + "-w" + selectedWeek + "d" + selectedDay] ? "✓ Completed!" : "Mark as Complete"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: "14px 20px 80px" }}>
          <div style={{ background: weekColor + "18", border: "1px solid " + weekColor + "28", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: weekColor, letterSpacing: 2, textTransform: "uppercase" }}>Week {selectedWeek + 1}</div>
            <div style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>{WEEK_THEMES[selectedWeek]}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>Tap any day to see the full session</div>
          </div>
          {week.days.map((d, i) => {
            const doneKey = position + "-w" + selectedWeek + "d" + i;
            const done = completedDays[doneKey];
            const isRest = d.drills.length === 0 && !d.fastFeet;
            const badges = [d.fastFeet && "⚡", d.feint && "🎭", d.scanning && "👁"].filter(Boolean);
            return (
              <button key={i} onClick={() => setSelectedDay(i)}
                style={{ width: "100%", textAlign: "left", padding: "13px 14px", marginBottom: 8, borderRadius: 12, border: "none", cursor: "pointer", background: done ? pos.color + "15" : isRest ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)", borderLeft: "4px solid " + (done ? pos.color : isRest ? "#333" : weekColor), display: "flex", alignItems: "center", gap: 12, fontFamily: "Georgia, serif" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: done ? pos.color : isRest ? "#222" : weekColor + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 16 : 12, fontWeight: 700, color: done ? "#0a0f1e" : isRest ? "#444" : weekColor }}>
                  {done ? "✓" : d.day}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: done ? pos.color : "#fff" }}>{d.focus}</div>
                  {badges.length > 0 && <div style={{ display: "flex", gap: 5, marginTop: 3 }}>{badges.map((b, bi) => <span key={bi} style={{ fontSize: 11 }}>{b}</span>)}</div>}
                </div>
                {!isRest && <div style={{ color: "#444", fontSize: 16 }}>›</div>}
              </button>
            );
          })}
          {selectedWeek === 0 && (
            <div style={{ marginTop: 18, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#60a5fa", textTransform: "uppercase", marginBottom: 10 }}>{pos.label} Golden Rules</div>
              {TIPS[position].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <span style={{ color: pos.color, fontSize: 11, marginTop: 2 }}>▸</span>
                  <span style={{ fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
