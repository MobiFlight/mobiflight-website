import type { Page } from "@playwright/test"
import { test, expect } from "./fixtures"
import { isStaticWebApp, pagePaths, redirects } from "./site"

// Collects uncaught errors and console errors. Console errors of third-party
// content (YouTube embeds, images on shop.mobiflight.com, ...) are ignored,
// they aren't caused by this site.
function collectErrors(page: Page) {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() !== "error") return
    const source = message.location().url
    if (source && new URL(source).origin !== new URL(page.url()).origin) return
    errors.push(source ? `${message.text()} (${source})` : message.text())
  })
  return errors
}

for (const path of pagePaths) {
  test(`${path} loads without errors`, async ({ page }) => {
    const errors = collectErrors(page)

    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/\S/)
    await page.waitForLoadState("networkidle")

    expect(errors).toEqual([])
  })
}

test("an unknown URL shows the 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist")

  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1 })).toContainText("404")
})

test("internal links resolve", async ({ page, request, baseURL }) => {
  // visits every page
  test.slow()

  const origin = new URL(baseURL!).origin
  // redirects only work on Azure, they have their own test
  const skipped = new Set(isStaticWebApp ? [] : redirects.map((r) => r.route))

  const links = new Set<string>()
  for (const path of pagePaths) {
    await page.goto(path)
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((anchors) => anchors.map((a) => (a as HTMLAnchorElement).href))
    for (const href of hrefs) {
      const url = new URL(href)
      if (url.origin !== origin || skipped.has(url.pathname)) continue
      url.hash = ""
      links.add(url.href)
    }
  }

  const broken: string[] = []
  for (const link of links) {
    // a redirect counts as resolved, where it leads is not part of this site
    const response = await request.get(link, { maxRedirects: 0 })
    if (response.status() >= 400) broken.push(`${link} (${response.status()})`)
  }
  expect(broken).toEqual([])
})
