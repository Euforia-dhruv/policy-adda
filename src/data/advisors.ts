export interface Advisor {
  id: string
  name: string
  initials: string
  role: string
  specialization: string
  experience: string
  languages: string[]
  city: string
  accent: string
}

export const advisors: Advisor[] = [
  {
    id: 'a1',
    name: 'Priya Sinha',
    initials: 'PS',
    role: 'Senior Insurance Advisor',
    specialization: 'Health & Term Life',
    experience: '9 yrs',
    languages: ['Hindi', 'English'],
    city: 'Ranchi (HQ)',
    accent: 'from-clay to-gold',
  },
  {
    id: 'a2',
    name: 'Ankit Mehta',
    initials: 'AM',
    role: 'Motor & Commercial Advisor',
    specialization: 'Car, Bike & Commercial Vehicle',
    experience: '7 yrs',
    languages: ['Hindi', 'English', 'Bengali'],
    city: 'Jamshedpur',
    accent: 'from-pine to-sage',
  },
  {
    id: 'a3',
    name: 'Rashmi Kumari',
    initials: 'RK',
    role: 'Loans & Wealth Advisor',
    specialization: 'Home, Gold & Business Loans',
    experience: '6 yrs',
    languages: ['Hindi', 'Angika'],
    city: 'Patna',
    accent: 'from-gold to-clay',
  },
  {
    id: 'a4',
    name: 'Sandeep Rao',
    initials: 'SR',
    role: 'Claims Specialist',
    specialization: 'End-to-end Claims Follow-through',
    experience: '11 yrs',
    languages: ['Hindi', 'English', 'Bhojpuri'],
    city: 'Dhanbad',
    accent: 'from-sage to-pine',
  },
]
