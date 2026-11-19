// Vercel serverless endpoint: GET /api/schedule
// Keeps the TeamSnap iCal feed URL on the server (set TEAMSNAP_ICAL_URL in Vercel env vars).
import { schedule } from '../server/teamsnap.mjs';

export default async function handler(_request, response) {
  const result = await schedule({ TEAMSNAP_ICAL_URL: process.env.TEAMSNAP_ICAL_URL });
  response.status(result.status);
  result.headers.forEach((value, header) => response.setHeader(header, value));
  response.send(await result.text());
}
