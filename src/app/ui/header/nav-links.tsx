'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/shop' },
  { name: 'Sellers', href: '/sellers' },
  { name: 'Login', href: '/login'},
];

export default function NavLinks() {
  const { data: session, status } = useSession();

  const userType = session?.user?.usertype;

  console.log("SESSION", session);
  console.log("USERTYPE", session?.user?.usertype);

  if (status === "loading") {
    return null;
  }

  return (
    <>
      {/* Always-visible links */}
      <Link href="/"><p>Home</p></Link>
      <Link href="/shop"><p>Store</p></Link>
      <Link href="/sellers"><p>Sellers</p></Link>

      {/* Logged-out user */}
      {status === "unauthenticated" && (
        <Link href="/login"><p>Login</p></Link>
      )}

      {/* Logged-in buyer
      {status === "authenticated" && userType === "buyer" && (
        <Link href="/buyer-dashboard"><p>Dashboard</p></Link>
      )} */}

      {/* Logged-in seller */}
      {status === "authenticated" && userType === "seller" && (
        <Link href="/list"><p>List</p></Link>
      )}
    </>
  );


  // return (
  //   <>
  //     {links.map((link) => {
  //       return (
  //         <Link
  //           key={link.name}
  //           href={link.href}
  //         >
  //           <p>{link.name}</p>
  //         </Link>
  //       );
  //     })}
  //     {session?.user?.usertype === 'seller' && (
  //       <Link href="/list"><p>Login</p></Link>
  //     )}
  //   </>
  // );
}