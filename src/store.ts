import { combineReducers, createStore } from 'redux'
import { regionFilter, selectedRegions } from './Region/regionReducer'

export const reducers = combineReducers({
  regionFilter,
  selectedRegions,
})
const initialState = {}

const store = createStore(reducers, initialState)

export default store
