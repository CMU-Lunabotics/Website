/** CMU Moon Miners interest form — https://forms.gle/QYnxBjSj4SBgrcvZA */
export const INTEREST_FORM_ID = '1FAIpQLSeXUVrQvXe9v26iapSmh2P38HVZNvP6voMEwRXkYEFNZpPylg';

export const INTEREST_FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${INTEREST_FORM_ID}/viewform`;

export const INTEREST_FORM_RESPONSE_URL = `https://docs.google.com/forms/d/e/${INTEREST_FORM_ID}/formResponse`;

/** Full Name (First Last) — text entry */
export const INTEREST_FORM_ENTRY_FULL_NAME = '1547160926';

/** Optional short-answer CMU email (set in Vercel when published on the form). */
export function getInterestFormEntryEmail(): string {
  return process.env.GOOGLE_INTEREST_FORM_ENTRY_EMAIL?.trim() ?? '';
}

export function buildInterestFormPrefillUrl(fullName: string, email: string): string {
  const params = new URLSearchParams();
  params.set('usp', 'pp_url');
  params.set(`entry.${INTEREST_FORM_ENTRY_FULL_NAME}`, fullName);
  // Google’s “collect email” question uses emailAddress, not entry.* (see Google Forms prefill docs).
  params.set('emailAddress', email);
  const emailEntry = getInterestFormEntryEmail();
  if (emailEntry) {
    params.set(`entry.${emailEntry}`, email);
  }
  return `${INTEREST_FORM_VIEW_URL}?${params.toString()}`;
}

export function buildInterestFormPostBody(fullName: string, email: string): URLSearchParams {
  const body = new URLSearchParams();
  body.set(`entry.${INTEREST_FORM_ENTRY_FULL_NAME}`, fullName);
  body.set('emailAddress', email);
  const emailEntry = getInterestFormEntryEmail();
  if (emailEntry) {
    body.set(`entry.${emailEntry}`, email);
  }
  return body;
}
