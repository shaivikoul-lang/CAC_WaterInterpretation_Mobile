import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GuidedView } from '@/src/components/guided/GuidedView';
import { getConcernById, type ConcernId } from '@/src/lib/concerns';
import { loadEducationPayload, loadPwsPayload } from '@/src/lib/loadData';

const water = loadPwsPayload();
const education = loadEducationPayload();

export default function GuidedConcernScreen() {
  const { concern: concernParam } = useLocalSearchParams<{ concern: string }>();
  const concern = getConcernById(concernParam as ConcernId);

  if (!concern || !concern.enabled) {
    return (
      <View className="flex-1 items-center justify-center bg-sky-50 p-6">
        <Text className="text-center text-base text-slate-700">
          That guided topic was not found. Go back to WaterLens home and pick another question.
        </Text>
      </View>
    );
  }

  return <GuidedView concern={concern} water={water} education={education} />;
}
