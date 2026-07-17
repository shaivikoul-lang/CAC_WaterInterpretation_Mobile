import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LearnTopics } from '@/src/components/learn/LearnTopics';

export default function LearnScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['bottom']}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-10">
        <LearnTopics />
      </ScrollView>
    </SafeAreaView>
  );
}
