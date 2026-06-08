import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import GalaxyFCHome from "./GalaxyFCHome";
import SoccerProgram from "./SoccerProgram";

export default function App() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState("home");
    const [completedDays, setCompletedDays] = useState({});

  // Check for existing session on load
  useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
                setLoading(false);
                if (session) loadProgress(session.user.id);
        });

                const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                        setSession(session);
                        if (session) loadProgress(session.user.id);
                          if (session) setPage(p => p === "auth" ? "training" : p);
                });

                return () => subscription.unsubscribe();
  }, []);

  // Load saved progress from Supabase
  const loadProgress = async (userId) => {
        const { data, error } = await supabase
          .from("progress")
          .select("*")
          .eq("player_id", userId);

        if (error) { console.error(error); return; }

        const map = {};
        data.forEach(row => {
                const key = `${row.position}-w${row.week}d${row.day}`;
                map[key] = row.completed;
        });
        setCompletedDays(map);
  };

  // Save/toggle progress to Supabase
  const toggleComplete = async (position, weekIdx, dayIdx) => {
        const key = `${position}-w${weekIdx}d${dayIdx}`;
        const newVal = !completedDays[key];

        setCompletedDays(prev => ({ ...prev, [key]: newVal }));

        if (!session) return;

        await supabase.from("progress").upsert({
                player_id: session.user.id,
                position,
                week: weekIdx,
                day: dayIdx,
                completed: newVal,
                completed_at: newVal ? new Date().toISOString() : null,
        }, { onConflict: "player_id,position,week,day" });
  };

  const handleSignOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setCompletedDays({});
          setPage("home");
  };

      const handleNavigate = (dest) => {
              if (dest === "training" && !session) {
                        setPage("auth");
              } else {
                        setPage(dest);
              }
      };
  if (loading) {
        return (
                <div style={{
                          background: "#060D1F", minHeight: "100vh",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#60a5fa", fontFamily: "Georgia, serif", fontSize: 14, letterSpacing: 2
                }}>
                          LOADING...
                </div>
              );
  }

    if (page === "auth") {
            return <Auth onSuccess={() => setPage("training")} />;
  }

  return (
        <div>
          {page === "home" ? (
                  <GalaxyFCHome
                                              onNavigate={handleNavigate}
                              session={session}
                              onSignOut={handleSignOut}
                            />
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
                                        <button
                                                        onClick={handleSignOut}
                                                        style={{
                                                                          background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                                                                          color: "rgba(255,255,255,0.4)", fontSize: 11,
                                                                          letterSpacing: 1, textTransform: "uppercase",
                                                                          cursor: "pointer", fontFamily: "Georgia, serif",
                                                                          padding: "4px 12px", borderRadius: 6
                                                        }}>
                                                      Sign Out
                                        </button>
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
