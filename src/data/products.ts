import type { IconName } from '../components/icons'

export interface Product {
  id: string
  name: string
  icon: IconName
  tagline: string
  description: string
  who: string
  benefits: string[]
}

export const products: Product[] = [
  {
    id: 'car',
    name: 'Car Insurance',
    icon: 'car',
    tagline: 'Four-wheeler cover, settled with a known advisor',
    description:
      'Third-party and comprehensive plans from HDFC ERGO, ICICI Lombard and TATA AIG, with add-ons like zero-depreciation and roadside assistance picked to suit how you actually drive.',
    who: 'New and used car owners across Jharkhand & Bihar',
    benefits: ['Zero-dep & roadside add-ons', 'Instant renewal', 'Claim chased by your desk'],
  },
  {
    id: 'bike',
    name: 'Bike Insurance',
    icon: 'bike',
    tagline: 'Two-wheeler cover without the call-centre maze',
    description:
      'Quick, low-cost two-wheeler policies with instant renewals and claims handled by the same desk you walked into — not a toll-free number that drops the call.',
    who: 'Daily commuters and first-time riders',
    benefits: ['Low premia from ₹400/yr', 'Same-day cover', 'Cashless garages nearby'],
  },
  {
    id: 'health',
    name: 'Health Insurance',
    icon: 'health',
    tagline: 'Family health cover, explained in plain Hindi & English',
    description:
      'Individual and floater plans from Star Health, Care Health and Niva Bupa, reviewed line-by-line with you so you know what is covered before a medical emergency, not during one.',
    who: 'Families, parents and young couples',
    benefits: ['Floater & individual', 'Pre-existing clarity', 'Cashless network guidance'],
  },
  {
    id: 'term',
    name: 'Term Life Insurance',
    icon: 'shield',
    tagline: 'Long-horizon protection for the people who depend on you',
    description:
      'High-cover, low-premium term plans with claim-payout guidance, so your family is never left decoding paperwork at the worst possible moment.',
    who: 'Earning members with dependents',
    benefits: ['Cover up to ₹5 cr', 'Return-of-premium options', 'Payout guidance'],
  },
  {
    id: 'travel',
    name: 'Travel Insurance',
    icon: 'plane',
    tagline: 'Trips covered, from Ranchi airport to anywhere',
    description:
      'Single-trip and multi-trip covers for medical, baggage and cancellation risks, arranged the day before you fly with documents emailed straight to your inbox.',
    who: 'Holiday-makers and overseas workers',
    benefits: ['Medical & baggage', 'Trip cancellation', 'Docs in your inbox'],
  },
  {
    id: 'commercial',
    name: 'Commercial Vehicle',
    icon: 'truck',
    tagline: 'Keep your fleet and income moving',
    description:
      'Goods-carrier, passenger and tractor covers with fleet options, built for transporters and small fleet owners who cannot afford a vehicle off the road.',
    who: 'Transporters and fleet owners',
    benefits: ['Fleet discounts', 'Driver cover', 'Fast claim turnaround'],
  },
  {
    id: 'fire',
    name: 'Fire & Business',
    icon: 'fire',
    tagline: 'Shop, godown and factory, protected',
    description:
      'Fire, burglary and business-interruption covers for shops, godowns and small factories, with sums insured set realistically for your stock and machinery.',
    who: 'Shopkeepers and small manufacturers',
    benefits: ['Stock & machinery', 'Burglary cover', 'Interruption loss'],
  },
  {
    id: 'group',
    name: 'Group Health',
    icon: 'group',
    tagline: 'Cover for your whole staff, one relationship',
    description:
      'Group mediclaim for offices, schools and factories, administered through a single point of contact who handles enrolment, additions and claims.',
    who: 'Employers and institutions',
    benefits: ['One point of contact', 'Easy additions', 'Maternity & OPD'],
  },
]
