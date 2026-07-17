import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendsPanel } from '@/src/components/trends/TrendsPanel';
import { loadPwsPayload } from '@/src/lib/loadData';

const payload = loadPwsPayload();

export default function TrendsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['bottom']}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-10">
        <TrendsPanel
          exceedances={payload.exceedances_all_years}
          analytes={payload.analytes}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
