'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import { ApiClientError } from '@/lib/api';
import { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        if (data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = async (redirectToCart: boolean) => {
    if (!product) return;

    if (selectedSize === null) {
      setMessage('Please select a size');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setAdding(true);
    setMessage(null);

    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
        size: selectedSize,
        color: product.colors[0] || 'default',
      });

      if (redirectToCart) {
        router.push('/cart');
      } else {
        setMessage('Added to cart!');
      }
    } catch (err) {
      const msg = err instanceof ApiClientError ? err.message : 'Something went wrong';
      setMessage(msg);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Loading product...
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-5xl mx-auto w-full px-6 py-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-stone-100">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                No image
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2 text-amber-500 text-sm">
              <span>★★★★☆</span>
              <span className="text-stone-400">(124 Reviews)</span>
            </div>

            <p className="mt-4 text-stone-600 leading-relaxed">{product.description}</p>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-700">
                  Select Size (US)
                </span>
                <span className="text-xs text-stone-400 underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-md border text-sm font-medium transition-colors ${
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

            <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-6">
              <div>
                <span className="text-2xl font-bold text-stone-900">
                  ${product.price.toFixed(2)}
                </span>
                <p className="text-xs text-stone-400">Tax included</p>
              </div>
            </div>

            {message && (
              <p className="mt-3 text-sm text-stone-600">{message}</p>
            )}

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAddToCart(false)}
                disabled={adding || product.stock === 0}
                className="flex-1 border border-stone-900 rounded-md py-3 text-sm font-semibold text-stone-900 uppercase hover:bg-stone-100 transition-colors disabled:opacity-50"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                disabled={adding || product.stock === 0}
                className="flex-1 bg-amber-600 rounded-md py-3 text-sm font-semibold text-white uppercase hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}