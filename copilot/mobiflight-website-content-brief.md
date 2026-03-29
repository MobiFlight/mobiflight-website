# MobiFlight Website — Content Brief

> Generated: March 27, 2026
> Purpose: Website content for new MobiFlight.com — 4 pages

---

## Page 1: Homepage

### Hero Section

**Headline:** Build Your Cockpit. Fly Your Sim.

**Subheadline:** MobiFlight is the free, open-source middleware that connects Arduino and Raspberry Pi Pico microcontrollers to your favorite flight simulator — turning physical switches, LEDs, and gauges into a real cockpit experience.

**Supported sims:** MSFS 2024, MSFS 2020, X-Plane 12/11, P3D, FSX

**Supported hardware:** Arduino Mega, Nano, Pro Micro, Raspberry Pi Pico, MIDI boards, and more

**Primary CTAs:**
- 🟢 **Download Free** → `/download`
- ▶️ **Watch: Getting Started** → YouTube (embedded or linked)

---

### Quick Navigation Hub

Six icon tiles linking outward:

| Tile | Label | Destination |
|---|---|---|
| 📖 | Documentation | docs.mobiflight.com |
| 🛒 | Shop | shop.mobiflight.com |
| 💬 | Community (Discord) | mobiflight.com/discord |
| ✈️ | HubHop Presets | HubHop external site |
| ⭐ | MobiFlight Club | `/club` |
| 🤝 | Professional Services | `/services` |

---

### News & Updates Feed

Dynamic feed pulling from the same JSON/RSS source used in the desktop application's community feed. Each item shows: **title**, **short description**, **date**, and a **read more** link.

> Dev note: This feed already exists in v11 — expose the same endpoint here. No double maintenance.

---

### Sponsor Wall

A logo grid of GitHub Sponsors (premium tier highlighted).

- Section title: **"Powered by Our Sponsors"**
- CTA: **"Become a Sponsor"** → github.com/sponsors/MobiFlight

---

### Donations Timeline

A visual timeline or progress bar showing cumulative donation milestones (monthly/yearly). Pulls from donation data.

- CTA: **"Support via PayPal"**
- CTA: **"Sponsor via GitHub"**

---

## Page 2: Download

### Latest Release

**Headline:** Download MobiFlight — It's Free.

- Version badge: **v11** (latest stable)
- Release date (auto-populated via GitHub API)
- Primary download button: `MobiFlight-v11-Setup.exe`
- Direct link to **GitHub Releases** → github.com/MobiFlight/MobiFlight-Connector/releases

> Dev note: Use the GitHub Releases API to keep the version badge and download button current automatically — no manual updates needed.

---

### Release Notes

- Expandable / linked section: "What's new in v11"
- Link to full changelog on GitHub
- Key v11 highlights: fresh new look, redesigned UI, new project concepts, easier sharing, improved stability

---

### Latest Release Video

Embedded YouTube video: **"The Biggest MobiFlight Release Ever! — Release 11"** (published March 15, 2026)

---

### Previous Versions & GitHub

- Link to all releases on GitHub
- Note: *"MobiFlight is fully open source. Explore the source code, contribute, or report issues."*
- GitHub repo: github.com/MobiFlight

---

## Page 3: MobiFlight Club

### Headline

**"Join the MobiFlight Club — Fly Further Together"**

Subheadline: *For the builders, tinkerers, and sim pilots who want more.*

---

### Benefits

| Benefit | Description |
|---|---|
| 🎟️ Early Access | Beta builds and new features before public release |
| 📰 Members Newsletter | Exclusive updates, behind-the-scenes insights, upcoming features |
| 🏷️ Shop Discounts | Member pricing on hardware bundles and event tickets |
| 🎖️ Member Badge | Recognized role in the Discord community server |
| 📅 Event Priority | First access to workshop signups at events like FSWeekend |
| ❤️ Support the Project | Membership directly funds open-source development |

---

### Registration / Account CTAs

- **"Become a Member"** → Account registration page
- **"Already a member? Log in"** → Membership dashboard login

---

### Social Proof

Short quote or stat: *"More than 7,000 community members worldwide"*

---

## Page 4: Professional Services

### Headline

**"MobiFlight for Professionals"**

Subheadline: *Take your hardware or business to the next level with the team behind MobiFlight.*

---

### Service 1 — Hardware Onboarding

**"Get Your Hardware MobiFlight-Ready"**

*Target group: Existing hardware vendors (e.g., flight sim panel manufacturers)*

Your customers are already asking for MobiFlight compatibility. We help you get there. We analyze your hardware's interface, develop the MobiFlight device definition, test firmware integration, and publish your device to the MobiFlight ecosystem — so your customers can plug in and fly.

**CTA:** *"Let's talk about your hardware →"* (contact form / email)

---

### Service 2 — Build Your Controllers with MobiFlight

**"Bring Your Controller Concept to Life"**

*Target group: Startups and entrepreneurs developing new flight sim hardware*

From button mapping to encoder logic to display output — MobiFlight provides the software foundation so you can focus on hardware design. We consult on architecture, help integrate MobiFlight support from day one, and support you through development and launch.

**CTA:** *"Start building with us →"* (contact form)

---

### Service 3 — Consulting & Support

**"Expert Help for Your Cockpit Build"**

*Target group: Sim enthusiasts and prosumer cockpit builders*

Whether you're building a full A320 home cockpit or wiring up your first overhead panel, our consulting service connects you directly with MobiFlight expertise. We help you plan your setup, solve configuration challenges, and get everything running smoothly.

**CTA:** *"Book a consultation →"*

---

### Service 4 — Sponsoring via GitHub Sponsors

**"Sponsor MobiFlight"**

*Target group: Companies and individuals who benefit from the platform*

MobiFlight is free and open source — and stays that way because of sponsors. GitHub Sponsors is the primary way businesses and power users invest in the project's future. Premium sponsors receive logo placement, early access to features, and recognition across the MobiFlight community.

**Sponsorship tiers:**
- Individual sponsor
- Business / Premium sponsor (logo on website + in-app)

**CTA:** *"Become a Sponsor on GitHub →"* → github.com/sponsors/MobiFlight

---

## General Implementation Notes

- **News feed** on the homepage shares the same data source as the v11 in-app community feed — single source of truth, no double maintenance.
- All external links (Discord, Shop, Docs, HubHop) should open in a **new tab**.
- **Download page** version badge and download button should be auto-populated via the **GitHub Releases API**.
- Tone across all pages: **friendly, technical, and community-first** — consistent with MobiFlight's voice on YouTube and Discord.
- Internal pages: `/download`, `/club`, `/services`
- External destinations: docs.mobiflight.com, shop.mobiflight.com, Discord invite, HubHop, GitHub
