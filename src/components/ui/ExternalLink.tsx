import { Linking, Pressable, Text } from 'react-native';

type Props = {
  label: string;
  url: string;
};

export function ExternalLink({ label, url }: Props) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      accessibilityRole="link"
      accessibilityLabel={label}
      className="mb-2 min-h-[44px] justify-center rounded-lg bg-sky-50 px-3 py-2 active:bg-sky-100"
    >
      <Text className="text-base font-medium text-sky-800 underline">{label}</Text>
    </Pressable>
  );
}
