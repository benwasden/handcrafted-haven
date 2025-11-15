import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/shop' },
  { name: 'Sellers', href: '/sellers' },
  { name: 'Login', href: '/login' },
];

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