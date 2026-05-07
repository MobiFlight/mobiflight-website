import { useEffect, useState } from "react"
import { Badge } from "./shadcn/components/ui/Badge"
import { Button } from "./shadcn/components/ui/Button"
import IconThumbUp from "@/components/mobiflight/islands/icons/icon-thumb-up"
import { getAuth } from "@/lib/auth/oidc.config"
import IconSquareRoundedCheck from "@/components/mobiflight/islands/icons/icon-square-rounded-check"
import { loadAllVotes } from "@/lib/votes.loader"

export interface VoteProps {
  votes: number
  voteItemId: string
  canVote: boolean
}

const Vote = ({ votes, voteItemId, canVote }: VoteProps) => {
  const apiBase = import.meta.env.PUBLIC_OIDC_REDIRECT_BASE_URL ?? ""

  const [currentVotes, setCurrentVotes] = useState(votes)
  const [hasVoted, setHasVoted] = useState(!canVote)

  async function handleVote(itemId: string) {
    const auth = getAuth()
    const user = await auth.getUser()

    if (!user || user.expired) {
      await auth.signinRedirect({
        state: { returnTo: "/roadmap", voteItemId: itemId },
      })
      return
    }

    await fetch(`${apiBase}/api/votes/roadmap/${voteItemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.id_token}`,
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Vote request failed with status ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setCurrentVotes((prev) => prev + 1)
        setHasVoted(true)
      })
  }

  useEffect(() => {
    const fetchVotes = async () => {
      const user = await getAuth().getUser()
      if (!user || user.expired) return

      loadAllVotes(user, apiBase)
        .then((allVotes) => {
          const record = allVotes.find((v) => v.id === voteItemId)
          if (record === undefined) return
          setCurrentVotes(record.votes)
          setHasVoted(!record.canVote)
        })
        .catch((error) => {
          console.error("Failed to load votes:", error)
        })
    }
    fetchVotes()
  }, [voteItemId])

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
        {!hasVoted ? (
          <Button
            variant="default"
            size={"sm"}
            className="rounded-l-none pl-3"
            onClick={() => {
              handleVote(voteItemId)
            }}
          >
           <span className="min-w-5">+1</span>
          </Button>
        ) : (
          <div className="p-2.5 px-4 flex items-center bg-foreground rounded-md rounded-l-none [&_svg]:stroke-background min-w-2.5">
            <IconSquareRoundedCheck />
          </div>
        )}
      </Badge>
    </div>
  )
}
export default Vote
