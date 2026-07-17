import type { OverallTone } from './derive';

export const APP_TITLE = 'WaterLens';

export const HOME_INTRO =
  'Based on public monitoring data for Highlands Ranch Water (PWS ID CO0118015, listed as Centennial WSD). This is educational context from Colorado’s public dataset—not a test of water at your faucet, and not an official Highlands Ranch Water product.';

export const SHORT_DISCLAIMER =
  'This is educational context, not a test of water at your faucet. Numbers can change by year; see trends.';

export const DETAIL_DISCLAIMER =
  'Based on public monitoring data for Highlands Ranch Water. Compared with the EPA-style limit in the dataset when a limit is available. This is educational context, not a test of water at your faucet, not a compliance determination, and not affiliated with CDPHE or Highlands Ranch Water.';

export const TRUST_BODY =
  'We use CDPHE public monitoring data for Highlands Ranch Water (regulatory ID CO0118015, listed as Centennial WSD) to show multi-year water quality context in plain language—what the numbers mean next to EPA-related limits—without claiming results for any one home’s tap.';

export const TRUST_FOOTER =
  'This app reads Colorado’s public drinking water dataset for one system (Highlands Ranch Water). It is not a laboratory test of water at your kitchen tap, not a compliance determination, and not affiliated with CDPHE or your utility.';

export const EDUCATION_INTRO_FALLBACK =
  'Plain-language pointers only. For medical questions or your own situation, talk to a health professional. Official rules and health information: CDPHE and EPA.';

export const TONE_COPY: Record<
  OverallTone,
  { label: string; desc: string; accessibilityHint: string }
> = {
  calm: {
    label: 'Looking steady',
    desc: 'Latest reported year in this file does not show levels above limits for the measures we summarize.',
    accessibilityHint: 'Overall status calm: no latest-year measures above dataset limits.',
  },
  watch: {
    label: 'Worth a closer read',
    desc: 'Some measures are in a “moderate” or “approaching” range in the latest year—see contaminants and official links.',
    accessibilityHint: 'Overall status watch: some measures are moderate or approaching the limit.',
  },
  act: {
    label: 'Attention items',
    desc: 'At least one measure is above the limit used in this dataset for a reported year—review details calmly with official guidance.',
    accessibilityHint: 'Overall status attention: at least one measure is above the dataset limit.',
  },
};

export const CATEGORY_LABELS: Record<string, string> = {
  'Well Below Limit': 'Well below limit',
  Moderate: 'Moderate',
  'Approaching Limit': 'Approaching limit',
  'Above Limit': 'Above limit',
};

export const SOURCE_LINKS = [
  {
    label: 'Colorado EPHT — public drinking water data',
    url: 'https://coepht.colorado.gov/public-drinking-water-data',
  },
  {
    label: 'CDPHE Drinking Water Information',
    url: 'https://cdphe.colorado.gov/dwinfo',
  },
  {
    label: 'Highlands Ranch Water (utility website)',
    url: 'https://www.highlandsranchwater.org/',
  },
] as const;

export const FEEDBACK_MAILTO =
  'mailto:feedback@example.com?subject=HRW%20Water%20Interpreter%20feedback';
