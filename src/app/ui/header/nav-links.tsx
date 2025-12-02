import Link from 'next/link';
import { signOut } from '@/auth';
import { useSession } from 'next-auth/react';

const signingOut =
  <form action={async () => {
    'use server';
    await signOut({ redirectTo: '/' });
  }}></form>

const links = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/shop' },
  { name: 'Sellers', href: '/sellers' },
  { name: 'Login', href: '/login'},
];

const logIn = { name: 'Login', href: '/login' };

export function addLogin() {
  links.push(logIn);
}

export function loggedInLinks() {
  if (links.includes(logIn)) {
    links.splice(4);
  }
}

export default function NavLinks() {
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
    </>
  );
}