import { Text, View } from 'react-native';
import { ExternalLink } from '@/src/components/ui/ExternalLink';
import { SOURCE_LINKS, TRUST_BODY, TRUST_FOOTER } from '@/src/lib/copy';
import type { PwsPayload } from '@/src/lib/water';

type Props = {
  payload: PwsPayload;
};

export function AboutTrust({ payload }: Props) {
  return (
    <View className="gap-4 pb-8">
      <View className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <Text className="text-lg font-semibold text-slate-900" accessibilityRole="header">
          One-sentence pitch
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-800">{TRUST_BODY}</Text>
      </View>

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          System identity
        </Text>
        <Text className="mt-2 text-sm text-slate-700">
          Display name: {payload.pws_label}
        </Text>
        <Text className="mt-1 text-sm text-slate-700">
          PWS ID: {payload.pws_id_number}
        </Text>
        {payload.pws_names_in_export?.length ? (
          <Text className="mt-1 text-sm text-slate-700">
            Regulatory listing names in export: {payload.pws_names_in_export.join(', ')}
          </Text>
        ) : (
          <Text className="mt-1 text-sm text-slate-700">
            Regulatory listing: Centennial WSD (confirm against CDPHE materials)
          </Text>
        )}
        {payload.county ? (
          <Text className="mt-1 text-sm text-slate-700">County: {payload.county}</Text>
        ) : null}
      </View>

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          Data source & limitations
        </Text>
        {payload.source ? (
          <Text className="mt-2 text-sm leading-5 text-slate-700">Source: {payload.source}</Text>
        ) : null}
        {payload.dataset ? (
          <Text className="mt-1 text-sm leading-5 text-slate-700">Dataset: {payload.dataset}</Text>
        ) : null}
        {payload.limitations ? (
          <Text className="mt-2 text-sm leading-5 text-slate-700">{payload.limitations}</Text>
        ) : null}
        {payload.confidence ? (
          <Text className="mt-2 text-sm leading-5 text-slate-700">
            Confidence note: {payload.confidence}
          </Text>
        ) : null}
        <Text className="mt-3 text-sm leading-5 text-slate-700">{TRUST_FOOTER}</Text>
      </View>

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          Primary sources
        </Text>
        <View className="mt-2">
          {SOURCE_LINKS.map((l) => (
            <ExternalLink key={l.url} label={l.label} url={l.url} />
          ))}
        </View>
      </View>

      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          Accessibility
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Status uses text labels and icons—not color alone. Charts include screen-reader
          summaries. Tap targets aim for at least 44×44 points. If something is hard to use with
          VoiceOver or TalkBack, please send feedback from the Learn tab.
        </Text>
      </View>

      <View className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <Text className="text-base font-semibold text-slate-900" accessibilityRole="header">
          Refreshing data
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Rebuild JSON in the CAC_WaterInterpretation_Arshia repo with
          pws/CO0118015_hrw/build_pws_output.py, then copy output.json and education.json into
          this app’s assets/data/ folder and reload. See README for details.
        </Text>
      </View>
    </View>
  );
}
