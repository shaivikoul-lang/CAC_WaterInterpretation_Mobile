# WaterLens Mobile

Resident-facing **WaterLens** app for Highlands Ranch Water (PWS **CO0118015** / Centennial WSD).

This is the **mobile version** of the guided WaterLens web experience
(`CAC_WaterInterpretation` dashboard at `/pws/CO0118015_hrw/dashboard`).

**Not** a household tap test, medical/legal advice, an official HR Water product, or a compliance determination.

## Product flow (matches web)

1. **Guided home** — “What are you wondering about your water?”
2. **Clarify** — pick the closest match
3. **Insight card** — calm wording + what to do next
4. **Optional** — simple explanation / monitoring numbers
5. **Browse all water data** — explore tabs (snapshot, measures, trends, learn, about)

## Stack

Expo SDK 54 · Expo Router · NativeWind · Zustand · NativeTabs (glass tab bar) · gifted-charts

## Install & run

```bash
npm install
npx expo start
```

Open in **Expo Go** (SDK 54) on the same Wi‑Fi, or press `i` / `a` for simulators.

## Data

Bundled from the WaterLens HRW lane:

- `assets/data/output.json`
- `assets/data/education.json`

Guided copy/logic ported from:

- `dashboard/src/lib/concerns.ts`
- `dashboard/src/lib/guidedContent.ts`

### Refresh JSON

1. Rebuild in the WaterLens repo (`build_pws_output.py`).
2. Copy JSON into `assets/data/`.
3. Reload Expo.

## Naming

- App display name: **WaterLens**
- Package / slug: `waterlens-mobile`
- Workspace folder may still be named `CAC_Mobile_App` locally
