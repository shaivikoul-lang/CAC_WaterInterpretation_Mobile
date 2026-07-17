import type { EducationPayload, PwsPayload } from './water';

import outputJson from '../../assets/data/output.json';
import educationJson from '../../assets/data/education.json';

export function loadPwsPayload(): PwsPayload {
  return outputJson as PwsPayload;
}

export function loadEducationPayload(): EducationPayload {
  return educationJson as EducationPayload;
}

export function findAnalyte(payload: PwsPayload, name: string) {
  return payload.analytes.find((a) => a.analyte_name === name);
}
