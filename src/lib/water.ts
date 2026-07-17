export interface YearRow {
  year: number;
  max_concentration: number | null;
  avg_concentration?: number | null;
  sdwa_limit: number | null;
  unit?: string | null;
  category?: string | null;
  over_limit?: boolean;
  risk_score?: number | null;
  score_available?: boolean;
  score_reason?: string | null;
  guidance?: string | null;
  plain_explanation?: string | null;
  amount_over_display?: string | null;
}

export interface AnalytePack {
  analyte_name: string;
  summary_latest_year: number;
  by_year: YearRow[];
}

export interface ExceedRow {
  analyte_name: string;
  year: number;
  summary: string;
}

export interface PwsPayload {
  lane: string;
  pws_label: string;
  pws_id_number: string;
  pws_names_in_export?: string[];
  county?: string;
  generated_at: string;
  current_year?: number;
  source?: string;
  dataset?: string;
  limitations?: string;
  data_year_max?: number;
  confidence?: string;
  years_present: number[];
  analytes: AnalytePack[];
  exceedances_all_years: ExceedRow[];
}

export interface EduLink {
  label: string;
  url: string;
}

export interface EduEntry {
  tier: 'expanded' | 'links_only';
  hook: string;
  links: EduLink[];
  expanded?: string[];
}

export interface EducationPayload {
  version: number;
  intro: string;
  by_analyte_name: Record<string, EduEntry>;
}

export type ContaminantFilter =
  | 'all'
  | 'pfas'
  | 'lead_copper'
  | 'arsenic'
  | 'tthm'
  | 'attention';
