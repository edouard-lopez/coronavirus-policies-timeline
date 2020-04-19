import { Action } from 'redux'
import { Regions } from '../types/region'
import { REGION_FILTERS, SELECT_REGION, SET_REGION_FILTER, UNSELECT_REGION } from './regionActions'

export function seletcedRegions(state: Regions = [], action: Action) {
  switch (action.payload.type) {
    case SELECT_REGION:
      return [...state, action.payload.region]
    case UNSELECT_REGION:
      return [
        ...state.filter((region: string) => region !== action.payload.region),
      ]
    default:
      return state
  }
}

export function regionFilter(state = REGION_FILTERS.SHOW_ALL, action: Action) {
  switch (action.payload.type) {
    case SET_REGION_FILTER:
      return action.payload.filter
    default:
      return state
  }
}
