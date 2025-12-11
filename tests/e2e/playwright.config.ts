import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Whiskey Inventory E2E tests.
 * Supports running against:
 * - Local MSW (default): http://localhost:3000
 * - Preview/staging: Set PREVIEW_URL environment variable
 */

const baseURL = process.env.PREVIEW_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: process.env.PREVIEW_URL ? undefined : {
    command: 'node msw-server.js',
    url: 'http://localhost:3000/api/whiskeys',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
