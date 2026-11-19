// Vercel serverless endpoint: GET /api/schedule
// The TeamSnap iCal feed stays on the server. TEAMSNAP_ICAL_URL (Vercel env var) overrides the built-in default.
const DEFAULT_ICAL_URL = 'https://ical-cdn.teamsnap.com/user_schedule/0d37e260-f9ca-013c-17a9-07935df44441.ics';
import { schedule } from '../server/teamsnap.mjs';

export default async function handler(_request, response) {
  const result = await schedule({ TEAMSNAP_ICAL_URL: process.env.TEAMSNAP_ICAL_URL || DEFAULT_ICAL_URL });
  response.status(result.status);
  result.headers.forEach((value, header) => response.setHeader(header, value));
  response.send(await result.text());
}
