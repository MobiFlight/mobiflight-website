import type { Page } from "@playwright/test"
import { test, expect } from "./fixtures"
import { gtmId } from "./site"

test.beforeEach(async ({ page }) => {
  // the consent banner is hidden from bots, which includes browsers
  // controlled by Playwright
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false })
  })
})

function consentModal(page: Page) {
  return page.getByRole("dialog", { name: "We use cookies" })
}

test("consent modal blocks the page until a choice is made", async ({ page }) => {
  await page.goto("/")

  await expect(consentModal(page)).toBeVisible()
  await expect(page.locator("html")).toHaveClass(/disable--interaction/)

  await consentModal(page).getByRole("button", { name: "Reject all" }).click()

  await expect(consentModal(page)).toBeHidden()
  await expect(page.locator("html")).not.toHaveClass(/disable--interaction/)

  // the choice is remembered
  await page.reload()
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(consentModal(page)).toBeHidden()
})

test.describe("Google Tag Manager", () => {
  test.skip(!gtmId, "PUBLIC_GTM_ID is not set")

  const gtmUrl = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`

  test("is not loaded without consent", async ({ page }) => {
    const gtmRequests: string[] = []
    page.on("request", (request) => {
      if (request.url().includes("googletagmanager.com")) gtmRequests.push(request.url())
    })

    await page.goto("/")
    await consentModal(page).getByRole("button", { name: "Reject all" }).click()
    await expect(consentModal(page)).toBeHidden()
    await page.reload()
    await page.waitForLoadState("networkidle")

    expect(gtmRequests).toEqual([])
  })

  test("is loaded after accepting analytics cookies", async ({ page }) => {
    await page.goto("/")
    await expect(consentModal(page)).toBeVisible()

    // the request itself is aborted, see fixtures.ts
    const gtmRequest = page.waitForRequest(gtmUrl)
    await consentModal(page).getByRole("button", { name: "Accept all" }).click()
    await gtmRequest
  })
})
