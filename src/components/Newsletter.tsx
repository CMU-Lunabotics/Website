"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  function validateEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // Placeholder: simulated submit
      await new Promise((res) => setTimeout(res, 700));
      setStatus('success');
      setEmail('');
    } catch (err) {
      setError('Subscription failed. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Left: Heading + description */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-2 text-white">Join our newsletter</h3>
            <p className="text-sm text-white mb-0">Get updates on competitions, builds, and events — delivered monthly.</p>
          </div>

          {/* Right: Form / Success message */}
          <div className="flex-1 flex justify-center md:justify-end">
            {status === 'success' ? (
              <div className="rounded-md bg-emerald-600/20 text-emerald-300 px-4 py-3">Thanks — you’re on the list!</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full sm:w-auto flex-col sm:flex-row gap-3 items-center justify-center">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="you@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn('w-full sm:w-auto min-w-[260px] bg-white/70')}
                  aria-invalid={status === 'error'}
                />
                <Button type="submit" className="bg-[#900043] hover:bg-[#7a0037] text-white h-12 px-6" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </Button>
              </form>
            )}
          </div>

          {error && <p role="alert" className="mt-3 text-sm text-destructive text-center md:text-right w-full">{error}</p>}
        </div>
      </div>
    </section>
  );
}
