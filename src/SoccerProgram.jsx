import { useState } from "react";

const POSITIONS = {
  cm: { id: "cm", label: "Center Mid", emoji: "🎯", color: "#4ade80", desc: "The engine of the team. Link defense to attack, press, distribute, and lead.", traits: ["Box-to-box runs", "Scanning & vision", "Switching the field", "Pressing triggers"] },
  striker: { id: "striker", label: "Striker", emoji: "🔥", color: "#f97316", desc: "Goalscorer. Movement, finishing, turning defenders, and runs in behind.", traits: ["Finishing & shooting", "Runs in behind", "Hold-up play", "Turning to goal"] },
  winger: { id: "winger", label: "Winger", emoji: "⚡", color: "#f59e0b", desc: "Speed merchant on the flanks. Beat players 1v1, cross, and cut inside.", traits: ["1v1 speed dribbling", "Crossing", "Cutting inside", "Wide sprinting"] },
  defender: { id: "defender", label: "Defender", emoji: "🛡️", color: "#38bdf8", desc: "The foundation. Win duels, read the game, and build from the back.", traits: ["1v1 defending", "Positioning", "Heading & clearing", "Building out"] },
};

const WEEK_THEMES = ["Foundation", "Build Intensity", "Peak Training", "Apply & Refine"];
const WEEK_COLORS = ["#4ade80", "#f59e0b", "#f97316", "#a78bfa"];
const SKILL_COLORS = { fastFeet: "#f97316", feint: "#a78bfa", scanning: "#38bdf8" };

const TIPS = {
  cm: ["A CM sees the whole field — scan before every touch.", "Fast feet = being ready. Never flat-footed waiting for the ball.", "Feints only work if you commit — half-hearted fakes fool nobody.", "Both feet matter — always train your weaker foot.", "Sleep 9+ hours — that's when your body gets stronger.", "The best CMs are fit enough to run box-to-box all game."],
  striker: ["Goals come from movement BEFORE the ball arrives.", "See the keeper before you shoot — pick your corner.", "Fast feet get you that half-yard you need in the box.", "Feints freeze defenders — commit to them fully.", "Visualize scoring. Studies show it actually works.", "A striker who doesn't score still helps — hold up, link, press."],
  winger: ["Your speed is your weapon — protect it with rest.", "Fast feet beat defenders more than fancy moves.", "See the striker's run before you cross — cross TO them.", "Feints + speed = impossible to stop. Train both.", "Both feet let you go either way — train the weak one!", "Wingers who track back earn their team's trust."],
  defender: ["Scan before every touch — know your pressure and your outlet.", "Fast feet keep you goal-side. Never flat-footed.", "Defending is about position, not tackles. Get goal-side first.", "Feints help you escape the press — use them confidently.", "Communicate! Scanning only helps if you share what you see.", "Clearances are last resort. Play out when you can."],
};

const CM_PROGRAM = { weeks: [
  { days: [
    { day:1, focus:"Ball Mastery + Fast Feet", warmup:"Dynamic stretching, high knees, butt kicks (5 min)", fastFeet:{drill:"Rapid Toe Taps",duration:"4 × 30 sec",desc:"Both feet alternate on top of ball as fast as possible. Stay on your toes, light and quick."}, feint:null, scanning:{cue:"Eyes Up Challenge",desc:"During toe taps, call out the color of a cone your parent holds up. Train your brain to process while your feet work."}, drills:[{name:"Inside/Outside Rolls",duration:"3 × 30 sec",desc:"Roll ball with inside then outside of each foot. Keep touches tight."},{name:"5-10-5 Shuttle",duration:"6 reps",desc:"Sprint 5 yds, back 10 yds, forward 5 yds. Rest 30 sec."}], passing:"Wall passing: 2-touch passes, 50 reps each foot. Before each pass, glance left and right — scanning habit starts now.", cooldown:"Light jog + calf/quad stretch (5 min)"},
    { day:2, focus:"Passing + Feint Intro", warmup:"Jog around cones (5 min), ankle circles", fastFeet:{drill:"Quick-Step Ladder",duration:"3 × length",desc:"One foot in each square as fast as you can. Count your steps — beat your count each rep."}, feint:{drill:"Shoulder Drop Feint",duration:"3 × 8 each side",desc:"Dip your shoulder hard one way, push ball the other with outside of foot. Sell it with your whole upper body."}, scanning:null, drills:[{name:"L-Move",duration:"3 × 45 sec",desc:"Pull ball back with sole, push forward with inside of foot."},{name:"Passing Triangle",duration:"10 min",desc:"3 cones in a triangle. Pass to each cone in sequence. Focus on accuracy."}], passing:"Short passes 5 yds, 30 reps each foot. Inside of foot contact.", cooldown:"Hamstring stretch, butterfly stretch (5 min)"},
    { day:3, focus:"Speed + Scanning", warmup:"A-skips, B-skips, lateral shuffles (5 min)", fastFeet:{drill:"Fast Feet in Place",duration:"5 × 20 sec on / 10 sec rest",desc:"Rapid small steps in place — imagine hot coals. Drive your arms. Builds reactive quickness."}, feint:null, scanning:{cue:"Check Shoulders Before Every Sprint",desc:"Before each sprint rep, turn your head left then right. Look → move. Know where space is before you get the ball."}, drills:[{name:"Straight Sprint 20 yds",duration:"8 reps",desc:"Max effort. Walk back each time. Focus on arm drive."},{name:"Ladder Agility",duration:"5 patterns × 3 reps",desc:"One foot in, two feet in, lateral shuffle, Icky shuffle."},{name:"Ball at Feet Sprint",duration:"6 × 15 yds",desc:"Dribble at top speed to a cone, cut and return."}], passing:"No-look short passes: 20 reps each foot. Partner calls direction after you've glanced to spot them.", cooldown:"Hip flexor stretch, deep breaths (5 min)"},
    { day:4, focus:"Ball Mastery + Feints", warmup:"Jump rope 3 min, dynamic stretching", fastFeet:{drill:"Ball Tap Accelerations",duration:"6 × 15 yds",desc:"Rapid toe taps, then explode into a sprint on signal. Connects fast feet with explosive speed."}, feint:{drill:"Fake Pass Feint",duration:"3 × 8 each side",desc:"Wind up like you're passing — swing through — but stop and pull ball back with sole. Freeze the defender, then go."}, scanning:null, drills:[{name:"Cruyff Turn",duration:"3 × 8 each side",desc:"Fake shot, drag ball behind plant foot. Essential CM move."},{name:"Passing Grid",duration:"10 min",desc:"5×5 box. Receive pass, control, pass out the other side."}], passing:"Long pass: 20-25 yds with laces. 20 reps each foot. Flat, driven ball.", cooldown:"Quad stretch, shoulder rolls (5 min)"},
    { day:5, focus:"Combination + Scanning", warmup:"Cone dribble warm-up (5 min)", fastFeet:{drill:"Stutter Step + Go",duration:"6 reps",desc:"Rapid small steps approaching a cone, then burst past it full speed. Fast-feet-to-speed connection."}, feint:{drill:"Body Feint in Dribble",duration:"3 × 6 each side",desc:"Sway upper body hard one direction — lean shoulder, shift hips — then cut ball opposite. No ball touch for the feint."}, scanning:{cue:"Pre-Receive Scan",desc:"Every time you're about to receive a pass, check over both shoulders BEFORE the ball arrives. Know your next move before you touch it."}, drills:[{name:"1v1 Cone Gates",duration:"3 × 5 min",desc:"Dribble through as many gates as possible. Use your feints!"},{name:"Partner Passing Pattern",duration:"10 min",desc:"Pass and follow to partner's spot. Short, crisp passes."}], passing:"Receive, scan before touching, take a touch to turn, pass to target. 15 reps each side.", cooldown:"Full body stretch (8 min)"},
    { day:6, focus:"REST / Light Activity", warmup:"Optional 20 min walk or swim", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Juggling: personal best challenge!", cooldown:"Foam rolling or gentle stretching"},
    { day:7, focus:"REST", warmup:"Full rest — muscles grow on rest days!", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Visualize your best passes from the week", cooldown:"Stay hydrated and sleep 9+ hours"},
  ]},
  { days: [
    { day:8, focus:"Speed + First Touch", warmup:"High knees, butt kicks, carioca (6 min)", fastFeet:{drill:"Ladder: Icky Shuffle",duration:"4 × length",desc:"In-in-out-out sideways through the ladder. Builds lateral quickness for pressing and recovering."}, feint:null, scanning:{cue:"Scan Every 3 Seconds",desc:"During dribbling drills, look up every 3 seconds. Coach counts — if you go 5 sec without scanning they call SCAN!"}, drills:[{name:"First Touch Angles",duration:"3 × 8 each side",desc:"Ball tossed in, control with inside/outside, move away quickly."},{name:"Sprint + Turn",duration:"8 reps",desc:"Sprint 15 yds, plant and turn 180°, sprint back."},{name:"Sole Roll Combos",duration:"3 × 45 sec",desc:"Sole roll right, inside push left, sole roll left, inside push right."}], passing:"One-two wall combination: pass, move to new angle, receive, pass again. 5 min.", cooldown:"Calf and quad stretch (5 min)"},
    { day:9, focus:"Passing Patterns + Feints", warmup:"Jog + dynamic leg swings (5 min)", fastFeet:{drill:"Fast Feet Around Ball",duration:"4 × 30 sec",desc:"Circle the ball with fast tiny steps. Change direction on signal."}, feint:{drill:"Stop-and-Go Feint",duration:"3 × 8 reps",desc:"Dribble toward cone, plant and freeze 1 second — making defender commit — then burst past. The pause IS the feint."}, scanning:null, drills:[{name:"Diamond Passing",duration:"15 min",desc:"4 cones in diamond. Pass to next, run to follow. Continuous flow."},{name:"Through Ball Practice",duration:"10 min",desc:"Pass into space ahead of moving partner. Lead them — not to their feet!"},{name:"Receiving on Half-Turn",duration:"3 × 8 each side",desc:"Open body before receiving so you can see the field."}], passing:"Switching the field: long diagonal pass across 20-25 yds. 15 reps each foot.", cooldown:"Hip flexor, hamstring stretch (5 min)"},
    { day:10, focus:"Speed Agility + Scanning", warmup:"Ladder drills warm-up (5 min)", fastFeet:{drill:"Rapid Direction Changes",duration:"8 × 10 sec",desc:"Jog slowly, then on signal explode fast feet sideways or forward for 3-4 steps. React instantly."}, feint:null, scanning:{cue:"Head on a Swivel",desc:"4 cones labeled 1-4 around you. While juggling or toe tapping, coach calls a number — sprint to that cone. Know your options before the ball comes."}, drills:[{name:"T-Drill",duration:"6 reps",desc:"Sprint 10 yds, shuffle 5 right, shuffle 10 left, shuffle back, backpedal."},{name:"Cone Weave Sprint",duration:"6 × 20 yds",desc:"Weave through 5 cones, sprint last 5 yds full speed."},{name:"Reactive Sprint",duration:"8 reps",desc:"Partner points left/right — sprint that direction 5 yds instantly."}], passing:"Pressure passing: receive from 5 yds, control, turn, pass in 3 sec. Scan before every reception. 10 reps.", cooldown:"Walk, breathe, stretch (6 min)"},
    { day:11, focus:"Ball Mastery + All Three", warmup:"Free dribbling (5 min)", fastFeet:{drill:"Fast Feet Into Move",duration:"3 × 6 each move",desc:"Rapid toe taps → explode into scissors. Rapid toe taps → explode into Cruyff. Fast feet load the move like a spring."}, feint:{drill:"Double Feint",duration:"3 × 6 each side",desc:"Fake left with shoulder, fake right, go left. Two fakes freeze the defender. Advanced CM move."}, scanning:{cue:"Scanning Before the Move",desc:"Before every combo today, look left and right. Decide which direction based on what you see. Scan → decide → execute."}, drills:[{name:"Step Over + Burst",duration:"3 × 5 each side",desc:"Step over, push ball with outside, explode past imaginary defender."},{name:"Ball Mastery Circuit",duration:"3 rounds × 2 min",desc:"Toe taps → inside/outside rolls → sole rolls → L-moves. Continuous."}], passing:"Short-short-long: two short passes then a longer switch. Scan before each long ball. 10 sequences.", cooldown:"Full body stretch (5 min)"},
    { day:12, focus:"Game Simulation", warmup:"Dynamic stretch + cone dribble (5 min)", fastFeet:{drill:"Match Fast Feet Warm-Up",duration:"2 × 45 sec",desc:"Toe taps → lateral fast feet → sprint 5 yds."}, feint:{drill:"Feint in 1v1",duration:"5 × 3 min games",desc:"Must attempt at least one feint per possession. Shoulder drop, stop-and-go, or double feint. Commit — build the habit."}, scanning:{cue:"Pre-Scan Rule",desc:"You cannot pass until you've looked up once. Coach watches and calls it out if you skip the scan."}, drills:[{name:"Receive-Turn-Pass",duration:"10 min",desc:"Receive, turn quickly, pass to target. CM in transition."},{name:"Press & Recover",duration:"6 reps",desc:"Sprint 10 yds (pressing), jog 10 yds (recovering). 3x per rep."}], passing:"Long pass to partner, sprint to receive back. Scan before sending the long ball. 12 reps.", cooldown:"Easy jog, stretch (8 min)"},
    { day:13, focus:"REST / Light Activity", warmup:"20 min bike or swim optional", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Juggling: left foot only — 10 in a row!", cooldown:"Stretch hips, relax"},
    { day:14, focus:"REST", warmup:"Full rest!", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Watch Aitana Bonmatí — notice how she scans before every touch", cooldown:"9+ hours sleep"},
  ]},
  { days: [
    { day:15, focus:"Speed + Fast Feet Intensity", warmup:"Fast feet in place, carioca, A-skips (6 min)", fastFeet:{drill:"Fast Feet Intervals",duration:"6 × 20 sec max / 10 sec rest",desc:"Absolute maximum foot speed for 20 seconds. Arms pumping. You should be breathless."}, feint:null, scanning:{cue:"Scan on Every Touch",desc:"Look up on every single touch of the ball today. It will slow you down at first — that's okay. Build the habit."}, drills:[{name:"Box Dribble at Speed",duration:"6 × 1 min",desc:"Dribble around a 10×10 box at full speed. Tight touches."},{name:"30m Sprint Intervals",duration:"8 reps",desc:"Full sprint 30m. Walk back. Push for personal best."},{name:"Explosive Direction Change",duration:"6 reps each way",desc:"At top speed, plant and explode opposite direction. Outside of foot cut."}], passing:"Driven pass with movement: pass, sprint to new position, receive back. Scan before each pass. 12 reps.", cooldown:"Deep stretch, slow breathing (6 min)"},
    { day:16, focus:"Advanced Passing + Feints", warmup:"Wall passes warm-up (5 min)", fastFeet:{drill:"Quick Feet Into Pass",duration:"10 reps",desc:"Rapid toe taps 5 sec → stop → immediately strike a driven pass. Simulates receiving under pressure then releasing quickly."}, feint:{drill:"Fake Shot → Pass",duration:"3 × 8 reps",desc:"Approach ball like you're shooting. Wind up. Defender commits. Instead, open hips and play a controlled pass sideways. Classic CM."}, scanning:null, drills:[{name:"Lofted Pass",duration:"15 reps each foot",desc:"Get under ball with laces. 20 yds with slight arc. Precision!"},{name:"One-Touch Passing Grid",duration:"10 min",desc:"One touch only. No control touch. Quicken!"},{name:"Cross-Field Switch",duration:"10 min",desc:"Big diagonal pass to switch sides. Drive through ball."}], passing:"Blind pass: scan to locate target, pass back without looking again. 15 reps.", cooldown:"Hamstring, hip flexor, quad stretch (5 min)"},
    { day:17, focus:"Speed Endurance + Scanning", warmup:"Light jog 3 min, dynamic stretch", fastFeet:{drill:"Fast Feet → Press",duration:"6 reps",desc:"Fast feet in place 5 sec → sprint 10 yds hard. Simulates CM reacting when opponent has the ball: feet ready, then press."}, feint:null, scanning:{cue:"Two-Touch Scan Rule",desc:"Touch 1 = receive, touch 2 = pass. Between touches you MUST scan. Skip the scan and do 5 fast feet before continuing."}, drills:[{name:"120m Repeat Runs",duration:"4 reps",desc:"Full field length at 80% effort. Rest 90 sec. Builds CM fitness."},{name:"Shuttle Runs with Ball",duration:"6 reps",desc:"Dribble to cone 15 yds, stop ball, sprint back."}], passing:"Receive wide, pass central: simulate switching play from wing. Scan before central pass. 10 reps.", cooldown:"Ice legs if needed, full stretch (8 min)"},
    { day:18, focus:"Ball Mastery + All Three", warmup:"Free ball work (5 min)", fastFeet:{drill:"5-Cone Fast Feet Circuit",duration:"3 × full circuit",desc:"5 cones in a row, 1 yd apart. Fast feet between each cone left and right. Race yourself."}, feint:{drill:"Feint + Move Combo",duration:"3 × 6 each side",desc:"Shoulder drop feint → scissors → burst. Chain the feint INTO the move. The feint sets it up, the move finishes it."}, scanning:{cue:"Scanning in Mastery Drills",desc:"During every ball mastery sequence, call out a color/number/cone held up by coach. Scan, process, call it, keep going."}, drills:[{name:"Roulette (Marseille Turn)",duration:"3 × 6 each direction",desc:"Sole drag while spinning 360°. Slow first, then add speed."},{name:"5-Move Combo",duration:"5 × 2 min",desc:"Toe tap → L-move → step over → Cruyff → inside hook. Flow together."}], passing:"Pass, overlap run, receive, one-touch back. Scan during run to find target. 10 sequences.", cooldown:"Full stretching routine (8 min)"},
    { day:19, focus:"Small-Sided Games", warmup:"Dynamic stretch + short passing warm-up (5 min)", fastFeet:{drill:"Pre-Game Fast Feet Activation",duration:"3 × 30 sec",desc:"Toe taps → lateral fast feet → forward fast feet → stop. Your pre-match routine from now on."}, feint:{drill:"Feint Reward Game",duration:"Woven into games",desc:"Every successful feint that beats a player = 1 bonus point. Encourages real in-game feints."}, scanning:{cue:"CM Awareness Challenge",desc:"After each possession, coach asks: 'Where was the open player?' You should know — because you scanned."}, drills:[{name:"Rondo (Piggy in Middle)",duration:"3 × 5 min",desc:"Keep possession. Max 3 touches!"},{name:"3v2 to Goal",duration:"4 × 5 min",desc:"CM distributes and links play. Create the chance!"},{name:"Transition: Win It Back",duration:"10 min",desc:"When possession lost, sprint to press immediately."}], passing:"Full pass patterns at match pace. 10 min.", cooldown:"Cool down jog, stretch (8 min)"},
    { day:20, focus:"REST / Light Activity", warmup:"Swim or bike 20 min optional", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Juggling: alternating feet — beat your record!", cooldown:"Legs up the wall 10 min. Sleep!"},
    { day:21, focus:"REST", warmup:"Complete rest — week 3 was your hardest!", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Review which feints feel strongest. List them for week 4.", cooldown:"9+ hours sleep. Big recovery meal."},
  ]},
  { days: [
    { day:22, focus:"Speed Sharpening", warmup:"Full dynamic warm-up (8 min)", fastFeet:{drill:"Fast Feet Personal Best",duration:"3 attempts × 30 sec",desc:"Count every toe tap. Beat last week's count. Record it."}, feint:null, scanning:{cue:"Scanning Sprint Drill",desc:"Sprint 20 yds. Midway, coach holds up 1-3 fingers. Call the number before stopping. Builds scanning at full speed."}, drills:[{name:"Flying Sprints",duration:"6 × 20 yds",desc:"Jog 10 yds to build speed, explode 20 yds at 100%."},{name:"Reaction Start",duration:"10 reps",desc:"Ball drops = go! Sprint 10 yds instantly."},{name:"Dribble + Sprint Combo",duration:"6 reps",desc:"Dribble 10 yds, leave ball, sprint to receive back."}], passing:"Driven passes 25+ yds. Scan before every long ball. 15 reps each foot.", cooldown:"Stretch (5 min)"},
    { day:23, focus:"Passing Mastery + Scanning", warmup:"Wall passes warm-up (5 min)", fastFeet:{drill:"Fast Feet Between Passes",duration:"Woven in",desc:"After every pass, immediately do 3-4 fast feet steps to a new position. Never stand still."}, feint:null, scanning:{cue:"Full Scanning Passing Drill",desc:"4 targets around you. Receive ball, scan, coach points to one as 'unavailable' — pass to an open one. Real-time decision from scanning."}, drills:[{name:"Tiki-Taka Pattern",duration:"15 min",desc:"Short-short-long. One/two touch. Quick combinations."},{name:"Pass Under Pressure",duration:"10 min",desc:"Receive, control, pass before pressure arrives. Beat the press!"},{name:"Vision Drill",duration:"10 min",desc:"Receive with head up. Call target before the pass."}], passing:"40-yard switch pass: full diagonal. Scan to confirm space before playing it. 10 reps each foot.", cooldown:"Full stretch (8 min)"},
    { day:24, focus:"Feint Mastery Day", warmup:"Free dribbling 5 min", fastFeet:{drill:"Fast Feet + Feint Combo",duration:"3 × 6 each side",desc:"Rapid toe taps 5 sec → flow into shoulder drop feint → cut and burst. One connected movement."}, feint:{drill:"Feint Showcase Circuit",duration:"3 × full circuit",desc:"Shoulder drop → stop-and-go → fake pass → body feint → double feint. 4 reps each. Own every one."}, scanning:null, drills:[{name:"Move Medley",duration:"3 × 5 min",desc:"Combine everything: Cruyff, scissors, roulette, step over. Add feints before each move!"},{name:"1v1 Duels",duration:"5 × 3 min",desc:"Must use a feint before every dribble attempt. Commit to it!"}], passing:"Dribble 10 yds with a feint, stop, pivot, drive long pass. Scan before pass. 12 reps.", cooldown:"Stretch (5 min)"},
    { day:25, focus:"Full CM Simulation", warmup:"Dynamic warm-up (6 min)", fastFeet:{drill:"CM Movement Pattern",duration:"6 reps",desc:"Fast feet in place → sprint 10 yds → fast feet again to get set. This is the CM movement cycle in every game."}, feint:{drill:"Feint to Create Space",duration:"10 min",desc:"Receive ball under pressure. Use a feint to get the defender off balance, then pass or drive forward."}, scanning:{cue:"Full CM Scanning Protocol",desc:"Before every touch: scan. Before every pass: scan. After losing ball: scan to find press trigger. Play like a complete CM. Every rep."}, drills:[{name:"CM Role Play",duration:"20 min",desc:"Receive from defender, turn, distribute to 'wings' and 'striker' (cones). Constant movement."},{name:"Box-to-Box Run",duration:"6 reps",desc:"Sprint full field. Rest 1 min."}], passing:"Complete passing test: 10 short, 10 medium, 10 long. Count how many hit target. Scan before each one.", cooldown:"Long cool down, celebrate progress! (10 min)"},
    { day:26, focus:"Scrimmage / Game Day", warmup:"Full pre-match warm-up with fast feet activation (10 min)", fastFeet:{drill:"Pre-Game Activation",duration:"2 min",desc:"Toe taps → lateral fast feet → fast feet into sprint. Do this before every game for the rest of your career."}, feint:{drill:"Feints in Live Play",duration:"Whole game",desc:"Minimum 5 feint attempts. Track which ones worked."}, scanning:{cue:"Count Your Scans",desc:"After the game: estimate how many times you looked up before passing. Did it feel more natural?"}, drills:[{name:"Full Scrimmage",duration:"40-60 min",desc:"Put everything together. Play CM. Communicate. Lead!"},{name:"Post-Game Review",duration:"10 min",desc:"Fast feet? Feints: which worked? Scanning: did you know where teammates were?"}], passing:"Count completed passes in the game.", cooldown:"Game cool down, full stretch (10 min)"},
    { day:27, focus:"REST / Light Activity", warmup:"Light swim or bike 20 min", fastFeet:null, feint:null, scanning:null, drills:[], passing:"Juggling: both feet alternating — 30+ in a row!", cooldown:"Foam roll, stretch"},
    { day:28, focus:"Final Skills Test 🏆", warmup:"Dynamic warm-up (8 min)", fastFeet:{drill:"Fast Feet Final Test",duration:"3 attempts × 30 sec",desc:"Count every toe tap. Compare to Day 22. How much did you improve?"}, feint:{drill:"Feint Showcase",duration:"5 min",desc:"All 5 feints back to back. Smooth and confident."}, scanning:{cue:"Scanning Final Test",desc:"During passing test, coach holds up random fingers after every 3rd pass. Call it out — shows how much scanning has become a habit."}, drills:[{name:"Sprint Test: 30 yds",duration:"3 max reps",desc:"Record your time. Compare to Day 3!"},{name:"Passing Accuracy Test",duration:"20 reps each foot",desc:"Drive passes to target from 20 yds. Count your %!"}], passing:"Juggling max: record your personal best!", cooldown:"Celebrate 30 days! Long stretch (10 min)"},
    { day:29, focus:"Family Showcase", warmup:"Warm up with family or friend", fastFeet:{drill:"Teach Fast Feet",duration:"5 min",desc:"Teach a parent or sibling toe taps and fast feet shuffle. Teaching = mastery."}, feint:{drill:"Feint Demo",duration:"5 min",desc:"Show your best feint. Explain WHY it works — what does it do to the defender?"}, scanning:{cue:"Explain Scanning",desc:"Walk family through it: receive ball, scan left and right, then decide where to pass. Show your soccer brain!"}, drills:[{name:"Passing Relay Challenge",duration:"10 min",desc:"Team up and race. Fun and competitive!"}], passing:"Show off your longest/most accurate pass. Measure the distance!", cooldown:"Celebrate with your support crew!"},
    { day:30, focus:"REST & CELEBRATE! 🎉", warmup:"You completed a 30-day training program!", fastFeet:null, feint:null, scanning:null, drills:[], passing:"You are faster, smarter, and more skilled than 30 days ago. Keep going!", cooldown:"Rest, celebrate, set your goals for next season!"},
  ]},
]};

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

export default function SoccerProgram() {
  const [position, setPosition] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [completedDays, setCompletedDays] = useState({});

  const pos = position ? POSITIONS[position] : null;
  const program = position ? { cm: CM_PROGRAM }[position] : null;
  const week = program ? program.weeks[selectedWeek] : null;
  const day = week && selectedDay !== null ? week.days[selectedDay] : null;
  const weekColor = WEEK_COLORS[selectedWeek];

  const toggleComplete = (posKey, weekIdx, dayIdx) => {
    const key = posKey + "-w" + weekIdx + "d" + dayIdx;
    setCompletedDays(prev => ({ ...prev, [key]: !prev[key] }));
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
