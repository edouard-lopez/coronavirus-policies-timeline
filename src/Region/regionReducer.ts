import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { Regions } from '../types/region'
import { selectRegion, unSelectRegion } from './regionActions'

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
