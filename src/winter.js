export function mountWinter() {
  const winterWeeks = [
    ['Dribble under control', 'Nov. 30–Dec. 6', [
      ['Cone weave. Dribble through four cones and back.', 'Stop and go. Stop the ball with the sole, then restart with the other foot.', 'Count gates she can dribble through in 30 seconds with the ball close enough for another touch.'],
      ['Inside and outside. Dribble a short lane using both surfaces of one foot, then switch feet.', 'Change speed. Take small touches toward a cone, then push the ball into open space and accelerate.', 'Burst through either of two gates after rounding the cone.'],
      ['Both-foot weave. Change feet at each cone.', 'Head-up dribble. Look up between touches to read a number a parent holds up or spot an object ahead.', 'Choose a gate on the move and get through it under control.']
    ]],
    ['Turn away from pressure', 'Dec. 7–13', [
      ['Pullback. Roll the ball back with the sole and turn with it.', 'Inside cut. Use the inside of the foot to cut across the body, then step into the new direction.', 'Pick a turn at the cone and take two quick steps out.'],
      ['Outside cut. Use the outside of the foot to turn away from a cone.', 'Turn both ways. Approach from different angles and practice getting out to either side.', 'Try three turns in any order, keeping the ball close enough to play after each one.'],
      ['Cone defender. Dribble toward a cone, turn before reaching it, and exit through a side gate.', 'Moving defender. A parent walks toward one gate and she turns toward the other.', 'Can she look up and get out before the gate closes?']
    ]],
    ['Pass with accuracy', 'Dec. 14–20', [
      ['Gate passing. Start 5–7 feet away and pass through a cone gate.', 'Switch feet. Alternate every few passes and adjust the distance if needed.', 'Take 10 passes and count how many roll cleanly through. Write down the score and distance for Week 8.'],
      ['Wall or partner passing. Pass, settle the return, then pass again.', 'Two-touch rhythm. Use the first touch to set up the pass and the second to play it.', 'See how many controlled pass-and-receive reps she can string together.'],
      ['Pass and move. Pass to the wall or partner, then take a step sideways to receive from a new angle.', 'Pass on the move. Roll the ball gently across the body before passing.', 'Alternate between two targets without standing in the same spot.']
    ]],
    ['Take a first touch into space', 'Dec. 21–27', [
      ['Receive to the side. Receive a gentle pass and guide it toward a gate on the left or right.', 'Receive and pass back. Take the first touch sideways, then pass back from the new angle.', 'Alternate sides for six clean first touches.'],
      ['Look before the pass. Glance toward a side gate, then bring the eyes back to the ball.', 'Open up. Stand slightly side-on and guide the ball into space with the inside of the foot.', 'A parent points to an exit before rolling the pass and she finds it with her first touch.'],
      ['Receive across the body. Let the ball travel to the foot farther from the passer when there’s room.', 'Take the next action. After receiving, dribble through a gate or pass to a target.', 'Choose an action based on where the first touch takes her.']
    ]],
    ['Protect the ball and get out', 'Dec. 28–Jan. 3', [
      ['Shield beside a cone. Put the body between the cone and ball, with the ball on the farther foot.', 'Shield and turn. Use a pullback or cut to leave through a side gate.', 'Protect the ball for two seconds, then exit under control.'],
      ['Receive with pressure behind. A parent starts a step behind and walks up as the ball arrives.', 'Feel the space. Keep knees soft, arms relaxed, and the ball on the far foot.', 'Choose an exit based on where the parent is standing.'],
      ['Protect or escape. Start side-on with a parent or cone nearby.', 'Turn and accelerate. Get out once there’s space for the ball and body.', 'Play short rounds where she scores by getting through either gate with control.']
    ]],
    ['Beat a defender', 'Jan. 4–10', [
      ['Body fake. Step and lean one way, then take the ball the other way.', 'Fake and burst. Take two quick steps after the move.', 'Try the fake in both directions and finish through a gate.'],
      ['Two-gate decision. A parent blocks one gate at walking speed.', 'Change the timing. The parent waits longer before choosing a side.', 'Get through the open gate without knocking the ball too far ahead.'],
      ['Set up the move. Dribble toward a cone or parent at a controlled pace.', 'Attack the opening. If one side is already open, take it. If both sides are covered, use a fake or turn.', 'Play short 1v1 rounds to two gates.']
    ]],
    ['Receive and finish', 'Jan. 11–17', [
      ['Aim low. Pass the ball firmly through a mini goal or toward a safe target.', 'Touch and strike. Roll the ball slightly ahead and to the side before striking.', 'Count accurate finishes from two angles.'],
      ['Receive and finish. A partner rolls a pass, or the wall sends one back.', 'Change the angle. Take the first touch to the left on one rep and to the right on the next.', 'Play the ball into a clear shooting lane and finish in two touches when the pass allows it.'],
      ['Dribble, cut, finish. Change direction at a cone and finish low.', 'Pick a side. Use two targets and look up before striking.', 'Alternate between a finish after a dribble and a finish after receiving.']
    ]],
    ['Put it together', 'Jan. 18–24', [
      ['Repeat Week 1. Use the same gate setup and 30-second dribble challenge.', 'Favorite turn. Show it in both directions.', 'Pick the move that feels most reliable and use it at game speed.'],
      ['Repeat Week 3. Try the same 10 passes from the same distance.', 'First touch to a gate. Receive toward an open side and pass back.', 'See how many times she can look, receive, and play the next pass cleanly.'],
      ['Player’s choice. She picks one dribbling drill and one passing or finishing drill.', 'Game round. Mix in a moving defender or a gate that closes.', 'Let her choose when to turn, dribble, pass, or finish. Ask her to show you one thing she does better now.']
    ]]
  ];

  const winterDays = ['Tuesday', 'Thursday', 'Saturday'];
  const winterLabels = ['First drill · 5–13 min', 'Second drill · 13–21 min', 'Challenge · 21–28 min'];

  function winterElement(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  const winterPlan = document.getElementById('winter-weeks');
  winterPlan.replaceChildren();
  winterWeeks.forEach(([skill, dates, sessions], week) => {
    const details = winterElement('details', '', 'winter-week');
    const summary = winterElement('summary', 'Week ' + (week + 1) + ' · ' + skill);
    summary.append(winterElement('span', dates, 'winter-dates'));
    const grid = winterElement('div', '', 'winter-sessions');
    sessions.forEach((steps, day) => {
      const session = winterElement('section', '', 'winter-session');
      session.append(winterElement('h3', winterDays[day]));
      steps.forEach((step, index) => {
        session.append(winterElement('h4', winterLabels[index]), winterElement('p', step));
      });
      grid.append(session);
    });
    details.append(summary, grid);
    winterPlan.append(details);
  });
}
