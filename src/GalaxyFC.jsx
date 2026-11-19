import React, { useEffect } from 'react';
import { mountGalaxy } from './mountGalaxy.js';

export default function GalaxyFC() {
  useEffect(mountGalaxy, []);

  return (
    <>
      <header className="top">
        <div className="shell nav">
          <a className="brand" href="#home"><span className="crest" aria-hidden="true"></span><span>Baltimore Bays<small>GALAXY SOCCER</small></span></a>
          <nav aria-label="Main navigation">
            <a href="#home" aria-current="page">Home</a><a href="#teams">Teams</a><a href="#schedule">Schedule</a><a href="#about">About</a><a href="#training" className="button small">Training</a>
          </nav>
        </div>
      </header>
      <main>
      <div id="home-view">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="shell hero-copy">
            <p className="eyebrow">9U GIRLS SOCCER</p>
            <h1 id="hero-title">Baltimore Bays<br /><em>Galaxy</em></h1>
            <div className="actions"><a className="button" href="#teams">Meet the teams</a><a className="button quiet" href="#schedule">View schedule</a></div>
          </div>
        </section>
        <section className="next-up" aria-labelledby="next-title">
          <div className="shell next-grid">
            <div><h2 id="next-title">Next Up</h2><p id="next-status" role="status">Loading TeamSnap schedule…</p></div>
            <ul id="next-events" className="event-list next-events" hidden></ul>
            <a className="button quiet" href="#schedule">Full schedule</a>
          </div>
        </section>
        <section className="shell home-teams" id="teams">
          <h2>Our Teams</h2>
          <div className="team-grid">
            <article className="team-card">
              <img src="galaxy-blue.jpg" width="2048" height="1392" alt="Galaxy Blue team photo on the soccer field" loading="lazy" />
              <div className="team-body"><h3>Galaxy Blue</h3><details><summary>View roster</summary><ul id="roster-blue" className="roster"></ul></details></div>
            </article>
            <article className="team-card grey">
              <img src="galaxy-grey.jpg" width="2048" height="1358" alt="Galaxy Grey team photo in front of the goal" loading="lazy" />
              <div className="team-body"><h3>Galaxy Grey</h3><details><summary>View roster</summary><ul id="roster-grey" className="roster"></ul></details></div>
            </article>
          </div>
        </section>
      </div>
      <div className="shell subpage" id="schedule-view" hidden>
        <section className="panel" id="schedule"><p className="eyebrow">TEAMSNAP · EASTERN TIME</p><h1>Team Schedule</h1>
        <p id="schedule-status" role="status">Loading TeamSnap schedule…</p><ul id="schedule-events" className="event-list" hidden></ul>
        <a className="button" href="https://go.teamsnap.com/">Open TeamSnap</a></section>
      </div>
      <div className="shell subpage" id="training-view" hidden>
      <section className="panel" id="training">
      <h1>At-Home Training</h1>
      <div className="actions"><a className="button" href="#winter">8-Week Winter Program</a><a className="button quiet" href="#position-training">30-Day Position Program</a></div>
      </section>
      <section className="panel training" id="position-training"><p className="eyebrow">AT-HOME TRAINING</p><h1>30-Day Training Program</h1><p>Pick a position, open a session and check off each day as you go. Progress saves in this browser.</p>
      <div id="positions" className="positions" aria-label="Choose a position"></div>
      <div id="program" hidden><div className="progress-line"><h3 id="program-title"></h3><span id="progress-label"></span></div><progress id="progress" aria-label="Training days completed" max="30" value="0"></progress>
      <div id="weeks" className="switch" aria-label="Choose a training week"></div>
      <div id="days" className="days"></div></div></section>
      <section className="panel challenge"><p className="eyebrow">WEEKLY CHALLENGE</p><h2>Scan before you receive</h2><p>Look over your shoulder before the ball gets to you. Spot the space, then take your first touch toward it.</p></section>
      </div>
      <div className="shell subpage" id="winter-view" hidden>
      <section className="panel winter-intro" id="winter">
        <p className="eyebrow">U9 GIRLS · NOV. 30, 2026–JAN. 24, 2027</p>
        <h1>At-Home Winter Soccer Program</h1>
        <p><strong>8 weeks · 3 days a week · 30 minutes per session</strong></p>
        <p>If the girls are still practicing with the Bays on Monday and Wednesday, use <strong>Tuesday, Thursday, and Saturday</strong> for home training. Tuesday is mostly ball work at an easy pace. If Saturday is a game day, move the session to Sunday if she’s fresh.</p>
        <p><strong>Equipment.</strong> A soccer ball, four cones or shoes, and a safe wall or a partner who can roll and pass the ball. Most of the work fits in a driveway, garage, or small patch of yard. Start with gates about two feet wide and widen them if the ball keeps getting away.</p>
        <a href="#training" className="button quiet">All training programs</a>
      </section>
      <section className="panel" aria-labelledby="session-format-title">
        <h2 id="session-format-title">How to run each session</h2>
        <dl className="winter-timing">
          <dt>0–5 min</dt><dd>Warm up with easy dribbling. Mix in stops, turns, and a few short bursts once she’s moving comfortably.</dd>
          <dt>5–13 min</dt><dd>Do the first drill. Start at a pace where she can control the ball.</dd>
          <dt>13–21 min</dt><dd>Do the second drill. Use short sets with a quick reset between them.</dd>
          <dt>21–28 min</dt><dd>Play the challenge. Give her several short tries with time to reset.</dd>
          <dt>28–30 min</dt><dd>Walk, get water, and ask which move or touch she’d try in a game.</dd>
        </dl>
      </section>
      <section className="panel" aria-labelledby="winter-plan-title">
        <h2 id="winter-plan-title">The Eight-Week Plan</h2>
        <div id="winter-weeks"></div>
      </section>
      <section className="panel" aria-labelledby="winter-parents-title">
        <h2 id="winter-parents-title">What Parents Should Watch For</h2>
        <div className="winter-tips">
          <section><h3>Dribbling</h3><p>Ball within a step near a defender. In open space, take a bigger touch and run onto it. Keep knees soft and arms relaxed, and look up between touches.</p><p><strong>“Small touches here. Go when it opens.”</strong></p></section>
          <section><h3>Passing</h3><p>Plant beside the ball. Keep the ankle firm and use the inside of the foot so the pass rolls with enough pace to reach the target.</p><p><strong>“Plant beside it. Pass through the gate.”</strong></p></section>
          <section><h3>First Touch</h3><p>Look before the ball arrives, get slightly side-on, and watch the ball into the foot. Guide it somewhere she can play it again.</p><p><strong>“Look early. Touch where you want to go.”</strong></p></section>
          <section><h3>Shielding</h3><p>Keep the body between the defender and the ball, with the ball on the far foot. Bend the knees, relax the arms, and turn out when space opens.</p><p><strong>“Keep it on your far foot. Now turn out.”</strong></p></section>
          <section><h3>Finishing</h3><p>Look at the target before striking, get the ball out from under the feet, and stay balanced over it. At home, a controlled inside-foot finish is enough.</p><p><strong>“Pick your spot. Keep it low.”</strong></p></section>
        </div>
        <p>For solo sessions, use the wall as the passer and a cone as the defender. On decision drills, approach from different angles and pick the gate with the cleanest exit. When a parent joins, walking pressure is enough to make her look up and choose.</p>
        <p>Give <strong>one correction at a time</strong>, then let her try it a few times. If she’s struggling, roll the pass slower, widen the gate, or give her more room. The goal is for her to recognize the same situation in a game and know what to try.</p>
      </section>
      </div>
      <div className="shell subpage" id="about-view" hidden>
      <section className="panel" id="coaches"><p className="eyebrow">BALTIMORE BAYS GALAXY</p><h1 id="about">About Galaxy</h1><h2>Coaching Staff</h2><div className="staff">
      <div><span aria-hidden="true">JN</span><strong>Justin Nicklas</strong><p>Coach</p></div><div><span aria-hidden="true">NB</span><strong>Nick Bottcher</strong><p>Coach</p></div><div><span aria-hidden="true">SN</span><strong>Shannon Nicklas</strong><p>Galaxy Blue team manager</p></div>
      <div><span aria-hidden="true">LL</span><strong>Leeanna Loewe</strong><p>Galaxy Grey team manager</p></div>
      </div></section>
      <section className="panel" id="standards" aria-labelledby="standards-title">
        <h2 id="standards-title">Player, Parent &amp; Coach Standards</h2>
        <p><strong>Development before results</strong></p>
        <p>We compete to win. Over the season, we want every player to improve, build confidence, and look forward to playing again. Players, parents, and coaches each have a part in that.</p>
        <div className="standards-grid">
          <section aria-labelledby="standards-players">
            <h3 id="standards-players">Players</h3>
            <ul>
              <li><strong>Be ready to work.</strong> Bring your gear, listen when someone is speaking, and stay involved.</li>
              <li><strong>Be willing to learn.</strong> Ask questions and try the feedback on your next rep.</li>
              <li><strong>Play with courage.</strong> Ask for the ball and try the moves you’ve practiced. After a mistake, take a breath and get back into the play.</li>
              <li><strong>Be a good teammate.</strong> Help each other and encourage the player who just made a mistake.</li>
              <li><strong>Play fair and show respect.</strong> Treat teammates, opponents, coaches, and referees well, even when you’re frustrated.</li>
            </ul>
          </section>
          <section aria-labelledby="standards-parents">
            <h3 id="standards-parents">Parents</h3>
            <ul>
              <li><strong>Encourage from the sideline.</strong> Cheer for the whole team and give players room to make their own decisions.</li>
              <li><strong>Notice what they can control.</strong> Praise effort, teamwork, and the courage to try something they’ve practiced.</li>
              <li><strong>Give them space after the game.</strong> Let them talk when they’re ready. A simple “I loved watching you play” goes a long way.</li>
              <li><strong>Keep the sideline respectful.</strong> Give referees, opponents, and other families the same respect you expect for our players. Bring concerns to a coach privately.</li>
            </ul>
          </section>
          <section aria-labelledby="standards-coaches">
            <h3 id="standards-coaches">Coaches</h3>
            <ul>
              <li><strong>Teach the game.</strong> Explain what you want players to see and do, then give them plenty of chances to practice it.</li>
              <li><strong>Develop every player.</strong> Over the season, give each player meaningful opportunities to play, learn different roles, and improve.</li>
              <li><strong>Make room for mistakes.</strong> Keep feedback specific and calm. Give players a chance to try again.</li>
              <li><strong>Hold players accountable with respect.</strong> Address repeated issues directly and give the player a clear next step.</li>
              <li><strong>Set the example.</strong> Stay composed when the game gets tense and treat players, families, opponents, and referees with respect.</li>
            </ul>
          </section>
        </div>
      </section>
      </div>
      </main>
      <footer className="site-footer" id="social"><div className="shell footer">
        <a className="brand" href="#home"><span className="crest" aria-hidden="true"></span><span>Baltimore Bays<small>GALAXY SOCCER</small></span></a>
        <a href="https://www.facebook.com/profile.php?id=61577072935090">Follow Galaxy on Facebook</a>
      </div></footer>
    </>
  );
}
