import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { DecisionPanel, DecisionRow } from './DecisionRow';
import { GuidedShell } from './GuidedShell';
import type { ConcernId } from '@/src/lib/concerns';
import { EXPLORE_SNAPSHOT } from '@/src/lib/nav';

export const ENTRY_OPTIONS: { label: string; concernId: ConcernId; icon: string }[] = [
  {
    label: 'My water tastes or smells different',
    concernId: 'taste',
    icon: '💧',
  },
  {
    label: 'I heard about PFAS',
    concernId: 'pfas',
    icon: '🧪',
  },
  {
    label: 'Is my water safe to drink?',
    concernId: 'lead',
    icon: '🏠',
  },
  {
    label: "I got a water report and don't understand it",
    concernId: 'report',
    icon: '📄',
  },
  {
    label: 'Just tell me if anything has changed',
    concernId: 'changes',
    icon: '📈',
  },
];

type Props = {
  utilityLabel: string;
};

export function ConcernEntry({ utilityLabel }: Props) {
  return (
    <GuidedShell utilityLabel={utilityLabel}>
      <Text className="text-[28px] font-bold leading-tight tracking-tight text-slate-900">
        What are you wondering about your water?
      </Text>
      <Text className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
        Pick one — we&apos;ll guide you through it step by step.
      </Text>
      <Text className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-[13px] leading-relaxed text-slate-600">
        People often first hear about PFAS through drinking water. PFAS is a larger group of
        persistent chemicals connected to environmental chemistry, industry, and cleanup
        research—not only the tap. This tool focuses on Highlands Ranch public monitoring data.
        It is not a test of water at your faucet.
      </Text>

      <DecisionPanel>
        {ENTRY_OPTIONS.map((option) => (
          <DecisionRow
            key={option.concernId}
            label={option.label}
            icon={option.icon}
            onPress={() => router.push(`/guided/${option.concernId}`)}
          />
        ))}
      </DecisionPanel>

      <Pressable
        onPress={() => router.push(EXPLORE_SNAPSHOT)}
        accessibilityRole="button"
        accessibilityLabel="Browse all water data"
        className="mt-8 min-h-[44px] items-center justify-center"
      >
        <Text className="text-center text-[13px] font-medium text-slate-500 underline">
          Browse all water data
        </Text>
      </Pressable>
    </GuidedShell>
  );
}
