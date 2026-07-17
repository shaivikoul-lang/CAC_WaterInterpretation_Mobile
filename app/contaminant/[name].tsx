import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ContaminantDetail } from '@/src/components/detail/ContaminantDetail';
import { decodeAnalyteParam } from '@/src/lib/filters';
import { findAnalyte, loadEducationPayload, loadPwsPayload } from '@/src/lib/loadData';

const payload = loadPwsPayload();
const education = loadEducationPayload();

export default function ContaminantDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const analyteName = decodeAnalyteParam(name ?? '');
  const analyte = findAnalyte(payload, analyteName);
  const edu = education.by_analyte_name[analyteName];

  if (!analyte) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-100 p-6">
        <Text className="text-center text-base text-slate-700">
          Measure “{analyteName}” was not found in the bundled Highlands Ranch Water file.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerClassName="p-4"
      accessibilityLabel={`${analyte.analyte_name} detail`}
    >
      <ContaminantDetail analyte={analyte} education={edu} />
    </ScrollView>
  );
}
