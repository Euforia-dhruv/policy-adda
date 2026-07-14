# Policy Adda — Alpine Dark (Mercury) Platform

A premium marketing experience for **Policy Adda**, an insurance & loan
consultancy based in Ranchi, Jharkhand. It positions the brand as the modern,
relationship-led alternative to national insurance marketplaces — *“Policy Aapka,
Adda Apna.”*

This is a design-led rebuild of the original prototype: same business, same
real data, but re-architected in a **dark, alpine-banking aesthetic** (the
"Mercury" system) — a near-black onyx canvas, flat graphite cards separated by
value contrast alone, and a single vivid cobalt as the only chromatic action —
benchmarked against Mercury, Stripe, Linear, Ramp and Brex, not PolicyBazaar.

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

1. **Hushed, premium darkness.** A near-black onyx canvas (`#171721`) sets a
   cinematic, observatory-like atmosphere. Surfaces float as subtly lighter
   graphite cards — the opposite of a bright, faceless insurance portal.
2. **One chromatic note.** The interface is overwhelmingly monochromatic —
   ivory text on onyx — with a single vivid cobalt (`#5266eb`) reserved
   exclusively for the primary action. No greens, reds, or oranges.
3. **Flat, not glossy.** Elevation is communicated through value contrast
   alone — graphite one step lighter than the canvas — never drop shadows.
   Pill-shaped controls define structure.
4. **Relationship made visible.** Advisors have faces, branches have maps,
   claims have a timeline. Trust is shown, not asserted.
5. **Measured craft.** Intermediate-weight display type, cursor-following
   cobalt light, animated counters, scroll reveals, focus rings, a
   reading-progress bar, a floating WhatsApp helper and a sticky CTA — each
   subtle, each purposeful.

## Typography

- **Display — Archivo** (400–700), a Söhne-Breit-style grotesque used at
  intermediate weights for all headings. Its wide-set, architectural quality
  gives display copy presence without shouting.
- **Body — Inter** (300–700). A modern, highly legible UI grotesque; ideal for
  navigation, long-form explanations and form controls.
- **Scale.** Fluid `clamp()` headings (`display-xl` → `display-md`) keep
  hierarchy intact from 375px to 1920px. Body is 16px at 1.5 line-height with a
  ~68ch reading measure. Weights stay measured — never bold (700+).

## Color system

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#171721` | Onyx page background, hero overlay, footer |
| `surface` | `#1e1e2a` | Graphite card & section surface (one step lighter) |
| `elevated` | `#272735` | Obsidian interactive surface — secondary fills |
| `slate` | `#70707d` | Medium-weight structural dividers |
| `mist` | `#e2e3ed` | Light hairline borders, input edges |
| `ash` | `#c3c3cc` | Muted body copy, helper text, secondary labels |
| `ivory` | `#ededf3` | Primary text, icons, nav, ghost-button strokes |
| `cobalt` | `#5266eb` | The single chromatic action — primary buttons only |
| `white` | `#ffffff` | Text/icon fill on cobalt buttons only |

Elevation is flat: separation comes from the graphite-on-onyx value step, not
shadows. Surfaces (`card-material`, `card-raised`, `material-leather`,
`material-aluminium`, `material-forest`, `glass`) are dark, hairline-bordered
graphite. Body text is always ivory — never pure white — on the dark canvas.

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
                        FloatingWhatsApp, StickyCTA, Accordion, Logo, cx(),
                        CursorGlow (pointer-following light)
    Nav.tsx             Glass sticky nav + accessible mobile menu
    Hero.tsx            Consultation-desk hero: parallax float cards + physical
                        QuoteForm, advisor availability indicator
    QuoteForm.tsx       Physical object form: floating labels, inset inputs
    TrustBar.tsx        Animated counters (branches, partners, claim days)
    ProductGrid.tsx     8 premium product cards (benefits, best-for, CTA)
    LoansStrip.tsx      Loan types as chips
    Process.tsx         4-step process
    ClaimsExperience.tsx Animated vertical claims timeline
    Comparison.tsx      Marketplace vs Adda side-by-side (material cards)
    BranchNetwork.tsx   Interactive network map (clickable pins + detail)
    MeetYourAdvisor.tsx Named advisor profile cards (availability dot)
    Testimonials.tsx    3 attributed testimonials
    PartnerStrip.tsx    Insurer partners (marquee)
    Faq.tsx             Accessible accordion
    ConceptScreens.tsx  Future-product concept previews (dashboard, claims…)
    CTABand.tsx         Final quote band (material-forest)
    Footer.tsx          Contact + IRDAI-style compliance notice
    Toast.tsx           Lightweight aria-live toaster
    icons.tsx           Inline SVG icon set
    WhyUs.tsx           (legacy, not in current flow)
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
- Vite production build: ~105 kB gzipped JS, ~8 kB gzipped CSS.
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
