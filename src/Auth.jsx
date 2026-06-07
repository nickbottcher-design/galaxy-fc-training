import { useState } from "react";
import { supabase } from "./supabaseClient";

const GALAXY_BLUE = "#1B4FD8";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      background: "#060D1F",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      color: "#f0f0f0"
    }}>
      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 2, height: 2,
            borderRadius: "50%",
            background: i % 3 === 0 ? GALAXY_BLUE : "rgba(255,255,255,0.3)",
            top: `${Math.sin(i * 2.4) * 50 + 50}%`,
            left: `${(i * 7.3) % 100}%`,
            opacity: 0.5,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
        {/* Crest */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <img
            src="/galaxy-crest.png"
            alt="Galaxy Soccer"
            style={{ width: 120, height: 120, objectFit: "contain", filter: "drop-shadow(0 0 20px rgba(27,79,216,0.5))" }}
          />
        </div>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 10, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>
            Baltimore Bays · 9U
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900, color: "#fff" }}>Galaxy Soccer</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>Sign in to track your training progress</p>
        </div>

        {sent ? (
          <div style={{
            background: "rgba(27,79,216,0.1)",
            border: "1px solid rgba(27,79,216,0.3)",
            borderRadius: 16,
            padding: "28px 24px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📬</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Check your email!</div>
            <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7 }}>
              We sent a magic link to<br />
              <span style={{ color: "#60a5fa" }}>{email}</span><br />
              Click it to sign in — no password needed.
            </div>
          </div>
        ) : (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "28px 24px"
          }}>
            <label style={{ fontSize: 11, color: "#6B7280", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: 14,
                fontFamily: "Georgia, serif",
                marginBottom: 16,
                boxSizing: "border-box",
                outline: "none"
              }}
            />

            {error && (
              <div style={{ fontSize: 12, color: "#f87171", marginBottom: 12 }}>
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !email}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 10,
                border: "none",
                background: email ? GALAXY_BLUE : "rgba(255,255,255,0.05)",
                color: email ? "#fff" : "#4B5563",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "Georgia, serif",
                cursor: email ? "pointer" : "default",
                letterSpacing: 1,
                transition: "all 0.2s"
              }}>
              {loading ? "Sending..." : "Send Magic Link ✉️"}
            </button>

            <p style={{ fontSize: 11, color: "#4B5563", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
              No password needed. We'll email you a link to sign in instantly.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#374151" }}>
          Train with Purpose · Play with Confidence · Grow with Galaxy
        </div>
      </div>
    </div>
  );
}
