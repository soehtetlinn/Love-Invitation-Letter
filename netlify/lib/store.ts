import { getStore } from '@netlify/blobs';

export interface Inquiry {
  id: string;
  createdAt: string;
  partnerName: string;
  date: string;
  time: string;
  timeCategory: string;
  customTimeStr?: string;
  locationId: string;
  locationName: string;
  locationAddress?: string;
}

const STORE_NAME = 'love-inquiries';
const KEY = 'all';

export async function readInquiries(): Promise<Inquiry[]> {
  const store = getStore(STORE_NAME);
  const data = await store.get(KEY, { type: 'json' });
  return Array.isArray(data) ? (data as Inquiry[]) : [];
}

export async function writeInquiries(items: Inquiry[]): Promise<void> {
  const store = getStore(STORE_NAME);
  await store.setJSON(KEY, items);
}

export function getAdminCredentials() {
  return {
    user: process.env.ADMIN_USER || 'admin',
    pass: process.env.ADMIN_PASS || 'admin',
  };
}

export function isAdminAuthorized(authHeader: string | null): boolean {
  if (!authHeader?.startsWith('Basic ')) return false;
  try {
    const decoded = atob(authHeader.slice(6));
    const [user, pass] = decoded.split(':');
    const creds = getAdminCredentials();
    return user === creds.user && pass === creds.pass;
  } catch {
    return false;
  }
}
