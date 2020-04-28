import { combineReducers, createStore } from 'redux'
import events from './data/events.json'
import { entities } from './Entity/entities'
import { regionFilter, selectedRegions } from './Region/regionReducer'
import { regions } from './Region/regions'
import { tags } from './Tag/tags'

const initialState = {
  regions,
  tags,
  entities,
  events,
}

const store = createStore(
  combineReducers({
    regionFilter,
    selectedRegions,
  }),
  {}
)

export default store
