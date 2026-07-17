'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getOrderById } from '@/lib/orders';
import { Order } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/format';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(orderId)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Loading order...
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Order not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="max-w-2xl mx-auto w-full px-6 py-16 flex-1 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mt-6">Order Placed Successfully!</h1>
        <p className="text-stone-500 mt-2">
          Thank you, {order.shippingAddress.fullName}. Your order is being processed.
        </p>

        <div className="mt-8 bg-white rounded-xl border border-stone-200 p-6 text-left">
          <div className="flex justify-between text-sm text-stone-500 mb-4">
            <span>Order ID</span>
            <span className="font-mono text-stone-900">{order._id}</span>
          </div>

          <div className="flex flex-col gap-3 border-t border-stone-200 pt-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-stone-700">
                  {item.name} × {item.quantity} (Size {item.size}, {item.color})
                </span>
                <span className="font-medium text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-200">
            <span className="font-semibold text-stone-900">Total Paid</span>
            <span className="text-xl font-bold text-stone-900">
              {formatPrice(order.totalPrice)}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200 text-sm text-stone-600">
            <p className="font-medium text-stone-900 mb-1">Shipping to:</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-block mt-8 px-6 py-3 rounded-md bg-stone-900 text-white text-sm font-semibold uppercase tracking-wide hover:bg-stone-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </main>

      <Footer />
    </div>
  );
}