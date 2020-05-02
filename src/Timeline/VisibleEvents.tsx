import { connect } from 'react-redux'
import data from '../data/events.json'
import { buildD3Data, getEvents } from '../events/Event'
import { regionsWithEvents } from '../Region/regions'
import { getSelectedRegions, RootState } from '../Region/regionSelectors'
import { Event } from '../types/event'
import { Regions } from '../types/region'
import { TimelineEvents } from '../types/timelineEvent'
import Timeline from './Timeline'

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
const connector = connect(mapStateToProps, {})

export default connector(Timeline)
