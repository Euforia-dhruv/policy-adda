# Policy Adda — Marketing Website Prototype

A responsive marketing site prototype for **Policy Adda**, an insurance & loan
consultancy based in Ranchi, Jharkhand. It positions the brand as the human,
local, relationship-driven alternative to national insurance marketplaces like
Policybazaar.

> Tagline: **"Policy Aapka, Adda Apna."**

## Stack

- **Vite + React + TypeScript** — fast dev server, typed components
- **Tailwind CSS** — utility-first styling with a custom theme
- **No backend** — every form submission is mocked: it `console.log`s the
  payload and shows a toast confirmation. See `src/components/QuoteForm.tsx`
  and `src/components/Toast.tsx`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run lint       # tsc --noEmit
```

## Design rationale — the "adda" visual identity

A generic insurance portal leans on cold corporate blue, stock photos of
handshakes, and price-comparison tables. Policy Adda cannot out-marketplace
Policybazaar on scale, so the design makes the opposite choice on purpose: it
feels like a **trusted local gathering place** — a chai-adda where money
matters get talked through face to face.

The identity is built on three deliberate decisions:

1. **Limited, warm palette instead of insurance blue.**
   A *khadi-paper* cream (`#FBF6EE`) background, deep espresso *ink*
   (`#211B16`), and a single warm *terracotta* accent (`#C2492B`) with an
   *ocher* (`#E0A458`) and muted *sage* (`#5C7A6B`) for support. Terracotta is
   Indian, human and unmistakably non-corporate — it reads as warmth and trust,
   not a call-centre.

2. **An editorial type pairing.**
   **Fraunces** (a soft, characterful serif with optical sizing) for headings
   gives the site a neighbourhood, word-of-mouth personality, paired with
   **Inter** for clean, legible body copy. The contrast between a "human"
   display serif and a neutral grotesque mirrors the product's promise: warmth
   plus competence.

3. **One signature motif: the conversation bubble + dashed "local map".**
   The logo is a speech bubble (the *adda* = a place you talk), and section
   eyebrows use a hand-drawn dashed rule. The motif repeats the core idea —
   real conversation, real places — without resorting to stock imagery.

Accessibility is built in: a skip link, semantic landmarks, visible
focus rings, labelled form fields with inline validation, `aria-live` toasts,
and a `prefers-reduced-motion` block that disables animation and smooth scroll.

## Positioning: "adda" vs "marketplace"

Policybazaar's strength is scale and price comparison — a self-serve national
marketplace. Policy Adda cannot win that game, so the site never tries to.
Instead it leans into the opposite of a faceless portal: a **named advisor you
can walk in and meet, a real branch desk in your city, and someone who stays
with you through the claim.** Every section is engineered around that contrast.
The hero leads with "a person, not a portal"; the differentiator cards put
"Marketplace vs Adda" side by side; the branch network shows ten real desks
with the Ranchi HQ visually distinct; testimonials are attributed to plausible
client *types* (a fleet owner, a professional with ageing parents) rather than
anonymised quotes. The message is consistent: we compare prices too, but the
relationship — not the transaction — is the product.

## Project structure

```
src/
  components/
    Nav.tsx          Sticky, responsive, keyboard-accessible nav + mobile menu
    Hero.tsx         Headline + quote form
    QuoteForm.tsx    Insurance type / name / mobile / branch, mocked submit
    WhyUs.tsx        3 "Marketplace vs Adda" contrast cards (dark section)
    ProductGrid.tsx  8 insurance product cards
    LoansStrip.tsx   Compact chip list of 6 loan types
    Process.tsx      4-step process (enquire → compare → decide → renew/claim)
    BranchNetwork.tsx 10 real locations, HQ distinct
    Testimonials.tsx  3 attributed testimonials
    PartnerStrip.tsx  Insurer partner chip list
    CTABand.tsx       Final quote band with contact
    Footer.tsx        Contacts + IRDAI-style "beware of spurious calls" notice
    Toast.tsx         Lightweight toast provider
    icons.tsx         Inline SVG icon set
  data/
    products.ts     8 insurance products (real, specific copy)
    branches.ts     10 branch offices (real addresses)
    partners.ts      Insurer partners + loan types
    testimonials.ts 3 testimonials
  App.tsx
  index.css         Tailwind layers, focus styles, reduced-motion
```

All copy is real and specific to Policy Adda — no lorem ipsum, no invented
stats or logos. Business facts (since 2018, 10 branches, 20+ insurer partners,
contact details, HQ address) come from the provided brief.

## Next steps: connecting a real backend

The forms currently mock submission. To go live:

1. **API contract.** POST the `QuoteForm` payload (already shaped in
   `onSubmit`) to an endpoint such as `POST /api/enquiries`. Keep the same
   field names (`product`, `name`, `mobile`, `branch`).
2. **Validation & spam.** Move the mobile/required checks server-side, add a
   CAPTCHA or OTP on the mobile number, and rate-limit submissions.
3. **CRM / ticketing.** Pipe enquiries into a CRM (e.g. Zoho, HubSpot) or a
   Google Sheet / Airtable so the nearest branch desk gets notified within one
   working day, matching the copy's promise.
4. **Quote integration.** For real comparison, integrate insurer quotation
   APIs (most partners expose distributor APIs) behind a server proxy so keys
   never reach the browser.
5. **Compliance.** Replace the prototype IRDAI notice placeholder with the
   firm's actual IRDAI registration number and a verified SMS sender ID;
   display the registration certificate in the footer.
6. **Analytics.** Add consent-based event tracking on form starts/completes
   and branch-page views to measure which desks convert.
```
