
jest.setTimeout(30000);

beforeAll(() => {
  page.on('pageerror', (err) => {
    console.error('Page error:', err.toString());
  });

  page.on('console', (msg) => {
    console.log('Browser console:', msg.type(), msg.text());
  });
});