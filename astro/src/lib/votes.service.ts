import type { User } from "oidc-client-ts"

// shared across all Vote instances on the page
export type VoteRecord = {
  id: string
  votes: number
  userHasVoted?: boolean
}

let allVotesPromise: Promise<VoteRecord[]> | null = null

export function loadAllVotes(user: User, apiBase: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (user?.id_token) {
    headers["Authorization"] = `Bearer ${user.id_token}`
  }

  if (!allVotesPromise) {
    allVotesPromise = fetch(`${apiBase}/api/votes/roadmap`, {
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load votes: ${res.status}`)
        return res.json()
      })
      .then((data) => data.options ?? [])
  }
  return allVotesPromise
}

export function castVote(user: User, apiBase: string, itemId: string) {
  return fetch(`${apiBase}/api/votes/roadmap/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id_token}`,
    },
    body: JSON.stringify({ itemId }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Vote request failed with status ${res.status}`)
    }
    return res.json()
  })
}

export function removeVote(user: User, apiBase: string, itemId: string) {
   return fetch(`${apiBase}/api/votes/roadmap/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id_token}`,
    },
    body: JSON.stringify({ itemId }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Vote request failed with status ${res.status}`)
    }
    return res.json()
  })
}
