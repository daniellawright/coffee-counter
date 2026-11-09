import type { Metadata } from "next";
import { Schibsted_Grotesk, Spline_Sans_Mono, Young_Serif } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-mono",
  display: "swap",
});
const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "CoffeeCounter — Every cup counts!", template: "%s · CoffeeCounter" },
  description:
    "Turn your coffee shop's sales data into meaningful insights. Understand your customers, track performance, and make smarter business decisions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${splineMono.variable} ${youngSerif.variable}`}>
      <body className="min-h-screen bg-white font-sans text-espresso">
        <a href="#main-content" className="sr-only fixed top-2 left-2 z-50 rounded bg-white px-4 py-2 text-espresso focus:not-sr-only">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
