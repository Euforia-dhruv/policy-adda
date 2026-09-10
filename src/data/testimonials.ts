export interface Testimonial {
  id: string;
  quote: string;
  clientType: string;
  location: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "One of the best insurance agency. Feel great being the part of Adda Policy Adda.",
    clientType: "Corporate Leader",
    location: "Ranchi",
    initials: "ND",
  },
  {
    id: "t2",
    quote:
      "Great experience, extraordinary customer service. They explained every policy option clearly and helped me choose the right one for my family.",
    clientType: "Entrepreneur",
    location: "Ranchi",
    initials: "MA",
  },
  {
    id: "t3",
    quote:
      "Best insurance agency, it has a great service. When I needed help with my claim, their team was with me every step of the way.",
    clientType: "Doctor",
    location: "Patna",
    initials: "SJ",
  },
];
