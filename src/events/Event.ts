import { DateTime } from 'luxon'
import { regionsWithEvents } from '../Region/regions'
import { projectToGraph } from '../Timeline/boundaries'
import { Event, Events } from '../types/event'
import { Regions } from '../types/region'
import { TimelineEvent, TimelineEvents } from '../types/timelineEvent'

const buildD3Data = (dataset: Events): TimelineEvents => {
  const data: TimelineEvents = []

  dataset.forEach((event) => {
    const eventWithMetadata = addD3Metadata(event)
    data.push(eventWithMetadata)
  })

  return data
}

const addLane = (event: Event, lane: number): TimelineEvent =>
  ({ ...event, lane } as TimelineEvent)

const addD3Metadata = (
  event: Event,
  regions: Regions = regionsWithEvents
): TimelineEvent => {
  const lane = regions.indexOf(event.region)

  return addLane(addStartAndEnd(event), lane)
}

const addStartAndEnd = (event: Event) => {
  const published_date = DateTime.fromISO(event.published_date)
  const { start, end } = projectToGraph(
    published_date,
    published_date.plus({ days: 1 })
  )

  return {
    ...event,
    start,
    end,
  }
}

const getVisibileEvents = (events: TimelineEvents, regions: Regions) =>
  events.filter((event) => regions.includes(event.region))

export {
  buildD3Data,
  addLane,
  addD3Metadata,
  addStartAndEnd,
  getVisibileEvents,
}
