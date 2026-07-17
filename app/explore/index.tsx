import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeSnapshot } from '@/src/components/home/HomeSnapshot';
import { loadPwsPayload } from '@/src/lib/loadData';
import {
  latestRowForAnalyte,
  overallStatus,
  yearSpan,
} from '@/src/lib/derive';

const payload = loadPwsPayload();

export default function HomeScreen() {
  const tone = overallStatus(payload.analytes);
  const attentionCount = payload.analytes.filter((a) => {
    const row = latestRowForAnalyte(a);
    return (
      !!row?.over_limit ||
      row?.category === 'Above Limit' ||
      row?.category === 'Approaching Limit'
    );
  }).length;

  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['bottom']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 pb-10"
        accessibilityLabel="Home snapshot scroll area"
      >
        <HomeSnapshot
          utilityLabel={payload.pws_label}
          pwsId={payload.pws_id_number}
          yearSpanLabel={yearSpan(payload.years_present)}
          dataYearMax={payload.data_year_max}
          generatedAt={payload.generated_at}
          tone={tone}
          exceedanceCount={payload.exceedances_all_years.length}
          attentionCount={attentionCount}
          analyteCount={payload.analytes.length}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
