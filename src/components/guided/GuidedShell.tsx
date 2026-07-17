import { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GuidedDisclaimer } from './GuidedDisclaimer';

type Props = {
  utilityLabel?: string;
  children: ReactNode;
  headerAction?: ReactNode;
  showDisclaimer?: boolean;
};

export function GuidedShell({
  utilityLabel,
  children,
  headerAction,
  showDisclaimer = true,
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-sky-50" edges={['top', 'bottom']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
          <View className="mb-6 flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-[12px] font-semibold uppercase tracking-widest text-slate-500">
                WaterLens
              </Text>
              {utilityLabel ? (
                <Text className="mt-1 text-[13px] text-slate-600">{utilityLabel}</Text>
              ) : null}
            </View>
            {headerAction}
          </View>
          {children}
          {showDisclaimer ? <GuidedDisclaimer /> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
