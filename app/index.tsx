import { ConcernEntry } from '@/src/components/guided/ConcernEntry';
import { loadPwsPayload } from '@/src/lib/loadData';

const payload = loadPwsPayload();

export default function HomeScreen() {
  return <ConcernEntry utilityLabel={payload.pws_label} />;
}
