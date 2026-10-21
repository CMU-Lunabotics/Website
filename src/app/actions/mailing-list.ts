'use server';

import { z } from 'zod';
import {
  INTEREST_FORM_RESPONSE_URL,
  INTEREST_FORM_ENTRY_FULL_NAME,
  buildInterestFormPrefillUrl,
  getInterestFormEntryEmail,
} from '@/lib/google-interest-form';

const cmuEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Enter a valid email address.')
  .refine(
    (value) => value.endsWith('@andrew.cmu.edu') || value.endsWith('@cmu.edu'),
    'Use your CMU email (@andrew.cmu.edu or @cmu.edu).'
  );

const signupSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  email: cmuEmailSchema,
});

export async function subscribeToMailingList(formData: FormData) {
  const parsed = signupSchema.safeParse({
    fullName: formData.get('fullName'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { error: first ?? 'Check your name and email.' };
  }

  const { fullName, email } = parsed.data;
  const emailEntry = getInterestFormEntryEmail();

  const body = new URLSearchParams();
  if (emailEntry) {
    body.set(`entry.${INTEREST_FORM_ENTRY_FULL_NAME}`, fullName);
    body.set(`entry.${emailEntry}`, email);
  } else {
    // Until GOOGLE_INTEREST_FORM_ENTRY_EMAIL is set, store both in the name answer.
    body.set(`entry.${INTEREST_FORM_ENTRY_FULL_NAME}`, `${fullName} (${email})`);
  }

  try {
    const response = await fetch(INTEREST_FORM_RESPONSE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'manual',
    });

    const ok =
      response.status === 200 ||
      response.status === 302 ||
      response.status === 303 ||
      response.status === 0;

    if (ok) {
      return { success: true as const };
    }
  } catch {
    // fall through to prefill fallback
  }

  return {
    success: true as const,
    openUrl: buildInterestFormPrefillUrl(fullName, email),
    usedFallback: true as const,
  };
}
