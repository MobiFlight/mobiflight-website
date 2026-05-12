// src/lib/votes.store.ts
import { atom, computed } from "nanostores"
import type { VoteRecord } from "./votes.service"

const MAX_VOTES = 3

export const $votes = atom<VoteRecord[]>([])

// derived: how many items the user has already voted on
export const $votesUsed = computed($votes, (records) =>
  records.filter((r) => r.userHasVoted === true).length
)

export const $hasRemainingVotes = computed($votesUsed, (used) => used < MAX_VOTES)