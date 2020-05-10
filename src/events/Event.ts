import { Events } from '../types/event'
import { Regions } from '../types/region'

const getEvents = (events: Events, regions: Regions) =>
  events.filter((event) => regions.includes(event.region))

export { getEvents }

