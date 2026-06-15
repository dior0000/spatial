// Vercel serverless function — /api/spatial-demo
// Behaviour:
//   - If LLM_API_KEY is set: lightweight real orchestration via Anthropic tool-use
//   - Otherwise: rich deterministic mock (site must work fully without any keys)

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { SpatialDemoResponse } from '../src/lib/types';
import { getMockForQuery } from '../src/lib/mock-demo';

// ---------------------------------------------------------------------------
// Real orchestration path (Anthropic Messages API + tool use)
// ---------------------------------------------------------------------------
async function runRealOrchestration(query: string): Promise<SpatialDemoResponse> {
  const apiKey = process.env['LLM_API_KEY'] ?? '';
  const model = 'claude-sonnet-4-6'; // latest stable at knowledge cutoff

  // Step 1 — ask model to produce a plan (tool use)
  const planResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system:
        'You are a spatial orchestrator for the CIS region. ' +
        'Respond ONLY with valid JSON matching SpatialDemoResponse schema. ' +
        'Language: Russian for user-facing text, English for technical notes.',
      messages: [
        {
          role: 'user',
          content:
            `Spatial query: "${query}"\n\n` +
            'Return a JSON object with keys: naive, plan, grounding, reconciliation, ' +
            'computation, verification, confidence, answer, sources, flywheel. ' +
            'naive = what a plain LLM would say (with errors). ' +
            'Grounding: use Minsk coordinates. All text in Russian except code/notes.',
        },
      ],
    }),
  });

  if (!planResponse.ok) throw new Error(`Anthropic API ${planResponse.status}`);

  const data = await planResponse.json() as {
    content: Array<{ type: string; text?: string }>;
  };
  const text = data.content.find((c) => c.type === 'text')?.text ?? '';

  // Extract JSON from potential markdown code block
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) ?? [null, text];
  const json = JSON.parse(jsonMatch[1] ?? text) as SpatialDemoResponse;
  return json;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const body = req.body as { query?: string };
  const query = typeof body.query === 'string' ? body.query.trim() : '';
  if (!query) {
    res.status(400).json({ error: 'query is required' });
    return;
  }

  try {
    let result: SpatialDemoResponse;

    if (process.env['LLM_API_KEY']) {
      try {
        result = await runRealOrchestration(query);
      } catch (e) {
        // Gracefully fall back to mock if real orchestration fails
        console.error('Real orchestration failed, falling back to mock:', e);
        result = getMockForQuery(query);
      }
    } else {
      // Simulate realistic latency so the trace animation feels real
      await new Promise((r) => setTimeout(r, 900));
      result = getMockForQuery(query);
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('spatial-demo error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
