import { Text, View } from 'react-native';
import { DETAIL_DISCLAIMER, SHORT_DISCLAIMER } from '@/src/lib/copy';

type Props = {
  variant?: 'short' | 'detail';
};

export function DisclaimerBanner({ variant = 'short' }: Props) {
  const text = variant === 'detail' ? DETAIL_DISCLAIMER : SHORT_DISCLAIMER;
  return (
    <View
      className="rounded-xl border border-slate-300 bg-slate-50 p-3"
      accessibilityRole="text"
      accessibilityLabel={`Disclaimer: ${text}`}
    >
      <Text className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        Disclaimer
      </Text>
      <Text className="mt-1 text-sm leading-5 text-slate-700">{text}</Text>
    </View>
  );
}
