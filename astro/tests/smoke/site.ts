import { readdirSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const pagesDir = fileURLToPath(new URL("../../src/pages/", import.meta.url))

// Pages that can't be smoke tested by simply loading them.
const excludedPages = new Set([
  // has its own test, an unknown URL must show it with status 404
  "/404",
  // OpenID Connect callback, only works when coming back from the sign-in
  "/auth/callback/login",
])

// URL paths of all pages in src/pages, e.g. "download/thank-you.astro" ->
// "/download/thank-you". Endpoints such as sponsors.json.ts are left out.
export const pagePaths = readdirSync(pagesDir, { recursive: true, encoding: "utf8" })
  .map((file) => file.split("\\").join("/"))
  .filter((file) => /\.(astro|md|mdx)$/.test(file) && !file.includes("["))
  .map((file) => "/" + file.replace(/\.\w+$/, "").replace(/(^|\/)index$/, ""))
  .filter((path) => !excludedPages.has(path))
  .sort()

type StaticWebAppRoute = {
  route: string
  redirect?: string
  statusCode?: number
}

const staticWebAppConfig: { routes: StaticWebAppRoute[] } = JSON.parse(
  readFileSync(new URL("../../staticwebapp.config.json", import.meta.url), "utf8"),
)

// wildcard routes can't be requested as they are
export const redirects = staticWebAppConfig.routes
  .filter((route) => route.redirect && !route.route.includes("*"))
  .map((route) => ({
    route: route.route,
    target: route.redirect!,
    // Azure Static Web Apps redirects with 302 unless configured otherwise
    statusCode: route.statusCode ?? 302,
  }))

// Routes, redirects and headers from staticwebapp.config.json are only
// applied by Azure Static Web Apps, not by `npm run preview`.
export const isStaticWebApp = !!process.env.BASE_URL

// Google Tag Manager is only part of the build when PUBLIC_GTM_ID is set.
export const gtmId = process.env.PUBLIC_GTM_ID
