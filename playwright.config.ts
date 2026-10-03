import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const baseURL = `http://localhost:${PORT}`;

// Optional escape hatch for environments where Playwright can't download its
// own browser (e.g. restricted CI sandboxes). Normally leave this unset and run
// `npx playwright install chromium`.
const chromiumPath = process.env.PW_CHROMIUM_PATH;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL,
    // Deterministic rendering: fixed theme, and no entrance animations to wait for.
    colorScheme: 'light',
    reducedMotion: 'reduce',
    // Only keep debugging artifacts when something goes wrong.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...(chromiumPath && {
      launchOptions: { executablePath: chromiumPath, args: ['--no-sandbox'] },
    }),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // Tests run against the production build, which is what actually ships.
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
