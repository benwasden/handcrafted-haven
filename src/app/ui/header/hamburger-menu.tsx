'use client';

import { useState } from 'react';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    document.body.classList.toggle('mobile-menu-open');
    setOpen(!open);
  };

  return (
    <>
      {/* CHANGE THIS LINE ONLY – use mobile-menu-toggle class */}
      <button
        onClick={toggle}
        className={`mobile-menu-toggle ${open ? 'open' : ''}`}
        aria-label="Toggle menu"
      >
        <span></span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => {
            setOpen(false);
            document.body.classList.remove('mobile-menu-open');
          }}
        />
      )}
    </>
  );
}