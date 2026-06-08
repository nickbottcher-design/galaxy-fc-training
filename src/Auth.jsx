import { useState } from "react";
import { supabase } from "./supabaseClient";

const GALAXY_BLUE = "#1B4FD8";

export default function Auth({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);

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
                if (error.message && error.message.toLowerCase().includes("rate")) {
                          setError("Too many sign-in attempts. Please wait a few minutes and try again, or check your inbox for a previous link.");
                } else {
                          setError(error.message);
                }
        } else {
                setSent(true);
        }
        setLoading(false);
  };

  const handleVerifyOtp = async () => {
        if (!otp || otp.length < 6) return;
        setVerifying(true);
        setError(null);
        const { error } = await supabase.auth.verifyOtp({
                email,
                token: otp.trim(),
                type: "email",
        });
        if (error) {
                setError("That code didn't work. Double-check and try again.");
        } else {
                if (onSuccess) onSuccess();
        }
        setVerifying(false);
  };

  const Stars = () => (
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
      );

  const inputStyle = {
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
        outline: "none",
  };

  const btnStyle = {
        width: "100%",
        padding: "13px",
        borderRadius: 10,
        border: "none",
        background: GALAXY_BLUE,
        color: "#fff",
        fontSize: 14,
        fontWeight: 700,
        fontFamily: "Georgia, serif",
        cursor: "pointer",
        letterSpacing: 1,
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
                <Stars />

                <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                                      <img
                                                    src="/galaxy-crest.png"
                                                    alt="Galaxy Soccer"
                                                    style={{ width: 120, height: 120, objectFit: "contain", filter: "drop-shadow(0 0 20px rgba(27,79,216,0.5))" }}
                                                  />
                          </div>

                          <div style={{ textAlign: "center", marginBottom: 32 }}>
                                      <div style={{ fontSize: 10, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>
                                                    Baltimore Bays
                                      </div>
                                      <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900, color: "#fff" }}>Galaxy Soccer</h1>
                                      <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>Sign in to track your training progress</p>
                          </div>

                  {error && (
                    <div style={{
                                  background: "rgba(239,68,68,0.1)",
                                  border: "1px solid rgba(239,68,68,0.3)",
                                  borderRadius: 10,
                                  padding: "12px 16px",
                                  marginBottom: 16,
                                  fontSize: 13,
                                  color: "#fca5a5",
                                  lineHeight: 1.5,
                    }}>
                      {error}
                    </div>
                  )}

                  {!sent ? (
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
                                                  style={inputStyle}
                                                />
                                  <button
                                                  onClick={handleLogin}
                                                  disabled={loading || !email}
                                                  style={{ ...btnStyle, opacity: (loading || !email) ? 0.5 : 1 }}
                                                >
                                    {loading ? "Sending..." : "Send Magic Link"}
                                  </button>
                    </div>
                  ) : (
                    <div style={{
                                  background: "rgba(27,79,216,0.1)",
                                  border: "1px solid rgba(27,79,216,0.3)",
                                  borderRadius: 16,
                                  padding: "28px 24px",
                    }}>
                                <div style={{ textAlign: "center", marginBottom: 20 }}>
                                              <div style={{ fontSize: 32, marginBottom: 12 }}>📬</div>
                                              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Check your email!</div>
                                              <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7 }}>
                                                              We sent a magic link to<br />
                                                              <span style={{ color: "#60a5fa" }}>{email}</span><br />
                                                              Click it to sign in, or enter the 6-digit code below.
                                              </div>
                                </div>
                    
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                                              <label style={{ fontSize: 11, color: "#6B7280", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                                                              Or enter your 6-digit code
                                              </label>
                                              <input
                                                                type="text"
                                                                inputMode="numeric"
                                                                placeholder="123456"
                                                                maxLength={6}
                                                                value={otp}
                                                                onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                                                                onKeyDown={e => e.key === "Enter" && handleVerifyOtp()}
                                                                style={{ ...inputStyle, letterSpacing: 8, fontSize: 20, textAlign: "center" }}
                                                              />
                                              <button
                                                                onClick={handleVerifyOtp}
                                                                disabled={verifying || otp.length < 6}
                                                                style={{ ...btnStyle, opacity: (verifying || otp.length < 6) ? 0.5 : 1, marginBottom: 12 }}
                                                              >
                                                {verifying ? "Verifying..." : "Verify Code"}
                                              </button>
                                              <button
                                                                onClick={() => { setSent(false); setOtp(""); setError(null); }}
                                                                style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#9CA3AF" }}
                                                              >
                                                              Use a different email
                                              </button>
                                </div>
                    </div>
                        )}
                </div>
        </div>
      );
}
