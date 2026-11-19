import { defineConfig, loadEnv } from 'vite';
import { schedule } from './server/teamsnap.mjs';

export default defineConfig(({ mode }) => {
  const { TEAMSNAP_ICAL_URL } = loadEnv(mode, process.cwd(), 'TEAMSNAP_');

  function addSchedule(server) {
    server.middlewares.use('/api/schedule', async (_request, response) => {
      const result = await schedule({ TEAMSNAP_ICAL_URL });
      response.statusCode = result.status;
      result.headers.forEach((value, header) => response.setHeader(header, value));
      response.end(await result.text());
    });
  }

  return {
    plugins: [{
      name: 'galaxy-teamsnap',
      configureServer: addSchedule,
      configurePreviewServer: addSchedule
    }]
  };
});
