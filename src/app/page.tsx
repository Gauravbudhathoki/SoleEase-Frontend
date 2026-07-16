'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[420px] flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,140,60,0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col items-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-500 font-semibold mb-3">
            Limited Edition Drop
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-xl">
            Summer Collection
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="px-6 py-3 rounded-md bg-amber-600 text-white text-sm font-semibold uppercase tracking-wide hover:bg-amber-700 transition-colors"
            >
              Shop the Drop
            </Link>
            <button className="px-6 py-3 rounded-md border border-white/40 text-white text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors">
              Watch Film
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">New Arrivals</h2>
            <p className="text-stone-500 mt-1">Engineered for performance, designed for the street.</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-stone-900 hover:underline whitespace-nowrap">
            View All →
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-stone-500">No products yet — add some from your backend.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial */}
      <section className="max-w-7xl mx-auto w-full px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 aspect-[4/3] md:aspect-auto flex items-end p-8 text-white">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">Born on the Track</h3>
            <p className="mt-2 max-w-sm text-sm text-stone-300">
              Every silhouette we create starts with a performance mandate.
              If it doesn&apos;t excel under pressure, it doesn&apos;t make the cut.
            </p>
            <a href="#" className="mt-3 inline-block text-xs uppercase tracking-widest underline underline-offset-4">
              Our Philosophy
            </a>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-red-900 to-red-950 flex items-end p-5 text-white">
            <span className="relative z-10 text-sm font-semibold uppercase tracking-wide">Precision Craft</span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-teal-900 to-teal-950 flex items-end p-5 text-white">
            <span className="relative z-10 text-sm font-semibold uppercase tracking-wide">Future Ready</span>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-2xl font-bold">Join the Inner Circle</h2>
        <p className="mt-2 text-stone-400 text-sm max-w-md mx-auto">
          Get early access to exclusive drops, limited edition restocks, and
          curated sneaker culture insights delivered weekly.
        </p>
        <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 rounded-md bg-zinc-900 border border-zinc-700 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md bg-white text-black text-sm font-semibold uppercase tracking-wide hover:bg-stone-200 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-xs text-stone-500">
          By signing up, you agree to our Privacy Policy.
        </p>
      </section>

      <Footer />
    </div>
  );
}