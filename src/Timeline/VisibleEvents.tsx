import React, { useState } from 'react'
import data from '../data/events.json'
import { buildD3Data } from '../events/Event'
import { regionsWithEvents } from '../Region/regions'
import { Event } from '../types/event'
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

function VisibleEvents() {
  const timelineEvents = buildD3Data(data as TimelineEvents)
  timelineEvents.sort(sortByRegion)
  const [regions] = useState(regionsWithEvents)
  const [events] = useState(timelineEvents)

  return <Timeline events={events} regions={regions} />
}

export default VisibleEvents
