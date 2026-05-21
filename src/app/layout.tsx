import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MarineSync | E-Ferry Financial Platform",
  description:
    "MarineSync bridges the gap between inter-island ferry operators and financial institutions through telemetry-backed credit scoring and green subsidy coordination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8f9fc] text-[#0b1c30]">
        {children}
      </body>
    </html>
  );
}
