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
