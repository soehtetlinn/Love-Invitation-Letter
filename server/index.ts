import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const dataFile = path.join(dataDir, 'inquiries.json');

const PORT = Number(process.env.PORT) || 3001;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin';

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

function ensureStore(): Inquiry[] {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]', 'utf-8');
  }
  try {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStore(items: Inquiry[]) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2), 'utf-8');
}

function isAdminAuthorized(req: express.Request): boolean {
  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) return false;
  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf-8');
    const [user, pass] = decoded.split(':');
    return user === ADMIN_USER && pass === ADMIN_PASS;
  } catch {
    return false;
  }
}

const app = express();
app.use(express.json({ limit: '100kb' }));

app.post('/api/inquiries', (req, res) => {
  const body = req.body ?? {};
  if (!body.date || !body.locationId) {
    res.status(400).json({ error: 'Missing date or location' });
    return;
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

  const items = ensureStore();
  items.unshift(inquiry);
  saveStore(items);
  res.status(201).json(inquiry);
});

app.get('/api/inquiries', (req, res) => {
  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  res.json(ensureStore());
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body ?? {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ ok: true });
    return;
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
