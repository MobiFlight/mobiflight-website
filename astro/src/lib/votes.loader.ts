import type { User } from "oidc-client-ts"
import { useEffect, useState } from "react"

// shared across all Vote instances on the page
type VoteRecord = {
  id: string
  votes: number
  canVote: boolean
}

let allVotesPromise: Promise<VoteRecord[]> | null = null

export function loadAllVotes(user: User, apiBase: string) {
  if (!allVotesPromise) {
    allVotesPromise = fetch(`${apiBase}/api/votes/roadmap`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.id_token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load votes: ${res.status}`)
        return res.json()
      })
      .then((data) => data.options ?? [])
  }
  return allVotesPromise
}
