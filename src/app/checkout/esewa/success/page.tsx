'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEsewaPayment } from '@/lib/payments';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function EsewaSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');

    if (!data) {
      setStatus('error');
      setError('Missing payment data');
      return;
    }

    verifyEsewaPayment(data)
      .then((order) => {
        router.push(`/orders/${order._id}`);
      })
      .catch(() => {
        setStatus('error');
        setError('Could not verify your payment. Please contact support.');
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        {status === 'verifying' ? (
          <p className="text-stone-500">Verifying your eSewa payment...</p>
        ) : (
          <p className="text-red-600">{error}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function EsewaSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EsewaSuccessContent />
    </Suspense>
  );
}
