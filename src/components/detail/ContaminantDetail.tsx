import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import type { AnalytePack, YearRow } from '@/src/lib/water';
import { formatConcentration, latestRowForAnalyte } from '@/src/lib/derive';
import { DisclaimerBanner } from '@/src/components/ui/DisclaimerBanner';
import { ExternalLink } from '@/src/components/ui/ExternalLink';
import type { EduEntry } from '@/src/lib/water';
import { CATEGORY_LABELS } from '@/src/lib/copy';

type Props = {
  analyte: AnalytePack;
  education?: EduEntry;
};

function chartData(rows: YearRow[]) {
  return [...rows]
    .filter((r) => r.max_concentration != null)
    .sort((a, b) => a.year - b.year)
    .map((r) => ({
      value: r.max_concentration as number,
      label: String(r.year).slice(2),
      dataPointText: '',
    }));
}

export function ContaminantDetail({ analyte, education }: Props) {
  const row = latestRowForAnalyte(analyte);
  const data = chartData(analyte.by_year);
  const width = Dimensions.get('window').width - 48;
  const limit = row?.sdwa_limit;
  const unit = row?.unit ?? '';

  const a11yChart = `Trend chart for ${analyte.analyte_name} across ${data.length} years with measured values${
    limit != null ? ` compared with dataset limit ${limit} ${unit}` : ''
  }.`;

  return (
    <View className="gap-4 pb-8">
      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-2xl font-bold text-slate-900" accessibilityRole="header">
          {analyte.analyte_name}
        </Text>
        <Text className="mt-2 text-sm text-slate-700">
          Latest year {row?.year ?? '—'}:{' '}
          {formatConcentration(row?.max_concentration ?? null, row?.unit)}
        </Text>
        <Text className="mt-1 text-sm text-slate-700">
          Limit in this dataset:{' '}
          {formatConcentration(row?.sdwa_limit ?? null, row?.unit)}
        </Text>
        {row?.category && row.score_available !== false ? (
          <Text className="mt-2 text-sm font-medium text-slate-800">
            Category: {CATEGORY_LABELS[row.category] ?? row.category}
          </Text>
        ) : (
          <Text className="mt-2 text-sm text-slate-600">
            {row?.score_reason ||
              'Score not available—showing measured values only.'}
          </Text>
        )}
        {row?.plain_explanation ? (
          <Text className="mt-3 text-sm leading-5 text-slate-700">
            {row.plain_explanation}
          </Text>
        ) : null}
        {row?.guidance ? (
          <Text className="mt-2 text-sm leading-5 text-slate-600">{row.guidance}</Text>
        ) : null}
      </View>

      <View
        className="rounded-2xl border border-slate-200 bg-white p-4"
        accessibilityLabel={a11yChart}
      >
        <Text className="mb-2 text-base font-semibold text-slate-900">
          Multi-year trend
        </Text>
        <Text className="mb-3 text-xs text-slate-600">
          Measured max by year{limit != null ? ` · dashed idea: limit ${limit} ${unit}` : ''}
        </Text>
        {data.length > 1 ? (
          <LineChart
            data={data}
            width={width}
            height={220}
            color="#0369a1"
            thickness={2}
            dataPointsColor="#0369a1"
            hideRules={false}
            rulesColor="#e2e8f0"
            yAxisColor="#94a3b8"
            xAxisColor="#94a3b8"
            yAxisTextStyle={{ color: '#475569', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#475569', fontSize: 9 }}
            noOfSections={4}
            curved
            areaChart
            startFillColor="#bae6fd"
            endFillColor="#f0f9ff"
            startOpacity={0.4}
            endOpacity={0.05}
            {...(limit != null && limit > 0
              ? {
                  referenceLine1Position: limit,
                  referenceLine1Config: {
                    color: '#be123c',
                    dashWidth: 4,
                    dashGap: 4,
                    thickness: 1.5,
                    labelText: 'Limit',
                    labelTextStyle: { color: '#9f1239', fontSize: 10 },
                  },
                }
              : {})}
          />
        ) : (
          <Text className="text-sm text-slate-600">
            Not enough yearly points to draw a trend for this measure.
          </Text>
        )}
      </View>

      {education ? (
        <View className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
            Plain-language context
          </Text>
          <Text className="mt-2 text-sm leading-5 text-slate-700">{education.hook}</Text>
          {education.expanded?.map((para) => (
            <Text key={para.slice(0, 40)} className="mt-2 text-sm leading-5 text-slate-700">
              {para}
            </Text>
          ))}
          <View className="mt-3">
            {education.links.map((link) => (
              <ExternalLink key={link.url} label={link.label} url={link.url} />
            ))}
          </View>
        </View>
      ) : null}

      <DisclaimerBanner variant="detail" />
    </View>
  );
}
