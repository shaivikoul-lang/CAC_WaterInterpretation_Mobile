import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

/**
 * Do NOT auto-redirect on mount — NativeTabs may preload this screen,
 * which previously sent users straight back to guided home in a loop.
 */
export default function GuideTabScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-50 px-6">
      <Text className="text-center text-xl font-bold text-slate-900">
        Return to guided home?
      </Text>
      <Text className="mt-2 text-center text-[15px] leading-6 text-slate-600">
        Go back to “What are you wondering about your water?”
      </Text>
      <Pressable
        onPress={() => router.replace('/')}
        accessibilityRole="button"
        accessibilityLabel="Back to WaterLens guided home"
        className="mt-6 min-h-[48px] items-center justify-center rounded-full bg-sky-700 px-6 py-3"
      >
        <Text className="text-base font-semibold text-white">Yes, go to Guide</Text>
      </Pressable>
      <Pressable
        onPress={() => router.replace('/explore')}
        accessibilityRole="button"
        className="mt-3 min-h-[44px] items-center justify-center px-4 py-2"
      >
        <Text className="text-[15px] font-medium text-sky-800">Stay in browse mode</Text>
      </Pressable>
    </View>
  );
}
