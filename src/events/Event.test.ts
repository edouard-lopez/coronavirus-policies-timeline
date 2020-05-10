import { getEvents } from './Event'
import { events } from './events.mock'
import { Regions } from '../types/region'

test.todo('should getEvents', () => {
  const regions: Regions = ['France', 'United Kingdom']
  
  expect(getEvents(events, regions)).toEqual([])
})
