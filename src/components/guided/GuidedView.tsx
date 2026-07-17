import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { DecisionPanel, DecisionRow } from './DecisionRow';
import { GuidedShell } from './GuidedShell';
import { ExternalLink } from '@/src/components/ui/ExternalLink';
import type { ConcernDef } from '@/src/lib/concerns';
import {
  buildInsight,
  educationHook,
  educationOnlyBody,
  evidenceMode,
  evidenceNarrative,
  measurementDisplay,
  resolveAnalyte,
  sourceLinks,
  supplementaryMeasurements,
  whyBullets,
} from '@/src/lib/guidedContent';
import type { ContaminantFilter, EducationPayload, PwsPayload } from '@/src/lib/water';
import { encodeAnalyteParam } from '@/src/lib/filters';
import { EXPLORE_CONTAMINANTS } from '@/src/lib/nav';
import { useWaterStore } from '@/src/store/water-store';

type OpenPanel = 'why' | 'evidence' | null;

const toneStyles = {
  calm: { box: 'bg-emerald-50 border-emerald-200', label: 'text-emerald-800' },
  watch: { box: 'bg-amber-50 border-amber-200', label: 'text-amber-900' },
  act: { box: 'bg-rose-50 border-rose-200', label: 'text-rose-900' },
} as const;

const ENTRY_ICONS: Record<string, string> = {
  taste: '💧',
  lead: '🏠',
  report: '📄',
  changes: '📈',
  pfas: '🧪',
};

type Props = {
  concern: ConcernDef;
  water: PwsPayload;
  education: EducationPayload | null;
};

function handoffFilter(concernId: string, clarifyId: string): ContaminantFilter {
  if (concernId === 'taste' || (concernId === 'changes' && clarifyId === 'taste-changes'))
    return 'tthm';
  if (concernId === 'pfas' || (concernId === 'changes' && clarifyId === 'specific'))
    return 'pfas';
  if (concernId === 'lead') return 'lead_copper';
  return 'all';
}

export function GuidedView({ concern, water, education }: Props) {
  const [clarifyChoice, setClarifyChoice] = useState<string | null>(null);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const setFilter = useWaterStore((s) => s.setFilter);

  const selectedOption = concern.clarifyOptions.find((o) => o.id === clarifyChoice);
  const analyte = clarifyChoice ? resolveAnalyte(concern, clarifyChoice, water) : null;
  const insight = clarifyChoice
    ? buildInsight(concern, clarifyChoice, water, analyte)
    : null;
  const mode = clarifyChoice ? evidenceMode(concern.id, clarifyChoice) : 'education-only';
  const measurement = measurementDisplay(analyte);
  const extraMeasurements = clarifyChoice
    ? supplementaryMeasurements(concern, clarifyChoice, water)
    : [];
  const hook = educationHook(analyte, education);
  const eduBody = clarifyChoice ? educationOnlyBody(concern.id, clarifyChoice) : null;
  const links = sourceLinks(concern.id);

  const showChart = mode === 'chart' && analyte != null;
  const showMeasurement = mode === 'chart' || mode === 'measurement';

  const goExplore = (clarifyId: string) => {
    setFilter(handoffFilter(concern.id, clarifyId));
    if (analyte) {
      router.push(`/contaminant/${encodeAnalyteParam(analyte.analyte_name)}`);
      return;
    }
    router.push(EXPLORE_CONTAMINANTS);
  };

  const headerAction = clarifyChoice ? (
    <Pressable onPress={() => goExplore(clarifyChoice)} accessibilityRole="link">
      <Text className="text-[13px] font-medium text-sky-700">Browse data</Text>
    </Pressable>
  ) : (
    <Pressable onPress={() => router.replace('/')} accessibilityRole="link">
      <Text className="text-[13px] font-medium text-slate-500">All topics</Text>
    </Pressable>
  );

  if (!clarifyChoice) {
    return (
      <GuidedShell utilityLabel={water.pws_label} headerAction={headerAction}>
        <Text className="text-[28px] font-bold leading-tight text-slate-900">
          {concern.clarifyQuestion}
        </Text>
        <Text className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
          {concern.clarifyHint}
        </Text>
        <DecisionPanel>
          {concern.clarifyOptions.map((option) => (
            <DecisionRow
              key={option.id}
              label={option.label}
              icon={ENTRY_ICONS[concern.id] ?? '•'}
              onPress={() => setClarifyChoice(option.id)}
            />
          ))}
        </DecisionPanel>
      </GuidedShell>
    );
  }

  if (!insight) return null;

  const tone = toneStyles[insight.tone];

  return (
    <GuidedShell utilityLabel={water.pws_label} headerAction={headerAction}>
      {selectedOption ? (
        <Text className="text-[14px] text-slate-600">
          You picked:{' '}
          <Text className="font-semibold text-slate-900">{selectedOption.label}</Text>
        </Text>
      ) : null}

      <View className={`mt-5 rounded-2xl border p-5 ${tone.box}`}>
        <Text className={`text-[12px] font-bold uppercase tracking-wide ${tone.label}`}>
          {insight.title}
        </Text>
        <Text className="mt-4 text-[22px] font-bold leading-snug text-slate-900">
          {insight.headline}
        </Text>
        <Text className="mt-4 text-[17px] text-slate-900">{insight.verdict}</Text>
        <View className="mt-5 rounded-xl border border-white/70 bg-white/80 p-4">
          <Text className="text-[15px] font-bold text-slate-900">What to do next</Text>
          <Text className="mt-1 text-[16px] text-slate-800">{insight.nextStep}</Text>
        </View>
        <Text className="mt-4 text-[13px] leading-relaxed text-slate-600">
          {insight.disclaimer}
        </Text>
      </View>

      <View className="mt-8 border-t border-slate-200 pt-6">
        <Text className="text-[18px] font-bold text-slate-900">Want to read more?</Text>
        <Text className="mt-1 text-[15px] text-slate-600">
          Optional — open one section at a time.
        </Text>

        <Pressable
          onPress={() => setOpenPanel((p) => (p === 'why' ? null : 'why'))}
          accessibilityRole="button"
          accessibilityState={{ expanded: openPanel === 'why' }}
          className="mt-4 min-h-[64px] flex-row items-center border-b border-slate-200 py-4"
        >
          <View className="flex-1">
            <Text className="text-[17px] font-medium text-slate-900">
              Read a simple explanation
            </Text>
            <Text className="mt-0.5 text-[14px] text-slate-600">
              Plain words — no technical jargon
            </Text>
          </View>
          <Text className="text-slate-400">{openPanel === 'why' ? '▴' : '▾'}</Text>
        </Pressable>
        {openPanel === 'why' ? (
          <View className="border-b border-slate-200 py-4">
            {whyBullets(concern.id, clarifyChoice).map((bullet) => (
              <Text key={bullet} className="mb-3 text-[16px] leading-6 text-slate-800">
                • {bullet}
              </Text>
            ))}
            <Text className="mt-2 text-[13px] text-slate-600">
              Tap water at your home may differ from system-wide monitoring.
            </Text>
            <View className="mt-3">
              {links.map((link) => (
                <ExternalLink key={link.url} label={link.label} url={link.url} />
              ))}
            </View>
          </View>
        ) : null}

        <Pressable
          onPress={() => setOpenPanel((p) => (p === 'evidence' ? null : 'evidence'))}
          accessibilityRole="button"
          accessibilityState={{ expanded: openPanel === 'evidence' }}
          className="min-h-[64px] flex-row items-center border-b border-slate-200 py-4"
        >
          <View className="flex-1">
            <Text className="text-[17px] font-medium text-slate-900">
              See the monitoring numbers
            </Text>
            <Text className="mt-0.5 text-[14px] text-slate-600">
              Official test results from Highlands Ranch Water
            </Text>
          </View>
          <Text className="text-slate-400">{openPanel === 'evidence' ? '▴' : '▾'}</Text>
        </Pressable>
        {openPanel === 'evidence' ? (
          <View className="space-y-3 border-b border-slate-200 py-4">
            <Text className="text-[16px] leading-6 text-slate-800">
              {evidenceNarrative(concern, clarifyChoice, water, analyte)}
            </Text>
            {eduBody ? (
              <Text className="mt-3 text-[14px] text-slate-600">{eduBody}</Text>
            ) : null}
            {showMeasurement && measurement ? (
              <View className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                <Text className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  {measurement.analyteName}
                </Text>
                <Text className="mt-2 text-3xl font-bold text-slate-900">
                  {measurement.value}
                </Text>
                <Text className="mt-1 text-[13px] text-slate-600">
                  {measurement.limit != null ? `Federal limit: ${measurement.limit}` : ''}
                  {measurement.ratioLabel != null ? ` · ${measurement.ratioLabel}` : ''}
                  {measurement.year != null ? ` · Latest year: ${measurement.year}` : ''}
                </Text>
                {measurement.category ? (
                  <Text className="mt-2 font-semibold text-slate-800">
                    {measurement.category}
                  </Text>
                ) : null}
              </View>
            ) : null}
            {extraMeasurements.map((extra) => (
              <View
                key={extra.analyteName}
                className="mt-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <Text className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  {extra.analyteName}
                </Text>
                <Text className="mt-2 text-3xl font-bold text-slate-900">{extra.value}</Text>
                <Text className="mt-1 text-[13px] text-slate-600">
                  {extra.limit != null ? `Federal limit: ${extra.limit}` : ''}
                  {extra.ratioLabel != null ? ` · ${extra.ratioLabel}` : ''}
                  {extra.year != null ? ` · Latest year: ${extra.year}` : ''}
                </Text>
              </View>
            ))}
            {hook ? <Text className="mt-3 text-[14px] text-slate-600">{hook}</Text> : null}
            {showChart && analyte ? (
              <Pressable
                onPress={() =>
                  router.push(`/contaminant/${encodeAnalyteParam(analyte.analyte_name)}`)
                }
                className="mt-3 min-h-[44px] items-center justify-center rounded-xl bg-sky-700 px-4 py-3"
              >
                <Text className="font-semibold text-white">
                  Open multi-year trend for {analyte.analyte_name}
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        <Pressable
          onPress={() => goExplore(clarifyChoice)}
          className="mt-6 min-h-[44px] justify-center"
          accessibilityRole="button"
        >
          <Text className="text-[15px] font-semibold text-sky-700">
            Open full water data dashboard
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setClarifyChoice(null);
            setOpenPanel(null);
          }}
          className="mt-3 min-h-[44px] justify-center"
          accessibilityRole="button"
        >
          <Text className="text-[15px] font-medium text-slate-500">‹ Back to the list</Text>
        </Pressable>
      </View>
    </GuidedShell>
  );
}
