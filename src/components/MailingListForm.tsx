'use client';

import { useState, useTransition } from 'react';
import { subscribeToMailingList } from '@/app/actions/mailing-list';

export function MailingListForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await subscribeToMailingList(formData);
      if (result?.error) {
        setStatus('error');
        setMessage(result.error);
      } else {
        setStatus('success');
      }
    });
  }

  if (status === 'success') {
    return (
      <p className="mt-4 text-sm text-starlight">
        You&apos;re on the list. Welcome aboard! 🚀
      </p>
    );
  }

  return (
    <>
      <form action={handleSubmit} className="mt-4 flex gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className="h-10 w-full min-w-0 flex-1 border border-titanium/40 bg-transparent px-3.5 text-sm text-starlight placeholder:text-titanium outline-none transition-colors focus:border-supernova/70"
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-10 shrink-0 bg-tartan px-5 text-sm font-bold uppercase tracking-wider text-starlight transition-colors hover:bg-supernova disabled:opacity-60"
        >
          {isPending ? '...' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-supernova">{message}</p>
      )}
    </>
  );
}
