import { Region } from '../types/region'

export const SET_REGION_FILTER = 'SET_REGION_FILTER'
export const SELECT_REGION = 'SELECT_REGION'
export const UNSELECT_REGION = 'UNSELECT_REGION'

export function selectRegion(payload: { text: string; region: Region }) {
  return {
    type: SELECT_REGION,
    payload,
  }
}

export function unSelectRegion(payload: { text: string; region: Region }) {
  return {
    type: UNSELECT_REGION,
    payload,
  }
}

export const RegionFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SELECTED: 'SHOW_SELECTED',
}

export function setRegionFilter(payload: { filter: string }) {
  return { type: SET_REGION_FILTER, payload }
}
