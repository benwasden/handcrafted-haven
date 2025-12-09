'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOutForm from './logout';
import { montserrat } from '../fonts';

export default function NavLinks() {
  const { data: session, status } = useSession();

  const userType = session?.user?.usertype;
  const userId = session?.user?.id;

  const closeMenu = () => {
    document.body.classList.remove('mobile-menu-open');
  };

  if (status === "loading") {
    return null;
  }

  return (
    <>
      <div className="nav-links">
      {/* Always-visible links */}
      <Link href="/" onClick={closeMenu}><p>Home</p></Link>
      <Link href="/shop" onClick={closeMenu}><p>Store</p></Link>
      <Link href="/sellers" onClick={closeMenu}><p>Sellers</p></Link>

      {/* Logged-out user */}
      {status === "unauthenticated" && (
        <Link className="login-logout" href="/login" onClick={closeMenu}><p>Login</p></Link>
      )}

      {/* Logged-in seller */}
      {status === "authenticated" && userType === "seller" && (
        <Link href={`/list/${userId}`} onClick={closeMenu}><p>My Items</p></Link>
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