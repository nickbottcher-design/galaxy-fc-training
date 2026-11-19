const teamZone = 'America/New_York';

function iCalTime(value, params) {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, utc] = match;
  const isoDate = year + '-' + month + '-' + day;
  if (!hour) return { date: isoDate };
  const desired = Date.UTC(+year, +month - 1, +day, +hour, +minute, +second);
  if (utc) return { time: new Date(desired).toISOString() };
  const zone = /(?:^|;)TZID="?([^";]+)"?/i.exec(params)?.[1] || teamZone;
  let formatter;
  try {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric',
      day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
  } catch {
    return null;
  }
  let time = desired;
  // Resolve the offset at the event time, including daylight saving changes.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = Object.fromEntries(formatter.formatToParts(time).map(part => [part.type, part.value]));
    const local = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    if (local === desired) break;
    time += desired - local;
  }
  return { time: new Date(time).toISOString() };
}

function decodeText(value) {
  return value.replace(/\\([nN,;\\])/g, (_, character) => /n/i.test(character) ? '\n' : character).trim();
}

export function upcomingEvents(calendar, now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: teamZone, dateStyle: 'short' }).format(now);
  const events = [];
  let event;
  for (const line of calendar.replace(/\r\n?/g, '\n').replace(/\n[ \t]/g, '').split('\n')) {
    if (line === 'BEGIN:VEVENT') {
      event = {};
      continue;
    }
    if (!event) continue;
    if (line === 'END:VEVENT') {
      const upcoming = event.date ? event.date >= today : Date.parse(event.time) >= +now;
      if (upcoming && event.title && !event.cancelled) {
        delete event.cancelled;
        events.push(event);
      }
      event = undefined;
      continue;
    }
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon);
    const value = line.slice(colon + 1);
    switch (key.split(';')[0].toUpperCase()) {
      case 'DTSTART': Object.assign(event, iCalTime(value, key)); break;
      case 'SUMMARY': event.title = decodeText(value); break;
      case 'LOCATION': event.location = decodeText(value); break;
      case 'STATUS': event.cancelled = value.trim().toUpperCase() === 'CANCELLED'; break;
    }
  }
  return events.sort((a, b) => (a.time || a.date).localeCompare(b.time || b.date)).slice(0, 12);
}

export async function schedule(env) {
  try {
    const response = await fetch(env.TEAMSNAP_ICAL_URL, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: 'text/calendar' }
    });
    if (!response.ok) throw new Error('TeamSnap request failed');
    const calendar = await response.text();
    if (!calendar.includes('BEGIN:VCALENDAR')) throw new Error('Invalid calendar');
    return Response.json({ events: upcomingEvents(calendar) }, {
      headers: { 'Cache-Control': 'private, max-age=60' }
    });
  } catch {
    return Response.json({ error: 'TeamSnap calendar unavailable' }, {
      status: 502, headers: { 'Cache-Control': 'no-store' }
    });
  }
}

