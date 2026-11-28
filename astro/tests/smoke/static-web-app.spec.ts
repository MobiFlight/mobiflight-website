import { test, expect } from "./fixtures"
import { isStaticWebApp, redirects } from "./site"

// mobiflight.app reads the sponsors from here
test("/sponsors.json lists the sponsors", async ({ request }) => {
  const response = await request.get("/sponsors.json")

  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("application/json")
  if (isStaticWebApp) {
    expect(response.headers()["access-control-allow-origin"]).toBe("*")
  }

  const sponsors = await response.json()
  expect(Array.isArray(sponsors)).toBe(true)
  expect(sponsors.length).toBeGreaterThan(0)
  for (const sponsor of sponsors) {
    expect(sponsor).toMatchObject({ name: expect.any(String), logo: expect.any(String) })
    // sponsors without a website have no link
    if (sponsor.href !== null) expect(sponsor.href).toEqual(expect.any(String))
  }
})

// Azure normalizes the Location header, e.g. it adds a trailing slash to a
// bare domain and percent-encodes "@"
function normalizeUrl(url: string, baseURL: string) {
  return decodeURIComponent(new URL(url, baseURL).href)
}

test.describe("redirects", () => {
  test.skip(!isStaticWebApp, "redirects are only applied by Azure Static Web Apps")

  for (const { route, target, statusCode } of redirects) {
    test(`${route} redirects to ${target}`, async ({ request, baseURL }) => {
      const response = await request.get(route, { maxRedirects: 0 })

      expect(response.status()).toBe(statusCode)
      const location = response.headers()["location"]
      expect(location).toBeTruthy()
      expect(normalizeUrl(location, baseURL!)).toBe(normalizeUrl(target, baseURL!))
    })
  }
})
