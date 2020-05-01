import { Regions } from '../types/region'

export interface RootState {
  selectedRegions: Regions
  regionFilter: string
}

export const getSelectedRegions = (state: RootState) => state.selectedRegions
