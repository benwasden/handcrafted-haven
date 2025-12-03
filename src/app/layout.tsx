import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./ui/globals.css";
import SideNav from "./ui/header/sidenav";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: 'The virtual marketplace for talented creators and customers.',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <SideNav />
        </Providers>
        {children}
      </body>
    </html>
  );
}