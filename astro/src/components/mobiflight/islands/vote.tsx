import { useEffect, useState } from "react"
import { Badge } from "./shadcn/components/ui/Badge"
import { Button } from "./shadcn/components/ui/Button"
import IconThumbUp from "@/components/mobiflight/islands/icons/icon-thumb-up"
import { getAuth } from "@/lib/auth/oidc.config"
import IconSquareRoundedCheck from "@/components/mobiflight/islands/icons/icon-square-rounded-check"
import { loadAllVotes, castVote, removeVote } from "@/lib/votes.service"
import IconStop from "@/components/mobiflight/islands/icons/icon-stop"
import { useStore } from "@nanostores/react"
import { $votes, $hasRemainingVotes } from "@/lib/votes.store"
import ClubLogo from "@/components/mobiflight/islands/club-logo"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/mobiflight/islands/shadcn/components/ui/Dialog"

export interface VoteProps {
  voteCount: number
  voteItemId: string
}

const Vote = ({ voteCount, voteItemId }: VoteProps) => {
  const apiBase =
    import.meta.env.PUBLIC_MOBIFLIGHT_API_BASE_URL ??
    "https://api.mobiflight.com"
  const votes = useStore($votes)
  const hasVotesLeft = useStore($hasRemainingVotes)

  const voteRecord = votes.find((r) => r.id === voteItemId)
  const currentVotes = voteRecord?.votes ?? voteCount
  const hasVoted = voteRecord?.userHasVoted ?? false

  const [dialogOpen, setDialogOpen] = useState(false)

  async function handleVote(itemId: string) {
    const auth = getAuth()
    const user = await auth.getUser()

    if (!user || user.expired) {
      setDialogOpen(true)
      return
    }

    await castVote(user, apiBase, voteItemId).then((data) => {
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
        state: { returnTo: "/roadmap", itemId: itemId },
      })
      return
    }

    await removeVote(user, apiBase, voteItemId).then((data) => {
      // update all votes to calculate if the user has votes left and
      // update the current vote count for this item
      $votes.set(data.options ?? [])
    })
  }

  useEffect(() => {
    const fetchVotes = async () => {
      const user = await getAuth().getUser()

      if ($votes.get().length > 0) return // already loaded
      loadAllVotes(user!, apiBase).then((records) => $votes.set(records))
    }
    fetchVotes()
  }, [])

  return (
    <>
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
              if (!hasVoted || hasVotesLeft) handleVote(voteItemId)
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader className="gap-4">
            <DialogTitle className="flex flex-col gap-4 items-center">
              <ClubLogo />
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <p className="text-lg text-center">Sign in with your MobiFlight Club account to vote.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
            className="px-4 py-2 h-9"
              onClick={async () => {
                setDialogOpen(false)
                const auth = getAuth()
                const user = await auth.getUser()
                await auth.signinRedirect({
                  state: { returnTo: "/roadmap", itemId: voteItemId },
                })
                return
              }}
            >
              Sign in
            </Button>
            <p className="text-xs text-muted-foreground">
              <a href="https://club.mobiflight.com" className="underline">No member yet? Learn more about the MobiFlight Club.</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Vote
