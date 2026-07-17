import type { AnalytePack, YearRow } from './water';

export function latestRowForAnalyte(a: AnalytePack): YearRow | undefined {
  const y = a.summary_latest_year;
  return a.by_year.find((r) => r.year === y) ?? a.by_year[a.by_year.length - 1];
}

export function trendDirection(a: AnalytePack): 'up' | 'down' | 'flat' {
  const scored = [...a.by_year]
    .filter((r) => r.risk_score != null && r.risk_score === r.risk_score)
    .sort((x, y) => x.year - y.year);
  if (scored.length < 2) return 'flat';
  const last = scored[scored.length - 1].risk_score!;
  const prev = scored[scored.length - 2].risk_score!;
  if (last > prev + 3) return 'up';
  if (last < prev - 3) return 'down';
  return 'flat';
}

export type OverallTone = 'calm' | 'watch' | 'act';

export function overallStatus(analytes: AnalytePack[]): OverallTone {
  for (const a of analytes) {
    const row = latestRowForAnalyte(a);
    if (!row) continue;
    if (row.over_limit || row.category === 'Above Limit') return 'act';
  }
  for (const a of analytes) {
    const row = latestRowForAnalyte(a);
    if (!row) continue;
    if (row.category === 'Approaching Limit') return 'watch';
  }
  for (const a of analytes) {
    const row = latestRowForAnalyte(a);
    if (row?.category === 'Moderate') return 'watch';
  }
  return 'calm';
}

export type MeasureSummary = { safe: number; moderate: number; above: number };

export function measureSummaryCounts(analytes: AnalytePack[]): MeasureSummary {
  const counts = { safe: 0, moderate: 0, above: 0 };
  for (const a of analytes) {
    const row = latestRowForAnalyte(a);
    if (!row) {
      counts.safe++;
      continue;
    }
    if (row.over_limit || row.category === 'Above Limit') counts.above++;
    else if (
      row.category === 'Approaching Limit' ||
      row.category === 'Moderate'
    )
      counts.moderate++;
    else counts.safe++;
  }
  return counts;
}

export function snapshotSummaryLine(summary: MeasureSummary): string {
  if (summary.above > 0) {
    return `${summary.above} measure${summary.above === 1 ? '' : 's'} exceed${summary.above === 1 ? 's' : ''} the limit in recent data.`;
  }
  if (summary.moderate > 0) {
    return 'No current exceedances. Some values are worth a closer look in recent data.';
  }
  return 'No current exceedances in recent data.';
}

export function categoryTone(
  cat?: string | null,
): 'good' | 'caution' | 'warning' | 'critical' {
  if (!cat) return 'good';
  if (cat === 'Above Limit') return 'critical';
  if (cat === 'Approaching Limit') return 'warning';
  if (cat === 'Moderate') return 'caution';
  return 'good';
}

export function ratioPercent(row: YearRow): number | null {
  if (
    row.max_concentration == null ||
    row.sdwa_limit == null ||
    row.sdwa_limit <= 0
  ) {
    return null;
  }
  return Math.min(150, (row.max_concentration / row.sdwa_limit) * 100);
}

export function yearSpan(years: number[]): string {
  if (!years.length) return '—';
  const sorted = [...years].sort((a, b) => a - b);
  return `${sorted[0]}–${sorted[sorted.length - 1]}`;
}

export function formatConcentration(
  value: number | null | undefined,
  unit?: string | null,
): string {
  if (value == null || Number.isNaN(value)) return 'Not reported';
  const formatted =
    Math.abs(value) >= 100
      ? value.toFixed(0)
      : Math.abs(value) >= 10
        ? value.toFixed(1)
        : value.toFixed(3);
  return unit ? `${formatted} ${unit}` : formatted;
}
