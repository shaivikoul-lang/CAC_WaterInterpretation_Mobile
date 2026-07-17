import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { AnalytePack } from '@/src/lib/water';
import {
  categoryTone,
  formatConcentration,
  latestRowForAnalyte,
} from '@/src/lib/derive';
import { CATEGORY_LABELS } from '@/src/lib/copy';
import { encodeAnalyteParam } from '@/src/lib/filters';

const toneBorder: Record<string, string> = {
  good: 'border-emerald-300',
  caution: 'border-amber-300',
  warning: 'border-orange-400',
  critical: 'border-rose-400',
};

const toneBg: Record<string, string> = {
  good: 'bg-emerald-50',
  caution: 'bg-amber-50',
  warning: 'bg-orange-50',
  critical: 'bg-rose-50',
};

type Props = {
  analyte: AnalytePack;
};

export function ContaminantCard({ analyte }: Props) {
  const row = latestRowForAnalyte(analyte);
  const tone = categoryTone(row?.category);
  const scored = row?.score_available !== false && row?.category;

  return (
    <Pressable
      onPress={() =>
        router.push(`/contaminant/${encodeAnalyteParam(analyte.analyte_name)}`)
      }
      accessibilityRole="button"
      accessibilityLabel={`${analyte.analyte_name}. Latest year ${row?.year ?? 'unknown'}. ${
        scored
          ? CATEGORY_LABELS[row!.category!] ?? row!.category
          : 'Score not available'
      }. Tap for details.`}
      className={`mb-3 rounded-2xl border bg-white p-4 active:opacity-90 ${toneBorder[tone]}`}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-slate-900">
            {analyte.analyte_name}
          </Text>
          <Text className="mt-1 text-sm text-slate-600">
            Latest year in file: {row?.year ?? '—'}
          </Text>
          <Text className="mt-1 text-sm text-slate-700">
            Measured:{' '}
            {formatConcentration(row?.max_concentration ?? null, row?.unit)}
          </Text>
          <Text className="mt-1 text-sm text-slate-700">
            Compared with limit in dataset:{' '}
            {formatConcentration(row?.sdwa_limit ?? null, row?.unit)}
          </Text>
        </View>
        <View className={`rounded-xl px-2 py-1 ${toneBg[tone]}`}>
          <Text className="text-xs font-semibold text-slate-800">
            {scored
              ? CATEGORY_LABELS[row!.category!] ?? row!.category
              : 'Not scored'}
          </Text>
        </View>
      </View>
      {row?.over_limit ? (
        <Text className="mt-2 text-sm font-medium text-rose-800">
          Flagged above the limit used in this dataset for that year—see detail for
          careful wording and official links.
        </Text>
      ) : null}
      {row?.score_available === false ? (
        <Text className="mt-2 text-sm text-slate-600">
          {row.score_reason ||
            row.guidance ||
            'A risk score is not available for this measure; values are shown without inventing a score.'}
        </Text>
      ) : null}
    </Pressable>
  );
}
