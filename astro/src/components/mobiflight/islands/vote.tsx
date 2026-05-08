import { useEffect, useState } from "react"
import { Badge } from "./shadcn/components/ui/Badge"
import { Button } from "./shadcn/components/ui/Button"
import IconThumbUp from "@/components/mobiflight/islands/icons/icon-thumb-up"
import { getAuth } from "@/lib/auth/oidc.config"
import IconSquareRoundedCheck from "@/components/mobiflight/islands/icons/icon-square-rounded-check"
import { loadAllVotes, castVote, removeVote, type VoteRecord } from "@/lib/votes.service"
import IconStop from "@/components/mobiflight/islands/icons/icon-stop"
import { useStore } from "@nanostores/react"
import { $votes, $hasRemainingVotes } from "@/lib/votes.store"

export interface VoteProps {
  voteCount: number
  voteItemId: string
  canVote: boolean
}

const Vote = ({ voteCount, voteItemId, canVote }: VoteProps) => {
  const apiBase = import.meta.env.PUBLIC_OIDC_REDIRECT_BASE_URL ?? ""
  const votes = useStore($votes)
  const hasVotesLeft = useStore($hasRemainingVotes)

  const voteRecord = votes.find((r) => r.id === voteItemId)
  const currentVotes = voteRecord?.votes ?? voteCount
  const hasVoted = voteRecord ? !voteRecord.userCanVote : !canVote

  async function handleVote(itemId: string) {
    const auth = getAuth()
    const user = await auth.getUser()

    if (!user || user.expired) {
      await auth.signinRedirect({
        state: { returnTo: "/roadmap", voteItemId: itemId },
      })
      return
    }

    await castVote(user, apiBase, voteItemId)
      .then((data) => {
        // update all votes to calculate if the user has votes left and
        // update the current vote count for this item
        $votes.set(data.options ?? [])
      })
  }

  async function handleRemoveVote(itemId: string) {
    const auth = getAuth()
    const user = await auth.getUser()

    if (!user || user.expired) {
      await auth.signinRedirect({
        state: { returnTo: "/roadmap", voteItemId: itemId },
      })
      return
    }

    await removeVote(user, apiBase, voteItemId)
      .then((data) => {
        // update all votes to calculate if the user has votes left and
        // update the current vote count for this item
        $votes.set(data.options ?? [])
      })
  }

  useEffect(() => {
    const fetchVotes = async () => {
      const user = await getAuth().getUser()
      if (!user || user.expired) return

      if ($votes.get().length > 0) return // already loaded
      loadAllVotes(user, apiBase).then((records) => $votes.set(records))
    }
    fetchVotes()
  }, [])

  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="sr-only">Votes</span>
      <Badge
        variant="outline"
        size={"md"}
        className="rounded-lg pr-0 py-0 text-sm [&_svg]:size-4"
      >
        <IconThumbUp />
        <span className="min-w-4">{currentVotes ?? 0}</span>
        <Button
          variant="default"
          size={"sm"}
          className="rounded-l-none pl-3"
          disabled={!hasVoted && !hasVotesLeft}
          onClick={() => {
            if (!hasVoted && hasVotesLeft) handleVote(voteItemId)
            else handleRemoveVote(voteItemId)
          }}
        >
          <span className="min-w-3">
            {!hasVoted ? (
              hasVotesLeft ? (
                "+1"
              ) : (
                <IconStop />
              )
            ) : (
              <IconSquareRoundedCheck />
            )}
          </span>
        </Button>
      </Badge>
    </div>
  )
}
export default Vote
