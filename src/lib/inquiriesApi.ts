import { DateSelection } from '../types';

export interface InquiryPayload extends DateSelection {
  locationName: string;
  locationAddress?: string;
}

export interface InquiryRecord extends InquiryPayload {
  id: string;
  createdAt: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryRecord> {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save inquiry');
  }
  return res.json();
}

export function adminAuthHeader(username: string, password: string): string {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.ok;
}

export async function fetchInquiries(username: string, password: string): Promise<InquiryRecord[]> {
  const res = await fetch('/api/inquiries', {
    headers: { Authorization: adminAuthHeader(username, password) },
  });
  if (!res.ok) {
    throw new Error('Failed to load inquiries');
  }
  return res.json();
}
