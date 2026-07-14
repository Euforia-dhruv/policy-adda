export interface Testimonial {
  id: string
  quote: string
  clientType: string
  location: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'My car claim after the Giridih road accident was settled in nine days. The same person who sold me the policy followed up with the insurer on my behalf — I never had to chase a call centre.',
    clientType: 'Car owner & small businessman',
    location: 'Giridih',
    initials: 'RK',
  },
  {
    id: 't2',
    quote:
      'We took a family floater for my parents and me. The advisor sat with us in the Lalpur office and explained exactly what each plan excluded. No pressure, just clear answers in Hindi.',
    clientType: 'Working professional with ageing parents',
    location: 'Ranchi',
    initials: 'SP',
  },
  {
    id: 't3',
    quote:
      'As a fleet owner with six goods carriers, I needed someone who understood downtime. Policy Adda renewed all vehicles in one visit and helped with a commercial claim that kept us running.',
    clientType: 'Transport fleet owner',
    location: 'Dhanbad',
    initials: 'MS',
  },
]
