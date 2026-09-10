import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-lyon-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Policy Adda — Policy Aapka, Adda Apna",
  description:
    "Policy Adda — your neighbourhood insurance & loan consultancy in Ranchi, Jharkhand. Named advisors, real branch desks, hands-on claims follow-through.",
  keywords: [
    "insurance",
    "loan",
    "Ranchi",
    "Jharkhand",
    "Bihar",
    "car insurance",
    "health insurance",
    "life insurance",
    "Policy Adda",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${robotoMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-canvas text-ash font-sans">
        {children}
      </body>
    </html>
  );
}
