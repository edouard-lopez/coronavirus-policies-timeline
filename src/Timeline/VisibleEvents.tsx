import { connect } from 'react-redux'
import data from '../data/events.json'
import { Event } from '../types/event'
import { Regions } from '../types/region'
import { TimelineEvents } from '../types/timelineEvent'
import { buildD3Data, getEvents } from '../events/Event'
import {
  selectRegion,
  setRegionFilter,
  unSelectRegion,
} from '../Region/regionActions'
import { regionsWithEvents } from '../Region/regions'
import Timeline from './Timeline'
import { RootState, getSelectedRegions } from '../Region/regionSelectors'

const sortByRegion = (a: Event, b: Event) => {
  if (a.region > b.region) {
    return 1
  }
  if (a.region < b.region) {
    return -1
  }
  return 0
}

const timelineEvents = buildD3Data(data as TimelineEvents)

const getVisibleEvents = (events: TimelineEvents, regions: Regions) => {
  const visibileEvents = getEvents(
    timelineEvents.sort(sortByRegion),
    regionsWithEvents
  )
  return visibileEvents
}

const mapStateToProps = (state: RootState) => ({
  regions: getSelectedRegions(state),
  events: getVisibleEvents(timelineEvents, getSelectedRegions(state)),
})

const mapDispatchToProps = {
  selectRegion: () => selectRegion,
  unSelectRegion: () => unSelectRegion,
  setRegionFilter: () => setRegionFilter,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Timeline)