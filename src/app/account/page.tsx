'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMyOrders } from '@/lib/orders';
import { getProducts } from '@/lib/products';
import { formatPrice } from '@/lib/format';
import { Order, Product, User } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STATUS_LABEL: Record<Order['status'], string> = {
  pending: 'Pending',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLOR: Record<Order['status'], string> = {
  pending: 'bg-amber-100 text-amber-700',
  paid: 'bg-blue-100 text-blue-700',
  shipped: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    Promise.all([getMyOrders(), getProducts()])
      .then(([ordersData, productsData]) => {
        setOrders(ordersData);
        setRecommended(productsData.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const uniqueAddresses = Array.from(
    new Map(
      orders.map((o) => [
        `${o.shippingAddress.street}-${o.shippingAddress.city}`,
        o.shippingAddress,
      ])
    ).values()
  ).slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-stone-500">
          Loading your account...
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
          <div>
            <h1 className="text-2xl font-bold text-stone-900">
              Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-stone-500 mt-1">Your central hub for everything SoleEase.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
          >
            ⎋ Logout
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-xl border border-stone-200 p-4 h-fit">
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-stone-200">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-semibold">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-stone-900 text-sm">{user?.name}</p>
                <p className="text-xs text-stone-400">Member since 2026</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1 text-sm">
              <span className="px-3 py-2 rounded-md bg-stone-900 text-white font-medium">
                My Orders
              </span>
              <span className="px-3 py-2 rounded-md text-stone-500 cursor-not-allowed">
                Wishlist
              </span>
              <span className="px-3 py-2 rounded-md text-stone-500 cursor-not-allowed">
                Addresses
              </span>
              <span className="px-3 py-2 rounded-md text-stone-500 cursor-not-allowed">
                Payment Methods
              </span>
              <span className="px-3 py-2 rounded-md text-stone-500 cursor-not-allowed">
                Help Center
              </span>
              <span className="px-3 py-2 rounded-md text-stone-500 cursor-not-allowed">
                Account Settings
              </span>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex flex-col gap-6">
            {/* My Orders */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="font-bold text-stone-900 mb-4">My Orders</h2>

              {orders.length === 0 ? (
                <p className="text-sm text-stone-500">
                  No orders yet.{' '}
                  <Link href="/products" className="underline font-medium text-stone-900">
                    Start shopping
                  </Link>
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="flex gap-4 border border-stone-100 rounded-lg p-4"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-stone-100 shrink-0" />

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[order.status]}`}
                            >
                              {STATUS_LABEL[order.status]}
                            </span>
                            <p className="font-medium text-stone-900 text-sm mt-1">
                              {order.items[0]?.name}
                              {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                            </p>
                            <p className="text-xs text-stone-400 mt-0.5">
                              Purchased {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-stone-900">
                              {formatPrice(order.totalPrice)}
                            </p>
                            <p className="text-xs text-stone-400">
                              Qty {order.items.reduce((s, i) => s + i.quantity, 0)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Link
                            href={`/orders/${order._id}`}
                            className="px-3 py-1.5 rounded-md bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors"
                          >
                            Order Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-stone-900">Saved Addresses</h2>
                <Link href="/checkout" className="text-sm font-medium text-stone-900 hover:underline">
                  + Add New
                </Link>
              </div>

              {uniqueAddresses.length === 0 ? (
                <p className="text-sm text-stone-500">
                  No saved addresses yet — they&apos;ll appear here after your first order.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {uniqueAddresses.map((addr, i) => (
                    <div key={i} className="border border-stone-200 rounded-lg p-4 text-sm">
                      <p className="font-medium text-stone-900">{addr.fullName}</p>
                      <p className="text-stone-500 mt-1">{addr.street}</p>
                      <p className="text-stone-500">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-stone-500">{addr.country}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Picks */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-amber-700 font-semibold">
                    Personalized For You
                  </span>
                  <h2 className="font-bold text-stone-900">Recommended Picks</h2>
                </div>
                <Link href="/products" className="text-sm font-medium text-stone-900 hover:underline">
                  View More →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recommended.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-stone-100">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                          No image
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-stone-900 mt-2">{product.name}</p>
                    <p className="text-sm text-stone-500">{formatPrice(product.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}