import { combineReducers, compose, createStore } from 'redux'
import { selectedRegions } from './Region/regionReducer'

export const reducers = combineReducers({
  selectedRegions,
})
const initialState = {}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, initialState, composeEnhancers())

export default store
