import type { APIRoute } from 'astro'
import sponsorData from '../data/sponsors.json'

type Sponsor = {
    name: string
    logo: string
    href: string | null
    amount: number
    sizeClass: string
}

const GOLD_SPONSOR_AMOUNT = 200

export const prerender = true

export const GET: APIRoute = async () => {
    const sponsors = (sponsorData as Sponsor[]).filter((sponsor) => sponsor.amount >= GOLD_SPONSOR_AMOUNT)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((sponsor) => ({
        name: sponsor.name,
        logo: sponsor.logo,
        href: sponsor.href,
    }))
    return new Response(
        JSON.stringify(sponsors),
        {
            headers: {
                'Content-Type': 'application/json; Charset=UTF-8',
            },
        }
    )
}