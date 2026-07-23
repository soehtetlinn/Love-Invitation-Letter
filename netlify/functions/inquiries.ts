import type { Context } from '@netlify/functions';
import {
  Inquiry,
  isAdminAuthorized,
  readInquiries,
  writeInquiries,
} from '../lib/store';

export default async (req: Request, _context: Context) => {
  if (req.method === 'POST') {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!body.date || !body.locationId) {
      return Response.json({ error: 'Missing date or location' }, { status: 400 });
    }

    const inquiry: Inquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      partnerName: String(body.partnerName || 'Unknown'),
      date: String(body.date),
      time: String(body.time || ''),
      timeCategory: String(body.timeCategory || ''),
      customTimeStr: body.customTimeStr ? String(body.customTimeStr) : undefined,
      locationId: String(body.locationId),
      locationName: String(body.locationName || body.locationId),
      locationAddress: body.locationAddress ? String(body.locationAddress) : undefined,
    };

    const items = await readInquiries();
    items.unshift(inquiry);
    await writeInquiries(items);
    return Response.json(inquiry, { status: 201 });
  }

  if (req.method === 'GET') {
    if (!isAdminAuthorized(req.headers.get('authorization'))) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const items = await readInquiries();
    return Response.json(items);
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 });
};
