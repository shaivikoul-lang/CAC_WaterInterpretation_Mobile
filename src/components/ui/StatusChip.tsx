import { Text, View } from 'react-native';
import type { OverallTone } from '@/src/lib/derive';
import { TONE_COPY } from '@/src/lib/copy';

const toneStyles: Record<OverallTone, string> = {
  calm: 'bg-emerald-50 border-emerald-300',
  watch: 'bg-amber-50 border-amber-300',
  act: 'bg-rose-50 border-rose-300',
};

const toneText: Record<OverallTone, string> = {
  calm: 'text-emerald-900',
  watch: 'text-amber-950',
  act: 'text-rose-950',
};

const toneIcon: Record<OverallTone, string> = {
  calm: '●',
  watch: '▲',
  act: '!',
};

type Props = {
  tone: OverallTone;
};

export function StatusChip({ tone }: Props) {
  const copy = TONE_COPY[tone];
  return (
    <View
      className={`rounded-2xl border p-4 ${toneStyles[tone]}`}
      accessibilityRole="summary"
      accessibilityLabel={`${copy.label}. ${copy.desc}`}
      accessibilityHint={copy.accessibilityHint}
    >
      <View className="flex-row items-center gap-2">
        <Text
          className={`text-lg font-bold ${toneText[tone]}`}
          accessibilityElementsHidden
          importantForAccessibility="no"
        >
          {toneIcon[tone]}
        </Text>
        <Text className={`text-base font-semibold ${toneText[tone]}`}>
          {copy.label}
        </Text>
      </View>
      <Text className={`mt-2 text-sm leading-5 ${toneText[tone]}`}>
        {copy.desc}
      </Text>
    </View>
  );
}
