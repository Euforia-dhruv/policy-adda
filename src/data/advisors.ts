export interface Advisor {
  id: string;
  name: string;
  initials: string;
  role: string;
  specialization: string;
  experience: string;
  languages: string[];
  city: string;
  accent: string;
}

export const advisors: Advisor[] = [
  {
    id: "gaurav-jayswal",
    name: "Gaurav Jayswal",
    initials: "GJ",
    role: "Founder & Director",
    specialization: "All Insurance & Loans",
    experience: "7+ years",
    languages: ["Hindi", "English"],
    city: "Ranchi",
    accent: "from-iris-gleam to-iris-gleam/70",
  },
];
