import { Regions } from '../types/region'
import { regionsWithEvents } from './regions'
import { isEmpty } from '../helpers/array'

export interface RootState {
  selectedRegions: Regions
  regionFilter: string
}

export const getSelectedRegions = (
  state: RootState,
  defaultRegions: Regions = regionsWithEvents
) => isEmpty(state.selectedRegions) ? defaultRegions : state.selectedRegions