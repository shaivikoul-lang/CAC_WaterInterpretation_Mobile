import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContaminantCard } from '@/src/components/list/ContaminantCard';
import { FilterChips } from '@/src/components/list/FilterChips';
import { loadPwsPayload } from '@/src/lib/loadData';
import { matchesFilter } from '@/src/lib/filters';
import { useWaterStore } from '@/src/store/water-store';

const payload = loadPwsPayload();

export default function ContaminantsScreen() {
  const filter = useWaterStore((s) => s.filter);
  const setFilter = useWaterStore((s) => s.setFilter);
  const data = payload.analytes.filter((a) => matchesFilter(a, filter));

  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['bottom']}>
      <View className="flex-1 px-4 pt-2">
        <Text className="mb-1 text-sm leading-5 text-slate-700">
          Based on public monitoring data for Highlands Ranch Water. Compared with the
          EPA-style limit in the dataset when available.
        </Text>
        <FilterChips value={filter} onChange={setFilter} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.analyte_name}
          renderItem={({ item }) => <ContaminantCard analyte={item} />}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <Text className="mt-6 text-center text-sm text-slate-600">
              No measures match this filter in the current file.
            </Text>
          }
          accessibilityLabel="Contaminant measures list"
        />
      </View>
    </SafeAreaView>
  );
}
