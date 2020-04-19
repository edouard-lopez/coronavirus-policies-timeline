import { Region } from '../types/region'
import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

const SET_REGION_FILTER = 'SET_REGION_FILTER'
const SELECT_REGION = 'SELECT_REGION'
const UNSELECT_REGION = 'UNSELECT_REGION'
const REGION_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SELECTED: 'SHOW_SELECTED',
}

const selectRegion = actionCreator<{ region: Region }>(SELECT_REGION)
const unSelectRegion = actionCreator<{ region: Region }>(UNSELECT_REGION)
const setRegionFilter = actionCreator<{ filter: string }>(SET_REGION_FILTER)

export {
  SET_REGION_FILTER,
  SELECT_REGION,
  UNSELECT_REGION,
  REGION_FILTERS,
  selectRegion,
  unSelectRegion,
  setRegionFilter,
}
