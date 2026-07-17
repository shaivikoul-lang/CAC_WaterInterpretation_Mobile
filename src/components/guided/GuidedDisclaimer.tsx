import { Text, View } from 'react-native';

export function GuidedDisclaimer() {
  return (
    <View
      className="mt-10 border-t border-slate-200 pt-5"
      accessibilityRole="summary"
      accessibilityLabel="Disclaimers and attribution"
    >
      <Text className="text-[12px] leading-5 text-slate-500">
        Public monitoring data — not a test of water at your tap.
      </Text>
      <Text className="mt-1 text-[12px] leading-5 text-slate-500">
        Independent student tool · CDPHE · EPA
      </Text>
      <Text className="mt-1 text-[12px] leading-5 text-slate-500">
        Not affiliated with, endorsed by, or maintained by Highlands Ranch Water.
      </Text>
    </View>
  );
}
