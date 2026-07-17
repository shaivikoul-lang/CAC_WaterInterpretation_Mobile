import type { Href } from 'expo-router';

/** Stale typed-routes cache may lag folder moves; cast keeps navigation working. */
export const EXPLORE_HOME = '/explore' as Href;
export const EXPLORE_CONTAMINANTS = '/explore/contaminants' as Href;
export const EXPLORE_TRENDS = '/explore/trends' as Href;
export const EXPLORE_LEARN = '/explore/learn' as Href;
export const GUIDED_HOME = '/' as Href;

/** Prefer explicit snapshot index so browse opens data, not the Guide tab. */
export const EXPLORE_SNAPSHOT = '/explore' as Href;
