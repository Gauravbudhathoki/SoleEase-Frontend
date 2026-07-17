'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EsewaFailurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold text-stone-900">Payment Failed</h1>
        <p className="text-stone-500 mt-2">
          Your eSewa payment was not completed. No charge was made.
        </p>
        <Link
          href="/checkout"
          className="mt-6 px-6 py-3 rounded-md bg-stone-900 text-white text-sm font-semibold uppercase tracking-wide hover:bg-stone-800 transition-colors"
        >
          Try Again
        </Link>
      </div>
      <Footer />
    </div>
  );
}
