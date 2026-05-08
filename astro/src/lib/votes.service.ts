import type { User } from "oidc-client-ts"
import { useEffect, useState } from "react"

// shared across all Vote instances on the page
export type VoteRecord = {
  id: string
  votes: number
  userCanVote: boolean
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
