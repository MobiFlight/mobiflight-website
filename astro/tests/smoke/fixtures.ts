import { test as base } from "@playwright/test"

// Requests to these are aborted in every test, so smoke test runs never
// count as visits in Google Analytics or MailerLite, also not when a test
// accepts the cookie consent.
const trackingUrls = [
  /^https:\/\/([\w-]+\.)*googletagmanager\.com\//,
  /^https:\/\/([\w-]+\.)*google-analytics\.com\//,
  /^https:\/\/assets\.mailerlite\.com\/js\/universal\.js/,
]

export const test = base.extend({
  context: async ({ context }, use) => {
    for (const url of trackingUrls) {
      await context.route(url, (route) => route.abort())
    }
    await use(context)
  },
})

export { expect } from "@playwright/test"
