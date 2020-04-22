import { Events } from '../types/event'
import {
  countEventsByRegions,
  getRegionsWithEvents,
  MIN_EVENTS_FOR_REGION_VISIBILITY,
} from './regions'

test('should return list of regions with number of occurences', () => {
  const events = [
    { region: 'France' },
    { region: 'France' },
    { region: 'USA' },
  ] as Events

  expect(countEventsByRegions(events)).toEqual([
    { region: 'France', count: 2 },
    { region: 'USA', count: 1 },
  ])
})

test('should return all regions with at least `THRESHOLD` events', () => {
  const events = [
    { region: 'France' },
    { region: 'France' },
    { region: 'USA' },
    { region: 'Asia' },
    { region: 'Asia' },
  ] as Events
  const THRESHOLD = 2

  expect(getRegionsWithEvents(events, THRESHOLD)).toEqual(['France', 'Asia'])
})

test('should return only regions with more events than default threshold', () => {
  const events = Array(MIN_EVENTS_FOR_REGION_VISIBILITY).fill({
    region: 'France',
  }) as Events

  expect(getRegionsWithEvents(events)).toEqual(['France'])
})
