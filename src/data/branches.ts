export interface Branch {
  id: string;
  city: string;
  state: string;
  address: string;
  hours: string;
  services: string[];
  hq?: boolean;
  map: { x: number; y: number };
  pos: string;
}

export const branches: Branch[] = [
  {
    id: "ranchi-hq",
    city: "Ranchi",
    state: "Jharkhand",
    address: "Z Complex, Near Bata Showroom, Tharpakhna, Plaza Chowk, Ranchi 834001",
    hours: "Mon–Sat · 9:30 AM – 6 PM",
    services: ["Motor Insurance", "Health Insurance", "Life Insurance", "Claims Assistance", "Loan Advisory"],
    hq: true,
    map: { x: 52, y: 48 },
    pos: "left-[52%] top-[48%]",
  },
  {
    id: "noida",
    city: "Noida",
    state: "Uttar Pradesh",
    address: "Sector 18, Noida 201301",
    hours: "Mon–Sat · 10 AM – 7 PM",
    services: ["Motor Insurance", "Health Insurance", "Life Insurance", "Commercial Vehicle", "Loan Advisory"],
    map: { x: 15, y: 25 },
    pos: "left-[15%] top-[25%]",
  },
  {
    id: "patna",
    city: "Patna",
    state: "Bihar",
    address: "Fraser Road, Patna 800001",
    hours: "Mon–Sat · 10 AM – 7 PM",
    services: ["Motor Insurance", "Health Insurance", "Life Insurance", "Loan Advisory"],
    map: { x: 28, y: 40 },
    pos: "left-[28%] top-[40%]",
  },
  {
    id: "biharsharif",
    city: "Bihar Sharif",
    state: "Bihar",
    address: "Katra Road, Bihar Sharif 803101",
    hours: "Mon–Sat · 10 AM – 5 PM",
    services: ["Motor Insurance", "Health Insurance"],
    map: { x: 25, y: 50 },
    pos: "left-[25%] top-[50%]",
  },
  {
    id: "jamshedpur",
    city: "Jamshedpur",
    state: "Jharkhand",
    address: "Bistupur, Jamshedpur 831001",
    hours: "Mon–Sat · 10 AM – 6 PM",
    services: ["Motor Insurance", "Health Insurance", "Claims Assistance"],
    map: { x: 65, y: 55 },
    pos: "left-[65%] top-[55%]",
  },
  {
    id: "dhanbad",
    city: "Dhanbad",
    state: "Jharkhand",
    address: "Bank More, Dhanbad 828101",
    hours: "Mon–Sat · 10 AM – 6 PM",
    services: ["Motor Insurance", "Health Insurance", "Commercial Vehicle"],
    map: { x: 62, y: 32 },
    pos: "left-[62%] top-[32%]",
  },
  {
    id: "hazaribagh",
    city: "Hazaribagh",
    state: "Jharkhand",
    address: "Court Road, Hazaribagh 825301",
    hours: "Mon–Sat · 10 AM – 6 PM",
    services: ["Motor Insurance", "Life Insurance", "Claims Assistance"],
    map: { x: 40, y: 38 },
    pos: "left-[40%] top-[38%]",
  },
  {
    id: "ramgarh",
    city: "Ramgarh",
    state: "Jharkhand",
    address: "Main Road, Ramgarh 825101",
    hours: "Mon–Sat · 10 AM – 6 PM",
    services: ["Motor Insurance", "Health Insurance"],
    map: { x: 45, y: 35 },
    pos: "left-[45%] top-[35%]",
  },
  {
    id: "giridih",
    city: "Giridih",
    state: "Jharkhand",
    address: "Main Road, Giridih 815301",
    hours: "Mon–Sat · 10 AM – 5 PM",
    services: ["Motor Insurance", "Health Insurance"],
    map: { x: 55, y: 28 },
    pos: "left-[55%] top-[28%]",
  },
];
