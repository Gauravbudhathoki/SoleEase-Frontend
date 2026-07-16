'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/auth';
import { ApiClientError } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      const message = err instanceof ApiClientError ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div className="relative hidden md:flex md:w-1/2 flex-col justify-between text-white overflow-hidden p-10">
        <img
          src="/images/register-hero.png"
          alt="SoleEase performance sneaker"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        <div />

        <div className="relative z-10">
          <span className="text-6xl font-bold text-zinc-700">01</span>
          <h1 className="mt-4 text-3xl font-bold leading-tight">
            ENGINEERED FOR
            <br />
            MOMENTUM
          </h1>
          <p className="mt-4 max-w-xs text-zinc-400 text-sm leading-relaxed">
            Join our elite community of athletes and pioneers. Experience the
            future of performance footwear.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-zinc-500 text-xs tracking-widest uppercase">
          <span className="w-8 h-px bg-zinc-600" />
          Performance Division
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-zinc-900">Join the Movement</h2>
          <p className="mt-2 text-zinc-500">Create your SoleEase account.</p>

          <button
            type="button"
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg border border-zinc-300 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 transition-colors"
          >
            <GoogleIcon />
            Sign Up with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex-1 h-px bg-zinc-200" />
            OR
            <span className="flex-1 h-px bg-zinc-200" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-lg bg-zinc-100 border border-transparent px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg bg-zinc-100 border border-transparent px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-zinc-100 border border-transparent px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-zinc-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-zinc-300"
              />
              <span>
                I agree to the{' '}
                <a href="#" className="font-medium text-zinc-900 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-zinc-900 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && (
              <p className="text-sm text-green-600 font-medium">
                Account created successfully! Redirecting you to login...
              </p>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="mt-2 w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold tracking-wide text-white uppercase hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : success ? 'Success!' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-zinc-900">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.61z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.19l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}