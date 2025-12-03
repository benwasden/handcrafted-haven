'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className="sidebar">
      <Link href="/">
          <Image 
            src="/logo.png"
            alt="Handcrafted Haven Logo"
            width={96}
            height={96}
            />
      </Link>
      <div className="nav-links">
        <NavLinks />
      </div>
    </div>
  );
}
