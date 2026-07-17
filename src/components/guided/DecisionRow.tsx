import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  icon?: string;
};

export function DecisionRow({ label, onPress, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="min-h-[64px] flex-row items-center gap-3 border-b border-slate-200 px-1 py-4 active:bg-slate-100"
    >
      {icon ? (
        <Text className="text-xl" accessibilityElementsHidden importantForAccessibility="no">
          {icon}
        </Text>
      ) : null}
      <Text className="flex-1 text-[17px] font-medium leading-snug text-slate-900">
        {label}
      </Text>
      <Text className="text-lg text-slate-400" accessibilityElementsHidden>
        ›
      </Text>
    </Pressable>
  );
}

export function DecisionPanel({ children }: { children: ReactNode }) {
  return (
    <View className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {children}
    </View>
  );
}
