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
    accent: "from-cobalt to-cobalt/70",
  },
  {
    id: "priya-sinha",
    name: "Priya Sinha",
    initials: "PS",
    role: "Senior Advisor",
    specialization: "Motor & Health Insurance",
    experience: "8 years",
    languages: ["Hindi", "English", "Angika"],
    city: "Ranchi",
    accent: "from-cobalt to-cobalt/70",
  },
  {
    id: "amit-kumar",
    name: "Amit Kumar",
    initials: "AK",
    role: "Life & Health Specialist",
    specialization: "Term Life & Family Floater",
    experience: "6 years",
    languages: ["Hindi", "English", "Bhojpuri"],
    city: "Patna",
    accent: "from-emerald-500 to-emerald-600",
  },
  {
    id: "nehra-rawat",
    name: "Neha Rawat",
    initials: "NR",
    role: "Claims Specialist",
    specialization: "Claims Processing & Settlement",
    experience: "5 years",
    languages: ["Hindi", "English"],
    city: "Jamshedpur",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    initials: "RV",
    role: "Commercial Insurance Advisor",
    specialization: "Commercial Vehicle & Fleet",
    experience: "7 years",
    languages: ["Hindi", "English", "Maithili"],
    city: "Hazaribagh",
    accent: "from-purple-500 to-pink-500",
  },
];
