import type { Metadata } from "next";
import { Funnel_Display, Montserrat } from "next/font/google";
import "./ui/globals.css";
import SideNav from "./ui/header/sidenav";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: 'The virtual marketplace for talented creators and customers.',
};

const funDisplay = Funnel_Display({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funDisplay.variable} ${montserrat.variable}`}>
        <SideNav />
        {children}
      </body>
    </html>
  );
}
