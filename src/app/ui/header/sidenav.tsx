import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <>
    <Link href="/">
          <Image 
            src="/handcrafted-logo.png"
            alt="Handcrafted Haven Logo"
            width={96}
            height={96}
            />
      </Link>
    <div className="sidebar">
      <div className="nav-links">
        <NavLinks />
      </div>
    </div>
    </>
  );
}
