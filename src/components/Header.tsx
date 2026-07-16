'use client';

import Link from 'next/link';
import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(search.trim() ? `/products?search=${encodeURIComponent(search)}` : '/products');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-stone-900 whitespace-nowrap">
          SoleEase
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700 whitespace-nowrap">
          <Link href="/men" className="hover:text-stone-900 transition-colors">
            Men
          </Link>
          <Link href="/women" className="hover:text-stone-900 transition-colors">
            Women
          </Link>
          <Link href="/brands" className="hover:text-stone-900 transition-colors">
            Brands
          </Link>
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center flex-1 max-w-xs bg-stone-100 rounded-full px-4 py-2 gap-2"
        >
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sneakers..."
            className="bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none w-full"
          />
        </form>

        <div className="flex items-center gap-5 text-stone-700">
          <button aria-label="Track order" className="hover:text-stone-900 transition-colors">
            <TruckIcon />
          </button>
          <Link href="/cart" aria-label="Cart" className="hover:text-stone-900 transition-colors">
            <CartIcon />
          </Link>
          <Link
            href={user ? '/account' : '/login'}
            aria-label="Account"
            className="hover:text-stone-900 transition-colors"
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400 shrink-0">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
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