import { useState, useEffect } from "react";

const GALAXY_BLUE = "#1B4FD8";
const GALAXY_GREY = "#6B7280";
const NAVY = "#0B1E4D";
const GOLD = "#F59E0B";

const STANDARDS = [
  "Integrity", "Effort", "Coachability", "Accountability", "Teamwork",
  "Courage", "Discipline", "Growth", "Leadership", "Love of the Game", "Long-Term Vision"
];

const BLUE_ROSTER = [
  { name: "Riley Mullinix", number: 1 },
  { name: "Angie Martinez", number: 5 },
  { name: "Taylor Sparks", number: 6 },
  { name: "Skylar Nicklas", number: 7 },
  { name: "Jade Rivas", number: 10 },
  { name: "Selah Djiogo", number: 19 },
  { name: "Rylee Bradney", number: 21 },
  { name: "Celine Saba", number: 22 },
  { name: "Sanaa Wright", number: 23 },
  { name: "Bella Bottcher", number: 27 },
];

const GREY_ROSTER = [
  { name: "Riley Mullinix", number: 1 },
  { name: "Lily Wilson", number: 4 },
  { name: "Ivy Brooks", number: 9 },
  { name: "Gia Kaputsos", number: 11 },
  { name: "Zyra Amollo", number: 14 },
  { name: "Charlee Hubbe", number: 15 },
  { name: "Emilee Loewe", number: 18 },
  { name: "Riley Chavis", number: 29 },
  { name: "Iliani Hernandez" },
];

function StarField() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: i % 5 === 0 ? 3 : 2,
          height: i % 5 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: i % 3 === 0 ? GALAXY_BLUE : "rgba(255,255,255,0.3)",
          top: `${Math.sin(i * 2.4) * 50 + 50}%`,
          left: `${(i * 7.3) % 100}%`,
          opacity: 0.4 + (i % 4) * 0.15,
          animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${(i * 0.3) % 3}s`
        }} />
      ))}
    </div>
  );
}

function HexBadge({ letter, color, size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <polygon
        points="24,2 44,13 44,35 24,46 4,35 4,13"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
      <text x="24" y="31" textAnchor="middle" fill={color} fontSize="18" fontWeight="900" fontFamily="Georgia, serif">{letter}</text>
    </svg>
  );
}

function CoachCard({ name, role, initials, color }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${color}30`,
      borderTop: `3px solid ${color}`,
      borderRadius: 16,
      padding: "28px 24px",
      flex: 1,
      minWidth: 200,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: color + "08"
      }} />
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: color + "20",
        border: `2px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 900, color, fontFamily: "Georgia, serif",
        marginBottom: 16
      }}>{initials}</div>
      <div style={{ fontSize: 11, color: color, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>{role}</div>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif" }}>{name}</div>
    </div>
  );
}

function PlayerChip({ name, number, index, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 12px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderLeft: `3px solid ${color}`,
      borderRadius: 8,
      animation: "fadeUp 0.4s ease forwards",
      animationDelay: `${index * 0.05}s`,
      opacity: 0
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, color, flexShrink: 0
      }}>#{number}</div>
      <span style={{ fontSize: 13, color: "#ddd" }}>{name}</span>
    </div>
  );
}

function StandardBadge({ text, index }) {
  return (
    <div style={{
      padding: "6px 14px",
      border: "1px solid rgba(27,79,216,0.35)",
      borderRadius: 99,
      fontSize: 12,
      color: "#93c5fd",
      background: "rgba(27,79,216,0.08)",
      animation: "fadeUp 0.3s ease forwards",
      animationDelay: `${index * 0.06}s`,
      opacity: 0
    }}>{text}</div>
  );
}

export default function GalaxyFCHome({ onNavigate }) {
  const [activeTeam, setActiveTeam] = useState("blue");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      background: "#060D1F",
      color: "#f0f0f0",
      minHeight: "100vh",
      overflowX: "hidden"
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .nav-link {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.2s;
          font-family: Georgia, serif;
        }
        .nav-link:hover { color: #fff; }
        .team-btn {
          padding: 10px 24px;
          border-radius: 99px;
          border: 1.5px solid transparent;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          font-family: Georgia, serif;
          letter-spacing: 1px;
          transition: all 0.25s;
        }
        .section-enter {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 60 ? "rgba(6,13,31,0.95)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <HexBadge letter="G" color={GALAXY_BLUE} size={36} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>Galaxy Soccer</div>
            <div style={{ fontSize: 9, color: "#4B5563", letterSpacing: 2, textTransform: "uppercase" }}>Baltimore Bays</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#teams" className="nav-link">Teams</a>
          <a href="#coaches" className="nav-link">Coaches</a>
          <a href="#standards" className="nav-link">Standards</a>
          <a href="#about" className="nav-link">About</a>
          <button
            onClick={() => onNavigate && onNavigate("training")}
            style={{
              background: GALAXY_BLUE,
              border: "none",
              borderRadius: 99,
              color: "#fff",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              padding: "7px 16px",
              fontWeight: 700
            }}>
            Training ⚽
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        textAlign: "center"
      }}>
        <StarField />

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 80% 50% at 50% 70%, rgba(27,79,216,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(11,30,77,0.6) 0%, transparent 60%)
          `
        }} />

        <div style={{ position: "relative", zIndex: 1, animation: "slideIn 0.8s ease forwards", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            display: "inline-block",
            padding: "5px 16px",
            border: "1px solid rgba(27,79,216,0.4)",
            borderRadius: 99,
            fontSize: 10,
            letterSpacing: 4,
            color: "#60a5fa",
            textTransform: "uppercase",
            marginBottom: 32,
            background: "rgba(27,79,216,0.08)"
          }}>Baltimore Bays · 9U · Est. 2017–2018</div>

          {/* CREST IMAGE */}
          <div style={{
            width: 260, height: 260,
            marginBottom: 32,
            position: "relative",
            filter: "drop-shadow(0 0 40px rgba(27,79,216,0.5))"
          }}>
            <img
              src="/galaxy-crest.png"
              alt="Baltimore Bays Galaxy Soccer crest"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <h1 style={{
            margin: "0 0 8px",
            fontSize: "clamp(44px, 8vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.95,
            color: "#fff",
            letterSpacing: -2
          }}>
            Galaxy Soccer
          </h1>

          <div style={{
            fontSize: "clamp(11px, 2vw, 14px)",
            color: "#6B7280",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 28
          }}>Baltimore Bays</div>

          <p style={{
            fontSize: 18,
            color: "#93c5fd",
            fontStyle: "italic",
            margin: "0 auto 40px",
            maxWidth: 420,
            lineHeight: 1.7
          }}>
            Train with Purpose.<br />
            Play with Confidence.<br />
            Grow with Galaxy.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#teams" style={{
              padding: "12px 28px",
              background: GALAXY_BLUE,
              color: "#fff",
              borderRadius: 99,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "Georgia, serif",
              border: "none",
              display: "inline-block"
            }}>Meet the Teams</a>
            <button
              onClick={() => onNavigate && onNavigate("training")}
              style={{
                padding: "12px 28px",
                background: "transparent",
                color: "#93c5fd",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                fontFamily: "Georgia, serif",
                border: "1.5px solid rgba(147,197,253,0.3)",
                cursor: "pointer"
              }}>⚽ 30-Day Training Program</button>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          animation: "pulse 2s ease-in-out infinite"
        }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(27,79,216,0.6), transparent)" }} />
        </div>
      </section>

      {/* TRAINING CTA BANNER */}
      <section style={{
        padding: "0 24px",
        maxWidth: 900,
        margin: "0 auto 0",
      }}>
        <div
          onClick={() => onNavigate && onNavigate("training")}
          style={{
            background: `linear-gradient(135deg, ${GALAXY_BLUE}22, rgba(27,79,216,0.05))`,
            border: `1px solid ${GALAXY_BLUE}40`,
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            cursor: "pointer",
            transform: "translateY(-40px)",
            flexWrap: "wrap"
          }}>
          <div>
            <div style={{ fontSize: 10, color: "#60a5fa", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Now Available</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>30-Day Training Program ⚽</div>
            <div style={{ fontSize: 13, color: "#6B7280" }}>Position-specific plans for Center Mid, Striker, Winger & Defender</div>
          </div>
          <div style={{
            background: GALAXY_BLUE,
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            letterSpacing: 1,
            whiteSpace: "nowrap",
            flexShrink: 0
          }}>Start Training →</div>
        </div>
      </section>

      {/* COACHES */}
      <section id="coaches" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, color: GALAXY_BLUE, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>Leadership</div>
          <h2 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: "#fff" }}>The Coaching Staff</h2>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <CoachCard name="Justin Nicklas" role="Coach" initials="JN" color={GALAXY_BLUE} />
          <CoachCard name="Nick Bottcher" role="Coach" initials="NB" color="#60a5fa" />
                <CoachCard name="Silverio Hernandez" role="Coach" initials="SH" color={GALAXY_GREY} />
                <CoachCard name="Shannon Nicklas" role="Team Manager" initials="SN" color="#34d399" />
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "28px 24px",
            flex: 1, minWidth: 180,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            gap: 8
          }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20, color: "#4B5563" }}>+</span>
            </div>
            <div style={{ fontSize: 11, color: "#4B5563", letterSpacing: 2, textTransform: "uppercase" }}>Team Manager</div>
            <div style={{ fontSize: 14, color: "#6B7280" }}>Coming Soon</div>
          </div>
        </div>

        <div style={{
          marginTop: 32,
          padding: "20px 24px",
          background: "rgba(27,79,216,0.06)",
          border: "1px solid rgba(27,79,216,0.15)",
          borderRadius: 16,
          fontSize: 14,
          color: "#93c5fd",
          lineHeight: 1.8,
          fontStyle: "italic"
        }}>
          "Justin and Nick coach together and make decisions together. Our focus is player development, team culture, and helping every player reach her potential."
        </div>
      </section>

      {/* TEAMS */}
      <section id="teams" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, color: GALAXY_BLUE, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>9U Squads</div>
            <h2 style={{ margin: "0 0 24px", fontSize: 36, fontWeight: 900, color: "#fff" }}>Our Teams</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="team-btn"
                onClick={() => setActiveTeam("blue")}
                style={{
                  background: activeTeam === "blue" ? GALAXY_BLUE : "transparent",
                  borderColor: activeTeam === "blue" ? GALAXY_BLUE : "rgba(255,255,255,0.12)",
                  color: activeTeam === "blue" ? "#fff" : "#9CA3AF"
                }}>
                ⬡ Galaxy Blue
              </button>
              <button
                className="team-btn"
                onClick={() => setActiveTeam("grey")}
                style={{
                  background: activeTeam === "grey" ? GALAXY_GREY : "transparent",
                  borderColor: activeTeam === "grey" ? GALAXY_GREY : "rgba(255,255,255,0.12)",
                  color: activeTeam === "grey" ? "#fff" : "#9CA3AF"
                }}>
                ⬡ Galaxy Grey
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <div style={{
                padding: "20px 24px",
                background: `linear-gradient(135deg, ${activeTeam === "blue" ? GALAXY_BLUE : GALAXY_GREY}18, transparent)`,
                border: `1px solid ${activeTeam === "blue" ? GALAXY_BLUE : GALAXY_GREY}30`,
                borderRadius: 16,
                marginBottom: 20
              }}>
                <div style={{ fontSize: 10, color: activeTeam === "blue" ? "#60a5fa" : "#9CA3AF", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                  {activeTeam === "blue" ? "Galaxy Blue" : "Galaxy Grey"}
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>
                  {activeTeam === "blue" ? BLUE_ROSTER.length : GREY_ROSTER.length} Players
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>9U Development Squad</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {(activeTeam === "blue" ? BLUE_ROSTER : GREY_ROSTER).map((player, i) => (
                  <PlayerChip
                    key={player.name + player.number}
                    name={player.name}
                    number={player.number}
                    index={i}
                    color={activeTeam === "blue" ? GALAXY_BLUE : GALAXY_GREY}
                  />
                ))}
              </div>
            </div>

            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#6B7280", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Schedule</div>
                {[
                  { label: "Practice", detail: "Tuesday · 6:00 PM", icon: "⚽" },
                  { label: "Game Day", detail: "Saturday · 9:00 AM", icon: "🏟️" },
                  { label: "Weekly Challenge", detail: "Scan Before Every Touch", icon: "👁" }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    marginBottom: 8
                  }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280", letterSpacing: 1 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 700 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                padding: "16px 18px",
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 14
              }}>
                <div style={{ fontSize: 10, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Player Spotlight</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 4 }}>⭐ Bella Bottcher #27</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.6, fontStyle: "italic" }}>
                  "Great week scanning before receiving. Focus next week: use left foot more often."
                </div>
                <div style={{ fontSize: 10, color: "#4B5563", marginTop: 8 }}>— Coach note</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section id="standards" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, color: GALAXY_BLUE, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>Culture</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 36, fontWeight: 900, color: "#fff" }}>Galaxy Player Standards</h2>
          <p style={{ margin: 0, color: "#6B7280", fontSize: 14, lineHeight: 1.7 }}>
            More than soccer skills — we're building the whole person.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {STANDARDS.map((s, i) => (
            <StandardBadge key={s} text={s} index={i} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: "80px 24px",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 10, color: GALAXY_BLUE, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>About Us</div>
          <h2 style={{ margin: "0 0 28px", fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
            Development<br />Before Results.
          </h2>
          <div style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.9 }}>
            <p style={{ margin: "0 0 20px" }}>
              Baltimore Bays Galaxy Soccer is focused on developing confident players, great teammates, and strong young people.
            </p>
            <p style={{ margin: "0 0 20px" }}>
              Our coaches, Justin Nicklas and Nick Bottcher, work together to create a positive, challenging environment where every player can learn, improve, and enjoy the game.
            </p>
            <p style={{ margin: 0 }}>
              We believe development comes before results. We encourage our players to be brave, work hard, support their teammates, and embrace mistakes as opportunities to grow. Our goal is simple: help every player become the best version of herself on and off the field.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "32px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <HexBadge letter="G" color={GALAXY_BLUE} size={28} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#fff" }}>Baltimore Bays Galaxy Soccer</div>
            <div style={{ fontSize: 10, color: "#374151" }}>9U · Galaxy Blue & Galaxy Grey</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#374151" }}>
          Train with Purpose · Play with Confidence · Grow with Galaxy
        </div>
      </footer>
    </div>
  );
}
