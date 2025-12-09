'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOutForm from './logout';
import { montserrat } from '../fonts';

export default function NavLinks() {
  const { data: session, status } = useSession();

  const userType = session?.user?.usertype;
  const userId = session?.user?.id;

  // console.log("SESSION", session);
  // console.log("USERTYPE", session?.user?.usertype);
  // console.log("USER", session?.user?.id);

  if (status === "loading") {
    return null;
  }

  return (
    <>
      <div className="nav-links">
      {/* Always-visible links */}
      <Link href="/"><p>Home</p></Link>
      <Link href="/shop"><p>Store</p></Link>
      <Link href="/sellers"><p>Sellers</p></Link>

      {/* Logged-out user */}
      {status === "unauthenticated" && (
        // <Link className="login-logout" href="/login"><p>Login</p></Link>
        <form className="login-logout" action="/login">
          <button className={montserrat.className}>Sign In</button>
        </form>
      )}

      {/* Logged-in seller */}
      {status === "authenticated" && userType === "seller" && (
        <Link href={`/list/${userId}`}><p>My Items</p></Link>
      )}

      {status === "authenticated" && (
        <form className="login-logout" action={SignOutForm}>
          <button className={montserrat.className}>Sign Out</button>
        </form>
      )}
      </div>
    </>
  );
}