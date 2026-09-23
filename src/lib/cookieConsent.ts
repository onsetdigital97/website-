export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "onset-cookie-consent";

export const defaultConsent: ConsentState = { necessary: true, analytics: false, marketing: false };

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function storeConsent(consent: ConsentState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore storage errors (private mode, blocked storage)
  }
}
