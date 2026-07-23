import type { Context } from '@netlify/functions';
import { getAdminCredentials } from '../lib/store';

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body: { username?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const creds = getAdminCredentials();
  if (body.username === creds.user && body.password === creds.pass) {
    return Response.json({ ok: true });
  }

  return Response.json({ error: 'Invalid credentials' }, { status: 401 });
};
