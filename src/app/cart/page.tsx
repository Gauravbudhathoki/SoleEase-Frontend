'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, updateCartItem, removeCartItem } from '@/lib/cart';
import { Cart } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TAX_RATE = 0.08;

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    getCart()
      .then(setCart)
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    loadCart();
  }, [router]);

  const handleQuantityChange = async (
    productId: string,
    size: number,
    color: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    const updated = await updateCartItem({ productId, size, color, quantity: newQuantity });
    setCart(updated);
  };

  const handleRemove = async (productId: string, size: number, color: string) => {
    const updated = await removeCartItem({ productId, size, color });
    setCart(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Loading cart...
        </div>
        <Footer />
      </div>
    );
  }

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">
        <h1 className="text-3xl font-bold text-stone-900">Your Cart</h1>
        <p className="text-stone-500 mt-1">Items are reserved for 60 minutes.</p>

        {items.length === 0 ? (
          <p className="mt-10 text-stone-500">
            Your cart is empty.{' '}
            <a href="/products" className="underline font-medium text-stone-900">
              Browse products
            </a>
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}-${item.color}`}
                  className="bg-white rounded-xl border border-stone-200 p-4 flex gap-4"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-stone-900 uppercase text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.product.brand} / {item.product.category}
                        </p>
                      </div>
                      <span className="font-semibold text-stone-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-6 mt-2 text-xs text-stone-500">
                      <div>
                        <span className="block uppercase tracking-wide text-[10px] text-stone-400">
                          Size
                        </span>
                        US {item.size}
                      </div>
                      <div>
                        <span className="block uppercase tracking-wide text-[10px] text-stone-400">
                          Color
                        </span>
                        {item.color}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-stone-300 rounded-md">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.product._id, item.size, item.color)}
                        className="text-xs text-stone-500 hover:text-red-600 flex items-center gap-1"
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-6 h-fit">
              <h2 className="font-bold text-stone-900 mb-4">Order Summary</h2>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Taxes</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-200">
                <span className="font-semibold text-stone-900">Total</span>
                <span className="text-xl font-bold text-stone-900">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="mt-6 w-full bg-stone-900 text-white py-3 rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-stone-800 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
