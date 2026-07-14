export type State = 'Jharkhand' | 'Bihar' | 'Uttar Pradesh'

export interface Branch {
  id: string
  city: string
  state: State
  address: string
  hq?: boolean
  /** Position on the stylised network map (0–100 grid, west→east / north→south). */
  map: { x: number; y: number }
  /** Tailwind arbitrary position class matching `map` (kept literal for the JIT). */
  pos: string
  services: string[]
  hours: string
}

export const hq: Branch = {
  id: 'ranchi-hq',
  city: 'Ranchi',
  state: 'Jharkhand',
  address:
    'Z Complex, 1st Floor, Near Bata Showroom, Tharpakhna, Plaza Chowk, Ranchi, Jharkhand – 834001',
  hq: true,
  map: { x: 60, y: 64 },
  pos: 'left-[60%] top-[64%]',
  services: [
    'Insurance & loan consultancy',
    'Dedicated claims desk',
    'Renewals & servicing',
    'Advisor meetups',
  ],
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
}

export const branches: Branch[] = [
  hq,
  {
    id: 'lalpur',
    city: 'Lalpur',
    state: 'Jharkhand',
    address: 'Lalpur branch desk, Ranchi urban area',
    map: { x: 59.5, y: 65 },
    pos: 'left-[59.5%] top-[65%]',
    services: ['Insurance consultancy', 'Loan assistance', 'Claims support'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'ramgarh',
    city: 'Ramgarh',
    state: 'Jharkhand',
    address: 'Ramgarh town branch desk',
    map: { x: 60.5, y: 61 },
    pos: 'left-[60.5%] top-[61%]',
    services: ['Insurance consultancy', 'Motor & health', 'Renewals'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'hazaribagh',
    city: 'Hazaribagh',
    state: 'Jharkhand',
    address: 'Hazaribagh town branch desk',
    map: { x: 61, y: 58.5 },
    pos: 'left-[61%] top-[58.5%]',
    services: ['Insurance consultancy', 'Loan assistance', 'Claims support'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'giridih',
    city: 'Giridih',
    state: 'Jharkhand',
    address: 'Giridih town branch desk',
    map: { x: 62.5, y: 61 },
    pos: 'left-[62.5%] top-[61%]',
    services: ['Insurance consultancy', 'Motor & health', 'Renewals'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'dhanbad',
    city: 'Dhanbad',
    state: 'Jharkhand',
    address: 'Dhanbad city branch desk',
    map: { x: 63, y: 60.5 },
    pos: 'left-[63%] top-[60.5%]',
    services: ['Insurance & fleet covers', 'Business loans', 'Claims desk'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'jamshedpur',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    address: 'Jamshedpur (Tatanagar) branch desk',
    map: { x: 64.5, y: 65 },
    pos: 'left-[64.5%] top-[65%]',
    services: ['Insurance consultancy', 'Group health', 'Loan assistance'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'patna',
    city: 'Patna',
    state: 'Bihar',
    address: 'Patna city branch desk',
    map: { x: 63, y: 52 },
    pos: 'left-[63%] top-[52%]',
    services: ['Insurance consultancy', 'Home & personal loans', 'Claims support'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'biharsharif',
    city: 'Biharsharif',
    state: 'Bihar',
    address: 'Biharsharif town branch desk',
    map: { x: 64, y: 55 },
    pos: 'left-[64%] top-[55%]',
    services: ['Insurance consultancy', 'Motor & health', 'Renewals'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
  {
    id: 'noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    address: 'Noida (NCR) branch desk',
    map: { x: 58, y: 36 },
    pos: 'left-[58%] top-[36%]',
    services: ['Insurance consultancy', 'Corporate group covers', 'Advisor desk'],
    hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  },
]
