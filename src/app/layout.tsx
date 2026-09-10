import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-canvas text-ivory font-sans">
        {children}
      </body>
    </html>
  );
}
