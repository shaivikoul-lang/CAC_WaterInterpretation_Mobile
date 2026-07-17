import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ContaminantFilter } from '@/src/lib/water';
import { FILTER_CHIPS } from '@/src/lib/filters';

type Props = {
  value: ContaminantFilter;
  onChange: (filter: ContaminantFilter) => void;
};

export function FilterChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-3"
      accessibilityRole="tablist"
    >
      <View className="flex-row gap-2 pr-4">
        {FILTER_CHIPS.map((chip) => {
          const selected = chip.id === value;
          return (
            <Pressable
              key={chip.id}
              onPress={() => onChange(chip.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              accessibilityLabel={`Filter ${chip.label}`}
              className={`min-h-[44px] items-center justify-center rounded-full border px-4 py-2 ${
                selected
                  ? 'border-sky-700 bg-sky-700'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selected ? 'text-white' : 'text-slate-800'
                }`}
              >
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
