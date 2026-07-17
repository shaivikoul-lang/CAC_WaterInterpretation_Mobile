import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusChip } from '@/src/components/ui/StatusChip';
import { DisclaimerBanner } from '@/src/components/ui/DisclaimerBanner';
import { APP_TITLE, HOME_INTRO } from '@/src/lib/copy';
import type { OverallTone } from '@/src/lib/derive';
import { useWaterStore } from '@/src/store/water-store';
import type { ContaminantFilter } from '@/src/lib/water';
import { EXPLORE_CONTAMINANTS, EXPLORE_LEARN, EXPLORE_TRENDS, GUIDED_HOME } from '@/src/lib/nav';

type Props = {
  utilityLabel: string;
  pwsId: string;
  yearSpanLabel: string;
  dataYearMax?: number;
  generatedAt: string;
  tone: OverallTone;
  exceedanceCount: number;
  attentionCount: number;
  analyteCount: number;
};

function formatUpdated(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

const QUICK_LINKS: {
  label: string;
  filter?: ContaminantFilter;
  href?: typeof EXPLORE_TRENDS | typeof EXPLORE_LEARN | typeof GUIDED_HOME;
}[] = [
  { label: 'PFAS', filter: 'pfas' },
  { label: 'Lead & Copper', filter: 'lead_copper' },
  { label: 'Arsenic', filter: 'arsenic' },
  { label: 'TTHM', filter: 'tthm' },
  { label: 'Trends', href: EXPLORE_TRENDS },
  { label: 'Learn', href: EXPLORE_LEARN },
  { label: 'WaterLens home', href: GUIDED_HOME },
];

export function HomeSnapshot(props: Props) {
  const setFilter = useWaterStore((s) => s.setFilter);

  const onQuickLink = (item: (typeof QUICK_LINKS)[number]) => {
    if (item.filter) {
      setFilter(item.filter);
      router.push(EXPLORE_CONTAMINANTS);
      return;
    }
    if (item.href) router.push(item.href);
  };

  return (
    <View className="gap-4">
      <View className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
        <Text className="text-xs font-semibold uppercase tracking-wide text-sky-800">
          WaterLens · browse mode
        </Text>
        <Text
          className="mt-2 text-2xl font-bold text-slate-900"
          accessibilityRole="header"
        >
          {APP_TITLE} data explorer
        </Text>
        <Pressable
          onPress={() => router.replace('/')}
          accessibilityRole="button"
          accessibilityLabel="Back to WaterLens guided home"
          className="mt-3 min-h-[44px] justify-center self-start rounded-full border border-sky-300 bg-white px-4 py-2"
        >
          <Text className="text-sm font-semibold text-sky-800">‹ Guided home</Text>
        </Pressable>
        <Text className="mt-2 text-base leading-6 text-slate-700">
          {HOME_INTRO}
        </Text>
        <Text className="mt-3 text-sm text-slate-600">
          <Text className="font-semibold text-slate-800">{props.utilityLabel}</Text>
          {' · '}Public system ID {props.pwsId}
          {' · '}Years {props.yearSpanLabel}
          {props.dataYearMax != null ? ` · Latest coverage through ${props.dataYearMax}` : ''}
        </Text>
        <Text className="mt-1 text-xs text-slate-500">
          Data refresh shown: {formatUpdated(props.generatedAt)}
        </Text>
      </View>

      <StatusChip tone={props.tone} />

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          At a glance
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Overall picture from public data: {props.analyteCount} measures summarized for this
          system.
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Historical exceedance records in this file: {props.exceedanceCount}. Measures needing
          closer attention in the latest scored year: {props.attentionCount}.
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Latest data year coverage: {props.dataYearMax ?? 'see year span above'}.
        </Text>
      </View>

      <View>
        <Text className="mb-2 text-base font-semibold text-slate-900" accessibilityRole="header">
          Quick links
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {QUICK_LINKS.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => onQuickLink(item)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${item.label}`}
              className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-sky-300 bg-white px-4 py-2 active:bg-sky-50"
            >
              <Text className="text-sm font-semibold text-sky-900">{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <DisclaimerBanner variant="short" />
    </View>
  );
}
