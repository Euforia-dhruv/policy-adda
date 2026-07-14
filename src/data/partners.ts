export const partners: string[] = [
  'HDFC ERGO',
  'ICICI Lombard',
  'TATA AIG',
  'Bajaj Allianz',
  'Star Health',
  'Care Health',
  'Niva Bupa',
  'SBI General',
  'Future Generali',
  'IFFCO Tokio',
  'Liberty General',
  'Chola MS',
  'Universal Sompo',
  'Royal Sundaram',
]

export interface LoanType {
  id: string
  name: string
}

export const loans: LoanType[] = [
  { id: 'personal', name: 'Personal Loan' },
  { id: 'home', name: 'Home Loan' },
  { id: 'business', name: 'Business Loan' },
  { id: 'car', name: 'Car Loan' },
  { id: 'bike', name: 'Bike Loan' },
  { id: 'gold', name: 'Gold Loan' },
]
