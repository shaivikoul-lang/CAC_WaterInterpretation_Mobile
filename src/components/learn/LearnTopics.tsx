import { Linking, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ExternalLink } from '@/src/components/ui/ExternalLink';
import { EDUCATION_INTRO_FALLBACK, FEEDBACK_MAILTO } from '@/src/lib/copy';
import { encodeAnalyteParam } from '@/src/lib/filters';
import { loadEducationPayload } from '@/src/lib/loadData';
import { EXPLORE_CONTAMINANTS } from '@/src/lib/nav';
import { useWaterStore } from '@/src/store/water-store';

const education = loadEducationPayload();

type Topic = {
  id: string;
  title: string;
  body: string[];
  links?: { label: string; url: string }[];
  actions?: { label: string; onPress: () => void }[];
};

export function LearnTopics() {
  const setFilter = useWaterStore((s) => s.setFilter);

  const topics: Topic[] = [
    {
      id: 'taste',
      title: 'Taste & odor / source changes',
      body: [
        'Colorado’s public EPHT monitoring export does not include a single “taste” or “odor” measurement. What you notice at the faucet can reflect plumbing, seasonal treatment, or local conditions that are not the same as plant monitoring summaries.',
        'If you notice a chlorine/chemical smell, related public measures sometimes discussed in education materials include disinfection byproducts such as TTHMs and HAA5—those are context, not a diagnosis of your tap.',
        'HRW-specific taste/odor guidance is best confirmed from Highlands Ranch Water’s own public materials (for example the Consumer Confidence Report). Content here is educational and may be updated when utility-approved wording is available.',
      ],
      actions: [
        {
          label: 'Open TTHM in contaminants',
          onPress: () => {
            setFilter('tthm');
            router.push(EXPLORE_CONTAMINANTS);
          },
        },
      ],
      links: [
        {
          label: 'Highlands Ranch Water website',
          url: 'https://www.highlandsranchwater.org/',
        },
      ],
    },
    {
      id: 'hardness',
      title: 'Hard water / softeners',
      body: [
        'Hardness is a common resident question (scale, softeners, soap). This Highlands Ranch Water monitoring file may not include a hardness analyte—if you do not see it under Contaminants, that means it is not in this public export, not that hardness is “zero.”',
        'Softener and filtration choices are household decisions. This app does not recommend products. Use utility and health-department materials for general education.',
      ],
    },
    {
      id: 'lead',
      title: 'Lead & copper',
      body: [
        'Based on public materials discussed for Highlands Ranch Water: the utility has reported no lead service lines, but lead and copper are still monitored because home plumbing and fixtures can contribute at the tap.',
        'Public system monitoring is not a test of water at your faucet. If you have plumbing concerns, use official utility guidance and certified testing—not this educational interpreter.',
      ],
      actions: [
        {
          label: 'View Lead & Copper measures',
          onPress: () => {
            setFilter('lead_copper');
            router.push(EXPLORE_CONTAMINANTS);
          },
        },
      ],
    },
    {
      id: 'pfas',
      title: 'PFAS overview',
      body: [
        'PFAS is a family of chemicals. This file may include compounds such as PFOA, PFOS, PFBS, PFHxS, and PFNA. Rules and scoring differ by compound—some rows are not auto-scored; the app shows measured values and official links without inventing a risk score.',
        'Use EPA and CDPHE pages for current rules and health reference material.',
      ],
      actions: [
        {
          label: 'View PFAS measures',
          onPress: () => {
            setFilter('pfas');
            router.push(EXPLORE_CONTAMINANTS);
          },
        },
        {
          label: 'Open PFOA detail',
          onPress: () => router.push(`/contaminant/${encodeAnalyteParam('PFOA')}`),
        },
      ],
      links: [
        {
          label: 'EPA — PFAS in drinking water',
          url: 'https://www.epa.gov/pfas/pfas-drinking-water',
        },
      ],
    },
    {
      id: 'feedback',
      title: 'Send feedback',
      body: [
        'Suggestions and corrections help keep wording careful and useful. This opens your email app with a draft message (placeholder address for v1).',
      ],
      actions: [
        {
          label: 'Email feedback',
          onPress: () => Linking.openURL(FEEDBACK_MAILTO),
        },
      ],
    },
  ];

  return (
    <View className="gap-4">
      <Text className="text-sm leading-5 text-slate-700">
        Educational topics for residents. Based on public monitoring data for Highlands Ranch
        Water—not medical advice and not a tap test.
      </Text>
      <Text className="text-sm leading-5 text-slate-600">
        {education.intro || EDUCATION_INTRO_FALLBACK}
      </Text>
      {topics.map((topic) => (
        <View
          key={topic.id}
          className="rounded-2xl border border-slate-200 bg-white p-4"
          accessibilityRole="summary"
        >
          <Text className="text-lg font-semibold text-slate-900" accessibilityRole="header">
            {topic.title}
          </Text>
          {topic.body.map((p) => (
            <Text key={p.slice(0, 48)} className="mt-2 text-sm leading-5 text-slate-700">
              {p}
            </Text>
          ))}
          {topic.actions?.map((a) => (
            <Pressable
              key={a.label}
              onPress={a.onPress}
              accessibilityRole="button"
              accessibilityLabel={a.label}
              className="mt-3 min-h-[44px] items-center justify-center rounded-xl bg-sky-700 px-4 py-3 active:bg-sky-800"
            >
              <Text className="font-semibold text-white">{a.label}</Text>
            </Pressable>
          ))}
          {topic.links?.map((l) => (
            <View key={l.url} className="mt-2">
              <ExternalLink label={l.label} url={l.url} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
