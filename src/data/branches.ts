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
];
