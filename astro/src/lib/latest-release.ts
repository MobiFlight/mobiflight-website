// Reads the latest stable MobiFlight Connector release from the GitHub
// Releases API, so the download page shows the current version without
// having to edit it by hand for every release.
// `releases/latest` never returns drafts or pre-releases (betas).
export const LATEST_RELEASE_API_URL =
  "https://api.github.com/repos/MobiFlight/MobiFlight-Connector/releases/latest"

export type LatestRelease = {
  version: string
  releaseDate: string
}

// Drops trailing ".0" parts the same way the download page always showed
// versions: "11.0.0" -> "v11", "11.3.0" -> "v11.3", "11.3.1" -> "v11.3.1"
export function formatVersion(tagName: string) {
  const parts = tagName.replace(/^v/i, "").split(".")
  while (parts.length > 1 && parts[parts.length - 1] === "0") {
    parts.pop()
  }
  return `v${parts.join(".")}`
}

function withOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return `${day}th`
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}

// "2026-10-06T10:51:23Z" -> "October 6th, 2026"
export function formatReleaseDate(publishedAt: string) {
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return null

  const month = date.toLocaleString("en-US", { month: "long", timeZone: "UTC" })
  return `${month} ${withOrdinalSuffix(date.getUTCDate())}, ${date.getUTCFullYear()}`
}

export async function fetchLatestRelease(): Promise<LatestRelease | null> {
  const res = await fetch(LATEST_RELEASE_API_URL, {
    headers: { Accept: "application/vnd.github+json" },
  })
  if (!res.ok) {
    throw new Error(`Failed to load latest release: ${res.status}`)
  }

  const data = await res.json()
  if (typeof data?.tag_name !== "string" || !/^v?\d+(\.\d+)*$/i.test(data.tag_name)) {
    return null
  }

  const releaseDate =
    typeof data.published_at === "string"
      ? formatReleaseDate(data.published_at)
      : null
  if (!releaseDate) return null

  return { version: formatVersion(data.tag_name), releaseDate }
}
