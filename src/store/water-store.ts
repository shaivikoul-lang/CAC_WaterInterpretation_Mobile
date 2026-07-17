import { create } from 'zustand';
import type { ContaminantFilter } from '@/src/lib/water';

type WaterStore = {
  filter: ContaminantFilter;
  setFilter: (filter: ContaminantFilter) => void;
};

export const useWaterStore = create<WaterStore>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));
