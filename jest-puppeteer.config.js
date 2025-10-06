module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0,
    devtools: process.env.DEVTOOLS === 'true',
  },
  server: {
    command: 'npm run dev',
    port: 8080,
    launchTimeout: 10000,
    debug: true,
  },
};