import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { AnalytePack, ExceedRow } from '@/src/lib/water';
import { trendDirection } from '@/src/lib/derive';
import { encodeAnalyteParam } from '@/src/lib/filters';

type Props = {
  exceedances: ExceedRow[];
  analytes: AnalytePack[];
};

const trendLabel = {
  up: 'Score moved up vs prior scored year',
  down: 'Score moved down vs prior scored year',
  flat: 'Score roughly steady vs prior scored year',
} as const;

export function TrendsPanel({ exceedances, analytes }: Props) {
  const changing = analytes
    .map((a) => ({ analyte: a, dir: trendDirection(a) }))
    .filter((x) => x.dir !== 'flat')
    .sort((a, b) => a.analyte.analyte_name.localeCompare(b.analyte.analyte_name));

  return (
    <View className="gap-4">
      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-lg font-semibold text-slate-900" accessibilityRole="header">
          What changed over time
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Based on public monitoring data for Highlands Ranch Water. Trends use scored years in
          this file—numbers can change by year, and older records do not describe today’s tap.
        </Text>
      </View>

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          Exceedance history in this file
        </Text>
        {exceedances.length === 0 ? (
          <Text className="mt-2 text-sm text-slate-700">
            No exceedance rows are listed in this dataset export for this system.
          </Text>
        ) : (
          exceedances.map((ex) => (
            <Pressable
              key={`${ex.analyte_name}-${ex.year}-${ex.summary}`}
              onPress={() =>
                router.push(`/contaminant/${encodeAnalyteParam(ex.analyte_name)}`)
              }
              accessibilityRole="button"
              accessibilityLabel={`${ex.analyte_name}, year ${ex.year}. ${ex.summary}`}
              className="mt-3 min-h-[44px] rounded-xl border border-amber-200 bg-amber-50 p-3"
            >
              <Text className="font-semibold text-slate-900">
                {ex.analyte_name} · {ex.year}
              </Text>
              <Text className="mt-1 text-sm leading-5 text-slate-700">{ex.summary}</Text>
            </Pressable>
          ))
        )}
      </View>

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          Recent score direction
        </Text>
        {changing.length === 0 ? (
          <Text className="mt-2 text-sm text-slate-700">
            Among scored measures, latest year-to-year score changes look relatively steady in
            this file.
          </Text>
        ) : (
          changing.map(({ analyte, dir }) => (
            <Pressable
              key={analyte.analyte_name}
              onPress={() =>
                router.push(`/contaminant/${encodeAnalyteParam(analyte.analyte_name)}`)
              }
              accessibilityRole="button"
              accessibilityLabel={`${analyte.analyte_name}: ${trendLabel[dir]}`}
              className="mt-3 min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <Text className="font-semibold text-slate-900">{analyte.analyte_name}</Text>
              <Text className="mt-1 text-sm text-slate-700">{trendLabel[dir]}</Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}
