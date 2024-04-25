import "./globals.css";

import type { Metadata } from "next";
import { Karla, Roboto_Mono } from "next/font/google";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Reward Ripple Solutions",
  description: "Reward Ripple Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} bg-[#0d0915]`}>{children}</body>
    </html>
  );
}
