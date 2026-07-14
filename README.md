# Policy Adda — Next-Generation Digital Platform

A premium marketing experience for **Policy Adda**, an insurance & loan
consultancy based in Ranchi, Jharkhand. It positions the brand as the modern,
relationship-led alternative to national insurance marketplaces — *“Policy Aapka,
Adda Apna.”*

This is a design-led rebuild of the original prototype: same business, same
real data, but re-architected as a warm, editorial, human brand experience
benchmarked against Apple, Stripe, Linear, Vercel, Notion, Airbnb and CRED —
not against PolicyBazaar.

## Stack

- **Vite + React 18 + TypeScript** (strict)
- **Tailwind CSS** (custom design tokens, no default blue)
- **Framer Motion** for scroll reveals, micro-interactions and the animated
  timeline/map (respects `prefers-reduced-motion` globally via `MotionConfig`)
- **No backend** — forms mock submission with `console.log` + an `aria-live` toast

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build
npm run lint       # tsc --noEmit
```

## Brand strategy

**Positioning.** Policybazaar wins on scale and price comparison. Policy Adda
cannot out-marketplace them, so the entire experience is built around the
opposite of a faceless portal: a **named advisor you can meet, a real branch
desk in your city, and someone who stays until your claim is settled.** Every
section is engineered to make the relationship — not the transaction — the
product.

**Tone.** Warm, plain-spoken, trustworthy. Copy is written in the voice of a
neighbour who happens to be an expert: “We compare prices too — but the
relationship continues after checkout.” No jargon, no pressure, no bots.

**Proof, not claims.** Real, specific facts only — serving since 2018, Ranchi
HQ at Plaza Chowk, 10 branches, 20+ insurer partners, named advisors, a
9-day typical claim turnaround. No invented stats, no logos we don’t have.

## Design philosophy

Five principles drove every decision:

1. **Warmth over corporate.** A khadi-paper palette and terracotta “ember”
   replace generic insurance blue. The brand should feel like a trusted local
   *adda* (gathering place), not a banking portal.
2. **Editorial, not template.** A characterful display serif paired with a
   humanist sans gives the site a magazine-like rhythm and a point of view.
3. **Calm confidence.** Generous whitespace, clear typographic scale, and
   restrained motion. Nothing shouts; the brand whispers and is believed.
4. **Relationship made visible.** Advisors have faces, branches have maps,
   claims have a timeline. Trust is shown, not asserted.
5. **Craft in the details.** Glass surfaces, soft auras, animated counters,
   scroll reveals, focus rings, a reading-progress bar, a floating WhatsApp
   helper and a sticky CTA — each subtle, each purposeful.

## Typography

- **Display — Fraunces** (variable, optical sizing, 400–700). A warm,
  editorial serif with personality; used for headlines and numbers. Chosen over
  a cold geometric sans to signal “human, timeless.”
- **Body — Manrope** (400–800). A modern, friendly, highly legible grotesque;
  ideal for long-form explanations and UI text.
- **Scale.** Fluid `clamp()` headings (`display-xl` → `display-md`) keep
  hierarchy intact from 375px to 1920px. Body is 15–18px with 1.6+ line-height
  and a ~68ch reading measure for paragraphs.

## Color system

| Token | Value | Role |
| --- | --- | --- |
| `paper` | `#FBF7F1` | Warm ivory page background |
| `sand` / `mist` | `#F1E7D8` / `#F6EFE6` | Section surfaces for rhythm |
| `ink` | `#1B1714` | Near-black warm text |
| `clay` | `#C0492B` (dark `#97371F`) | Primary “ember” accent |
| `gold` | `#D9A441` | Warm secondary accent |
| `pine` | `#2F5D50` | Trust/success (claims, WhatsApp) |
| `sage` | `#5C7A6B` | Muted support |

All text/background pairings meet WCAG AA; small text uses `clay-dark` or
`ink-soft` for sufficient contrast.

## Motion principles

- **Reveal on scroll** — sections fade and rise via `whileInView`
  (`viewport: { once: true }`), staggered for rhythm.
- **Micro-interactions** — buttons lift/scale on hover/tap; cards lift on
  hover; nav links underline; the branch map draws its connection lines and
  pulses the HQ node.
- **Purposeful, not decorative** — the claims timeline draws downward as you
  read; counters count up when seen; the sticky CTA and floating WhatsApp
  appear only when useful.
- **Accessibility** — `MotionConfig reducedMotion="user"` disables transform
  animations for users who request reduced motion; a global CSS block also
  neutralises transitions.

## Component architecture

```
src/
  components/
    ui.tsx              Design system: Container, Section, SectionHeading,
                        Button, Reveal, Counter, ScrollProgress,
                        FloatingWhatsApp, StickyCTA, Accordion, Logo, cx()
    Nav.tsx             Glass sticky nav + accessible mobile menu
    Hero.tsx            Editorial hero + floating advisor/claim chips + form
    TrustBar.tsx        Animated counters (branches, partners, claim days)
    WhyUs.tsx           3 pillars: person / claims / local (dark band)
    ProductGrid.tsx     8 premium product cards (benefits, best-for, CTA)
    LoansStrip.tsx      Loan types as chips
    Process.tsx         4-step process
    ClaimsExperience.tsx Animated vertical claims timeline
    Comparison.tsx      Marketplace vs Adda side-by-side
    BranchNetwork.tsx   Interactive network map (clickable pins + detail)
    MeetYourAdvisor.tsx Named advisor profile cards
    Testimonials.tsx    3 attributed testimonials
    PartnerStrip.tsx    Insurer partners (marquee)
    Faq.tsx             Accessible accordion
    CTABand.tsx         Final quote band
    Footer.tsx          Contact + IRDAI-style compliance notice
    Toast.tsx           Lightweight aria-live toaster
    icons.tsx           Inline SVG icon set
  data/                 products, branches, partners, advisors, faqs, testimonials
  App.tsx               Composition + MotionConfig + global UI
```

Tokens live in `tailwind.config.ts`; base layer, glass/aura/utilities and
focus styles live in `src/index.css`. No static inline styles — all visuals
are token-driven Tailwind or CSS classes.

## Accessibility

- Single `<h1>`, logical heading order, semantic landmarks.
- Skip link, visible focus rings, labelled form fields with inline validation.
- All interactive controls have accessible names; decorative SVGs are
  `aria-hidden`.
- Colour-contrast checked against WCAG AA; reduced-motion supported.
- Keyboard-operable: nav menu, branch map pins, FAQ accordion, form.

## Performance

- SVG icons and CSS gradients (no heavy images).
- `prefers-reduced-motion` short-circuits animation work.
- Vite production build: ~103 kB gzipped JS, ~7 kB gzipped CSS.
- Lighthouse target: Performance 95+ / Accessibility 95+ (verify in CI).

## Backend integration plan

Forms currently mock submission (`QuoteForm` → `console.log` + toast). To go
live:

1. **API.** `POST /api/enquiries` with the existing payload shape
   (`product`, `name`, `mobile`, `branch`). Reuse the field names.
2. **Validation & anti-spam.** Move checks server-side, add an OTP/ CAPTCHA on
   mobile, rate-limit.
3. **CRM.** Pipe enquiries into Zoho/HubSpot or a sheet so the nearest branch
   desk is notified within one working day (matching the copy’s promise).
4. **Quotes.** Proxy insurer quotation APIs behind a server so keys never
   reach the browser.
5. **Compliance.** Replace the prototype IRDAI placeholder with the firm’s
   real IRDAI registration and a verified SMS sender ID.
6. **Analytics.** Consent-based event tracking on form starts/completes and
   branch-page views.

## Why this differentiates Policy Adda from PolicyBazaar

PolicyBazaar is a **marketplace**: scale, price comparison, self-serve, a
toll-free number. Policy Adda is a **relationship**: a named advisor, a branch
you can walk into, and claims follow-through. This site never tries to out-
marketplace PolicyBazaar — it makes the human alternative feel premium, calm
and trustworthy, so the prospective customer thinks *“finally, someone I can
actually talk to.”* The marketplace comparison section states the difference
plainly; the advisor and branch-map sections make it tangible.

## Future roadmap

- Real advisor photos + booking, advisor-specific landing pages.
- Live branch availability and “book a visit” flow.
- Animated product explainer videos / illustrations.
- Localisation (Hindi, Angika, Bhojpuri) with a language switcher.
- Blog / knowledge base for plain-language insurance education.
- Netlify Functions or Form endpoint to receive the quote form for real.
```
