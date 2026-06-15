import { useState } from 'react';
import { submitSpatialDemo } from '../lib/demo-client';
import type { SpatialDemoResponse } from '../lib/types';

type DemoStatus = 'idle' | 'loading' | 'success' | 'error';

interface DemoState {
  status: DemoStatus;
  data: SpatialDemoResponse | null;
  error: string | null;
}

export function useDemo() {
  const [state, setState] = useState<DemoState>({
    status: 'idle',
    data: null,
    error: null,
  });

  async function run(query: string) {
    setState({ status: 'loading', data: null, error: null });
    try {
      const result = await submitSpatialDemo(query);
      setState({ status: 'success', data: result, error: null });
    } catch (err) {
      setState({
        status: 'error',
        data: null,
        error: err instanceof Error ? err.message : 'Неизвестная ошибка',
      });
    }
  }

  return { ...state, run };
}
