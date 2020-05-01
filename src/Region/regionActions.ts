import { Region } from '../types/region'
import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

const SET_REGION_FILTER = 'SET_REGION_FILTER'
const SELECT_REGION = 'SELECT_REGION'
const UNSELECT_REGION = 'UNSELECT_REGION'

const selectRegion = actionCreator<{ region: Region }>(SELECT_REGION)
const unSelectRegion = actionCreator<{ region: Region }>(UNSELECT_REGION)

export {
  SET_REGION_FILTER,
  SELECT_REGION,
  UNSELECT_REGION,
  selectRegion,
  unSelectRegion,
}
