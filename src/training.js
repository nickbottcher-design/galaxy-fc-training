import { rosters } from './rosters.js';

export function mountTraining() {
  const plans = [
    {
      name: 'Center Mid', focus: 'Scanning and passing',
      drills: [
        ['Scan and receive', 'Pass to a wall or partner. Before the return arrives, glance over a shoulder. Take your first touch across your body, then pass back.'],
        ['Pass through a gate', 'Set two cones as a gate. Take one touch to set yourself, then pass through it. Switch feet every few passes.'],
        ['Turn into space', 'Ask a partner to point left or right as they pass. Check over your shoulder and turn toward the open side if you have room.'],
        ['Switch the play', 'Set a gate on each side. Receive from a partner and open your hips so you can pass toward the opposite gate.'],
        ['Pass and move', 'After each pass, move two steps to a new angle before asking for the ball again. Show your partner where you want it.']
      ]
    },
    {
      name: 'Striker', focus: 'Movement and finishing',
      drills: [
        ['Finish after one setup touch', 'Roll the ball forward and take a small setup touch. Plant beside the ball and aim a controlled shot at a corner.'],
        ['Check away, then come back', 'Start near a cone defender. Take two steps away, then check back to meet a pass and finish.'],
        ['Turn to goal', 'Receive with your back to goal. Look over your shoulder and take your first touch to the open side before shooting.'],
        ['Time your run', 'Start beside a cone defender. Wait until a partner looks up to pass, then run into space and finish from their pass.'],
        ['Hold and lay off', 'Receive sideways and keep the ball on the foot farthest from a cone defender. Lay it off to a partner and move for the return.']
      ]
    },
    {
      name: 'Winger', focus: '1v1 moves and cutbacks',
      drills: [
        ['Change speed past a cone', 'Dribble toward a cone with small touches. Drop your shoulder, take a touch past the cone and accelerate for three steps.'],
        ['Take the outside lane', 'Set a cone near a sideline. Push the ball down the line with the outside of your foot and keep it within reach.'],
        ['Cut inside', 'Dribble down the line, then use the inside of your foot to cut across the cone defender. Look up before your next touch.'],
        ['Play a low cutback', 'Carry the ball to an end line marked with cones. Look up and pass back along the ground to a gate behind you.'],
        ['Pick your move', 'Have a partner point to the open side as you reach a cone. Decide whether to go down the line or cut inside, then accelerate.']
      ]
    },
    {
      name: 'Defender', focus: '1v1 defending and build-out',
      drills: [
        ['Close down under control', 'Jog toward a cone attacker. Slow down before you reach it, bend your knees and turn slightly sideways.'],
        ['Show the attacker wide', 'Ask a partner to dribble slowly. Stay between the ball and a cone goal, moving sideways to guide them toward the touchline.'],
        ['Receive from the keeper', 'Start wide of a partner acting as keeper. Open your body as the pass comes and use your first touch to move toward a safe passing lane.'],
        ['Recover toward goal', 'Start beside an attacker cone. Move back toward your own goal first, then turn to face the ball and close the space under control.'],
        ['Choose a safe outlet', 'Set two passing gates. Ask a partner to stand in one lane, then receive and pass through the open gate.']
      ]
    }
  ];

  const weeks = [
    { start: 1, end: 7, name: 'Foundation', cue: 'Work slowly through two sets of five reps. Reset after each rep.' },
    { start: 8, end: 14, name: 'Build intensity', cue: 'Do two sets of six reps. Make the next action quicker once the first touch is under control.' },
    { start: 15, end: 21, name: 'Add pressure', cue: 'Do three sets of five reps. Ask a partner to add light pressure or give you a late visual cue.' },
    { start: 22, end: 30, name: 'Apply and refine', cue: 'Do two sets of six reps. Alternate feet and choose the direction based on the space you see.' }
  ];

  const byId = id => document.getElementById(id);
  let completion = {};
  try {
    const saved = JSON.parse(localStorage.getItem('galaxy-training-v1') || '{}');
    if (saved && typeof saved === 'object') completion = saved;
  } catch {
    // The program still works if storage is unavailable.
  }

  for (const [team, players] of Object.entries(rosters)) {
    const items = players.map(([number, name]) => {
      const row = document.createElement('li');
      const jersey = document.createElement('b');
      jersey.textContent = number ? '#' + number : '—';
      row.append(jersey, name);
      return row;
    });
    byId('roster-' + team).replaceChildren(...items);
  }

  let position = 0;
  let weekIndex = 0;
  const positionButtons = plans.map((plan, index) => {
    const button = document.createElement('button');
    const title = document.createElement('strong');
    const focus = document.createElement('span');
    button.type = 'button';
    button.className = 'position';
    button.setAttribute('aria-pressed', 'false');
    title.textContent = plan.name;
    focus.textContent = plan.focus;
    button.append(title, focus);
    button.addEventListener('click', () => {
      position = index;
      weekIndex = 0;
      byId('program').hidden = false;
      renderProgram();
    });
    return button;
  });
  byId('positions').replaceChildren(...positionButtons);

  const weekButtons = weeks.map((week, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = week.name;
    button.addEventListener('click', () => {
      weekIndex = index;
      renderProgram();
    });
    return button;
  });
  byId('weeks').replaceChildren(...weekButtons);

  function checkedDays() {
    return new Set(Array.isArray(completion[position]) ? completion[position] : []);
  }

  function updateProgress() {
    const count = checkedDays().size;
    byId('progress').value = count;
    byId('progress-label').textContent = count + ' / 30 days complete';
  }

  function sessionFor(day, plan, week) {
    const index = (day - 1) % 7;
    if (index === 5) return ['Light activity', 'Take an easy walk or spend a few minutes getting comfortable touches on the ball.'];
    if (index === 6) return ['Rest', 'Take the day off from training.'];
    const [title, drill] = plan.drills[index];
    if (day === 29) return ['Repeat your toughest drill', 'Pick one drill from this month that still feels hard. Do two sets of five controlled reps and notice what changes when you slow down.'];
    if (day === 30) return ['Game-day review', 'Repeat a favorite drill and one that challenged you. Pick one thing you want to try the next time you play.'];
    return [title, 'Warm up with light dribbling and easy changes of direction. ' + drill + ' ' + week.cue];
  }

  function dayDetails(day, plan, week) {
    const [title, instructions] = sessionFor(day, plan, week);
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const section = document.createElement('div');
    const paragraph = document.createElement('p');
    const button = document.createElement('button');

    function updateLabel() {
      const complete = checkedDays().has(day);
      summary.textContent = 'Day ' + day + ' · ' + title + (complete ? ' · Complete' : '');
      button.textContent = complete ? 'Undo completion' : 'Mark as complete';
    }

    section.className = 'session';
    paragraph.textContent = instructions;
    button.type = 'button';
    button.className = 'complete';
    button.addEventListener('click', () => {
      const days = checkedDays();
      if (days.has(day)) days.delete(day);
      else days.add(day);
      completion[position] = [...days];
      try {
        localStorage.setItem('galaxy-training-v1', JSON.stringify(completion));
      } catch {
        byId('progress-label').title = 'Progress is available for this visit only.';
      }
      updateLabel();
      updateProgress();
    });
    updateLabel();
    section.append(paragraph, button);
    details.append(summary, section);
    return details;
  }

  function renderProgram() {
    const plan = plans[position];
    const week = weeks[weekIndex];
    byId('program-title').textContent = plan.name + ' · ' + week.name;
    updateProgress();
    positionButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === position)));
    weekButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === weekIndex)));
    const days = Array.from({ length: week.end - week.start + 1 }, (_, index) =>
      dayDetails(index + week.start, plan, week)
    );
    byId('days').replaceChildren(...days);
  }
}
