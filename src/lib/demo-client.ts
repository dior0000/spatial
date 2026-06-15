// Client-side API wrapper — keeps fetch logic out of components.
// Swappable for a Telegram Mini App transport without touching component code.

import type { SpatialDemoResponse, WaitlistRequest, WaitlistResponse } from './types';

export async function submitSpatialDemo(query: string): Promise<SpatialDemoResponse> {
  const res = await fetch('/api/spatial-demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Demo API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<SpatialDemoResponse>;
}

export async function submitWaitlist(data: WaitlistRequest): Promise<WaitlistResponse> {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json() as WaitlistResponse;
  if (!res.ok) throw new Error(json.message || 'Ошибка сервера');
  return json;
}
