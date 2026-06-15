import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { WaitlistResponse } from './_lib/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method Not Allowed' } satisfies WaitlistResponse);
    return;
  }

  const body = req.body as { email?: string };
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, message: 'Некорректный email' } satisfies WaitlistResponse);
    return;
  }

  // TODO: persist to storage (Vercel KV, Airtable, webhook, etc.)
  console.log(`[waitlist] new signup: ${email}`);

  res.status(200).json({
    ok: true,
    message: 'Вы в листе ожидания — пришлём, когда откроем доступ.',
  } satisfies WaitlistResponse);
}
