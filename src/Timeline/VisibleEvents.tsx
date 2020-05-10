import { connect } from 'react-redux'
import data from '../data/events.json'
import { getEvents } from '../events/Event'
import { regionsWithEvents } from '../Region/regions'
import { getSelectedRegions, RootState } from '../Region/regionSelectors'
import { Event, Events } from '../types/event'
import GanttTimeline from './GanttTimeline'
import { Regions } from '../types/region'

const sortByRegion = (a: Event, b: Event) => {
  if (a.region > b.region) {
    return 1
  }
  if (a.region < b.region) {
    return -1
  }
  return 0
}


const getVisibleEvents = (events: Events, regions: Regions = regionsWithEvents) => {
  const visibileEvents = getEvents(
    events.sort(sortByRegion),
    regionsWithEvents
  )
  return visibileEvents
}

const mapStateToProps = (state: RootState) => ({
  regions: getSelectedRegions(state),
  events: getVisibleEvents(data as Events)
})
const connector = connect(mapStateToProps, {})

export default connector(GanttTimeline)
