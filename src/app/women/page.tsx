'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const ALL_CATEGORIES = ['Performance', 'Lifestyle', 'Sandals'];
const ALL_SIZES = [5, 6, 7, 8, 9, 10, 11];
const ALL_COLORS = ['black', 'white', 'pink', 'orange', 'grey', 'tan'];

const COLOR_SWATCH: Record<string, string> = {
  black: '#18181b',
  white: '#f4f4f5',
  pink: '#f4a6b7',
  orange: '#ea580c',
  grey: '#71717a',
  tan: '#c9a876',
};

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.filter((p) => p.category === 'women')))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (selectedSize !== null) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }
    if (selectedColor !== null) {
      result = result.filter((p) => p.colors.includes(selectedColor));
    }

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'newest')
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return result;
  }, [products, selectedSize, selectedColor, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleCategory = (cat: string) => {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSize(null);
    setSelectedColor(null);
    setMinPrice(0);
    setMaxPrice(500);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
        <p className="text-sm text-stone-500 mb-2">
          <Link href="/" className="hover:text-stone-900">Home</Link> / Women&apos;s Collection
        </p>
        <h1 className="text-3xl font-bold text-stone-900">Women&apos;s Collection</h1>
        <p className="text-stone-500 mt-1 max-w-xl">
          Discover engineered precision and athletic elegance. From performance-grade
          runners to architectural lifestyle silhouettes.
        </p>

        <div className="flex justify-end mt-4">
          <label className="flex items-center gap-2 text-sm text-stone-600">
            Sort By:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="font-medium text-stone-900 bg-transparent focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 border-t border-stone-200 pt-6">
          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            <div>
              <h3 className="font-semibold text-stone-900 mb-3">Category</h3>
              <div className="flex flex-col gap-2">
                {ALL_CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-stone-300"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-3">Size (US)</h3>
              <div className="grid grid-cols-3 gap-2">
                {ALL_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setPage(1);
                      setSelectedSize((prev) => (prev === size ? null : size));
                    }}
                    className={`py-1.5 rounded-md border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'border-stone-300 text-stone-700 hover:border-stone-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-3">Color</h3>
              <div className="flex gap-2 flex-wrap">
                {ALL_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setPage(1);
                      setSelectedColor((prev) => (prev === color ? null : color));
                    }}
                    aria-label={color}
                    style={{ backgroundColor: COLOR_SWATCH[color] }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === color
                        ? 'border-amber-600 scale-110'
                        : 'border-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-3">Price Range</h3>
              <div className="flex items-center justify-between text-sm text-stone-600 mb-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-16 border border-stone-300 rounded px-1 py-0.5 text-xs"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-16 border border-stone-300 rounded px-1 py-0.5 text-xs"
                />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="border border-stone-300 rounded-md py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product grid */}
          <div>
            {loading ? (
              <p className="text-stone-500">Loading products...</p>
            ) : paginated.length === 0 ? (
              <p className="text-stone-500">No products match your filters.</p>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-9 h-9 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 disabled:opacity-40"
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-md border text-sm font-medium ${
                          page === p
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'border-stone-300 text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-9 h-9 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 disabled:opacity-40"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}