export type State = 'Jharkhand' | 'Bihar' | 'Uttar Pradesh'

export interface Branch {
  id: string
  city: string
  state: State
  address: string
  hq?: boolean
}

export const hq: Branch = {
  id: 'ranchi-hq',
  city: 'Ranchi (HQ)',
  state: 'Jharkhand',
  address:
    'Z Complex, 1st Floor, Near Bata Showroom, Tharpakhna, Plaza Chowk, Ranchi, Jharkhand – 834001',
  hq: true,
}

export const branches: Branch[] = [
  hq,
  {
    id: 'lalpur',
    city: 'Lalpur',
    state: 'Jharkhand',
    address: 'Lalpur branch desk, Ranchi urban area',
  },
  {
    id: 'ramgarh',
    city: 'Ramgarh',
    state: 'Jharkhand',
    address: 'Ramgarh town branch desk',
  },
  {
    id: 'hazaribagh',
    city: 'Hazaribagh',
    state: 'Jharkhand',
    address: 'Hazaribagh town branch desk',
  },
  {
    id: 'giridih',
    city: 'Giridih',
    state: 'Jharkhand',
    address: 'Giridih town branch desk',
  },
  {
    id: 'dhanbad',
    city: 'Dhanbad',
    state: 'Jharkhand',
    address: 'Dhanbad city branch desk',
  },
  {
    id: 'jamshedpur',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    address: 'Jamshedpur (Tatanagar) branch desk',
  },
  {
    id: 'patna',
    city: 'Patna',
    state: 'Bihar',
    address: 'Patna city branch desk',
  },
  {
    id: 'biharsharif',
    city: 'Biharsharif',
    state: 'Bihar',
    address: 'Biharsharif town branch desk',
  },
  {
    id: 'noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    address: 'Noida (NCR) branch desk',
  },
]
