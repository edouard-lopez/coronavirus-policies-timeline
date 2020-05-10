import { DateTime } from 'luxon'
import { Event, Events } from '../types/event'
import { GanttItems } from '../types/gantt'
import { Regions } from '../types/region'
import { TimelineEvent, TimelineEvents } from '../types/timelineEvent'
import { idify } from "./rows";

export const addStartAndEnd = (event: Event):TimelineEvent => {
    const published_date = DateTime.fromISO(event.published_date)
    const start = published_date.toSeconds()
    const end = published_date.plus({ days: 1 }).toSeconds()
  
    return {
      ...event,
      start,
      end,
    }
  }
  
export const buildItemsCollection = (events: Events, regions:Regions): GanttItems => {
  const items: GanttItems = {}

  const timelineEvents:TimelineEvents = events.map(event => addStartAndEnd(event))

  timelineEvents.forEach((event, index) => {
    const itemId: string = `${index+1}`
    const rowId: string = idify(event.region)

    items[itemId] = {
      id: itemId,
      rowId,
      label: event.title,
      time: {
        start: event.start,
        end: event.end,
      },
    }
  })
  return items
}
