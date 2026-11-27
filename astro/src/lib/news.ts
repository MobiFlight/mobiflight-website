// Decides which items of the news feed (public/feed/<lang>/feed.json) are
// shown. Uses the same rule as the other apps that read the feed, e.g. HubHop:
// an item is shown from its `date` up to and including its `expires` day.

// The date in the local time zone as YYYY-MM-DD, the format of the feed's dates
export function localDate(date: Date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-")
}

// YYYY-MM-DD strings compare like the dates they stand for
export function isCurrentNewsItem(
  item: { date: string; expires?: string },
  today: string = localDate(),
) {
  return item.date <= today && (!item.expires || item.expires >= today)
}
