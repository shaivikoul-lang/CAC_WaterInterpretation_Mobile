import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AboutTrust } from '@/src/components/about/AboutTrust';
import { loadPwsPayload } from '@/src/lib/loadData';

const payload = loadPwsPayload();

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['bottom']}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-10">
        <AboutTrust payload={payload} />
      </ScrollView>
    </SafeAreaView>
  );
}
