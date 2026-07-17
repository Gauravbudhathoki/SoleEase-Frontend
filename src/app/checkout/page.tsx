'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getCart } from '@/lib/cart';
import { createOrder } from '@/lib/orders';
import { ApiClientError } from '@/lib/api';
import { Cart } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TAX_RATE = 0.08;

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Nepal');
  const [paymentMethod, setPaymentMethod] = useState<'cod'>('cod');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFullName(user.name || '');
      setEmail(user.email || '');
    }

    getCart()
      .then(setCart)
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  }, [router]);

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setPlacing(true);

    try {
      const order = await createOrder({
        fullName,
        phone,
        street,
        city,
        state,
        postalCode,
        country,
      });
      router.push(`/orders/${order._id}`);
    } catch (err) {
      const msg = err instanceof ApiClientError ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Loading checkout...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-900">Checkout</h1>
          <span className="text-sm text-stone-500">{items.length} items in cart</span>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6"
        >
          {/* Left: form steps */}
          <div className="flex flex-col gap-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center">1</span>
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Street address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="sm:col-span-2 border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                />
                <input
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                />
                <input
                  required
                  placeholder="State / Province"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                />
                <input
                  required
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                />
                <input
                  required
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center">2</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-stone-500 mb-1">Full Name</label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-stone-500 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase text-stone-500 mb-1">Phone Number</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full border border-stone-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center">3</span>
                Payment Method
              </h2>
              <label className="flex items-start gap-3 border border-stone-900 rounded-lg p-4 cursor-pointer bg-stone-50">
                <input
                  type="radio"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-stone-900 text-sm">Cash on Delivery</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Pay when your sneakers arrive at your doorstep.
                  </p>
                </div>
              </label>
              <p className="text-xs text-stone-400 mt-3">
                More payment options (card, eSewa) coming soon.
              </p>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 h-fit">
            <h2 className="font-bold text-stone-900 mb-4">Order Summary</h2>

            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.product._id}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-stone-100 shrink-0">
                    {item.product.images[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-stone-900">{item.product.name}</p>
                    <p className="text-xs text-stone-500">
                      Size {item.size} | {item.color}
                    </p>
                    <p className="font-semibold text-stone-900 text-sm mt-0.5">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-sm mt-4 pt-4 border-t border-stone-200">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-200">
              <span className="font-semibold text-stone-900">Total</span>
              <span className="text-xl font-bold text-stone-900">${total.toFixed(2)}</span>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={placing || items.length === 0}
              className="mt-6 w-full bg-stone-900 text-white py-3 rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              {placing ? 'Placing Order...' : 'Place Order →'}
            </button>

            <p className="text-xs text-stone-400 mt-3 text-center">
              By placing this order, you agree to our Terms of Service and Return Policy.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}