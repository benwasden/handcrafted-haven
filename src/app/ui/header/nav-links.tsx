'use client';

import Link from 'next/link';
import { signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import { PowerIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/shop' },
  { name: 'Sellers', href: '/sellers' },
  { name: 'Login', href: '/login'},
];

export default function NavLinks() {
  const { data: session, status } = useSession();


  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
      {session?.user?.usertype === 'seller' && (
        <Link href="/list"><p>Login</p></Link>
      )}
    </>
  );
}