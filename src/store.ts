import { combineReducers, createStore, compose } from 'redux'
import { regionFilter, selectedRegions } from './Region/regionReducer'

export const reducers = combineReducers({
  regionFilter,
  selectedRegions,
})
const initialState = {}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, initialState, composeEnhancers())

export default store
