import type { Metadata } from "next";
import { montserrat } from "@/app/ui/fonts";
import "./ui/globals.css";
import SideNav from "./ui/header/sidenav";
import { Providers } from "./providers";
import { auth } from "@/auth"; //added auth helper
import HamburgerMenu from "./ui/header/hamburger-menu";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: 'The virtual marketplace for talented creators and customers.',
};

{/* added async */ } 
export default async function RootLayout({ 
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Providers session={session}>
          <HamburgerMenu />
          <SideNav />
          {children} {/*moved inside Providers */}
        </Providers>
        
      </body>
    </html>
  );
}