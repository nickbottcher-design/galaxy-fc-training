export function mountSchedule() {
  const controller = new AbortController();
  const scheduleStatus = document.getElementById('schedule-status');
  const scheduleEvents = document.getElementById('schedule-events');
  const nextStatus = document.getElementById('next-status');
  const nextEvents = document.getElementById('next-events');
  const eventTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
  });
  const eventDay = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric'
  });

  function eventRow(event, squad) {
    const row = document.createElement('li');
    const time = document.createElement('time');
    const title = document.createElement('strong');
    time.dateTime = event.date || event.time;
    time.textContent = event.date
      ? eventDay.format(new Date(event.date + 'T00:00:00Z')) + ' · All day'
      : eventTime.format(new Date(event.time));
    title.textContent = event.title;
    if (squad) {
      const label = document.createElement('span');
      label.className = 'event-squad';
      label.textContent = squad;
      row.append(label);
    }
    row.append(time, title);
    if (event.location) {
      const location = document.createElement('span');
      location.textContent = event.location;
      row.append(location);
    }
    return row;
  }

  function nextRows(events) {
    const squads = new Map();
    for (const event of events) {
      const blue = /\b(?:galaxy|bays)\s+blue\b/i.test(event.title);
      const grey = /\b(?:galaxy|bays)\s+gr[ea]y\b/i.test(event.title);
      if (blue === grey) continue;
      const label = blue ? 'Galaxy Blue' : 'Galaxy Grey';
      if (!squads.has(label)) squads.set(label, event);
    }
    if (!squads.size) return [eventRow(events[0])];
    const rows = [...squads].map(([squad, event]) => eventRow(event, squad));
    if (squads.size === 1 && ![...squads.values()].includes(events[0])) rows.unshift(eventRow(events[0]));
    return rows;
  }

  async function renderSchedule() {
    try {
      const response = await fetch('/api/schedule', { signal: controller.signal });
      if (!response.ok) throw new Error('Calendar unavailable');
      const { events } = await response.json();
      if (!events.length) {
        scheduleStatus.textContent = nextStatus.textContent = 'No upcoming events in TeamSnap.';
        return;
      }
      scheduleEvents.replaceChildren(...events.map(event => eventRow(event)));
      nextEvents.replaceChildren(...nextRows(events));
      scheduleEvents.hidden = nextEvents.hidden = false;
      scheduleStatus.hidden = nextStatus.hidden = true;
    } catch {
      if (controller.signal.aborted) return;
      nextStatus.textContent = 'Schedule unavailable right now.';
      scheduleStatus.textContent = 'The calendar couldn’t load. Open TeamSnap for the latest schedule.';
    }
  }

  renderSchedule();
  return () => controller.abort();
}
