'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-stone-900">
          SoleEase
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link href="/products?category=men" className="hover:text-stone-900 transition-colors">
            Men
          </Link>
          <Link href="/products?category=women" className="hover:text-stone-900 transition-colors">
            Women
          </Link>
          <Link href="/products" className="hover:text-stone-900 transition-colors">
            Brands
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-stone-500 hover:text-stone-900 transition-colors">
            <SearchIcon />
          </button>
          <Link href="/cart" aria-label="Cart" className="text-stone-500 hover:text-stone-900 transition-colors">
            <CartIcon />
          </Link>
          <Link
            href={user ? '/account' : '/login'}
            aria-label="Account"
            className="text-stone-500 hover:text-stone-900 transition-colors"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}