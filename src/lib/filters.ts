import type { AnalytePack, ContaminantFilter } from './water';
import { latestRowForAnalyte } from './derive';

export const PFAS_NAMES = new Set([
  'PFOA',
  'PFOS',
  'PFBS',
  'PFHxS',
  'PFNA',
]);

export const FILTER_CHIPS: { id: ContaminantFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pfas', label: 'PFAS' },
  { id: 'lead_copper', label: 'Lead & Copper' },
  { id: 'arsenic', label: 'Arsenic' },
  { id: 'tthm', label: 'TTHM' },
  { id: 'attention', label: 'Attention' },
];

export function isPfas(name: string): boolean {
  return PFAS_NAMES.has(name) || name.toUpperCase().startsWith('PF');
}

export function matchesFilter(
  analyte: AnalytePack,
  filter: ContaminantFilter,
): boolean {
  const name = analyte.analyte_name;
  switch (filter) {
    case 'all':
      return true;
    case 'pfas':
      return isPfas(name);
    case 'lead_copper':
      return name === 'Lead' || name === 'Copper';
    case 'arsenic':
      return name === 'Arsenic';
    case 'tthm':
      return name.toLowerCase().includes('tthm');
    case 'attention': {
      const row = latestRowForAnalyte(analyte);
      if (!row) return false;
      return (
        !!row.over_limit ||
        row.category === 'Above Limit' ||
        row.category === 'Approaching Limit'
      );
    }
    default:
      return true;
  }
}

export function encodeAnalyteParam(name: string): string {
  return encodeURIComponent(name);
}

export function decodeAnalyteParam(param: string): string {
  return decodeURIComponent(param);
}
