# Baltimore Bays Galaxy

`src/GalaxyFC.jsx` contains the React page. The surrounding project includes the site styles, team photos, rosters, training plans, navigation, and TeamSnap calendar integration.

Use Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

To load the live schedule locally, copy `.env.example` to `.env.local` and set `TEAMSNAP_ICAL_URL` to your HTTPS iCal URL. Restart the dev server after changing it.

Run `npm run build` to create the website files in `dist/`. For a production deployment, supply a server-side `/api/schedule` endpoint using `server/teamsnap.mjs` and keep the feed URL server-side. Apply your host's access controls before deploying the roster and team photos. The archive includes the roster and team photos.

## Deploying on Vercel

`api/schedule.js` serves `/api/schedule` using `server/teamsnap.mjs`. In the Vercel project, add an environment variable named `TEAMSNAP_ICAL_URL` set to the TeamSnap iCal link (all teams), then redeploy. Keep that link out of the repository: it is private to your team.
