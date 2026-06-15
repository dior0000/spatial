export type Provider = '2gis' | 'yandex' | 'osm' | 'mapbox' | 'local';

export interface Source {
  name: string;
  provider: Provider;
  url?: string;
  confidence: number;
}

export interface GroundedEntity {
  query: string;
  resolvedName: string;
  lat: number;
  lng: number;
  gersId?: string;
  sources: Source[];
}

export interface ReconciliationItem {
  field: string;
  candidates: { provider: string; value: string }[];
  chosen: string;
  reason: string;
}

export type ComputationKind = 'route' | 'distance' | 'eta' | 'isochrone' | 'ordering';

export interface Computation {
  kind: ComputationKind;
  result: unknown;
  computedBy: 'tool';
  note?: string;
}

export interface VerificationCheck {
  rule: string;
  passed: boolean;
  detail?: string;
}

export interface SpatialDemoResponse {
  naive: string;
  plan: string[];
  grounding: GroundedEntity[];
  reconciliation: ReconciliationItem[];
  computation: Computation[];
  verification: {
    checks: VerificationCheck[];
    passed: boolean;
  };
  confidence: number;
  answer: string;
  sources: Source[];
  flywheel: {
    factsAdded: number;
    note: string;
  };
}

export interface WaitlistRequest {
  email: string;
}

export interface WaitlistResponse {
  ok: boolean;
  message: string;
}
