import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { Regions } from '../types/region'
import { REGION_FILTERS, selectRegion, setRegionFilter, unSelectRegion } from './regionActions'

export function selectedRegions(state: Regions = [], action: Action) {
  if (isType(action, selectRegion)) {
    return [...state, action.payload.region]
  }

  if (isType(action, unSelectRegion)) {
    return [
      ...state.filter((region: string) => region !== action.payload.region),
    ]
  }

  return state
}

export function regionFilter(state = REGION_FILTERS.SHOW_ALL, action: Action) {
  if (isType(action, setRegionFilter)) {
    return action.payload.filter
  }
  return state
}
