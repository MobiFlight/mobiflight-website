import { defineConfig, devices } from "@playwright/test"

// Smoke tests for the built site, see tests/smoke.
// BASE_URL points them at a deployed site (pull request preview or
// production). Without it they run against `npm run preview`, so build the
// site first.
const baseURL = process.env.BASE_URL
const previewURL = "http://localhost:4321"

export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: baseURL ?? previewURL,
    // the cookie consent texts are translated, the tests use the English ones
    locale: "en-US",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: baseURL
    ? undefined
    : {
        command: "npm run preview",
        url: previewURL,
        reuseExistingServer: !process.env.CI,
      },
})
