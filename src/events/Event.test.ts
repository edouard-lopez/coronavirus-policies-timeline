import { regionsWithEvents } from '../Region/regions'
import { Event, Events } from '../types/event'
import { Regions } from '../types/region'
import { TimelineEvent, TimelineEvents } from '../types/timelineEvent'
import {
  addStartAndEnd,
  addD3Metadata,
  addLane,
  buildD3Data,
  getEvents,
} from './Event'

const event1: Event = {
  published_date: '2020-01-05T00:00:00+00:00',
  url:
    'https://www.who.int/csr/don/05-january-2020-pneumonia-of-unkown-cause-china/en/',
  title: 'Pneumonia of unknown cause – China',
  tags: ['announcement', 'first-case'],
  entity: 'government',
  region: 'World',
}

const event2: Event = {
  published_date: '2020-03-13T08:00:17+08:00',
  url:
    'https://www.scmp.com/news/china/society/article/3074991/coronavirus-chinas-first-confirmed-covid-19-case-traced-back',
  title: "China's first confirmed Covid-19 case traced back to November 17",
  tags: ['virus'],
  entity: 'government',
  region: 'Europe',
}

test('add `start` and `end` based on published date', () => {
  const newEvent: Event = addStartAndEnd(event1)
  expect(newEvent).toEqual({ ...event1, start: 238, end: 243 })
})

test('addD3Metadata to item', () => {
  const regions: Regions = ['France', 'Europe', 'World']
  const newEvent: TimelineEvent = addD3Metadata(event1, regions)

  expect(newEvent).toEqual({
    ...event1,
    start: 238,
    end: 243,
    lane: regions.indexOf('World'),
  })
})

test('add `lane`', () => {
  const lane = 0
  const newEvent: Event = addLane(event1, lane)
  expect(newEvent).toEqual({ ...event1, lane: 0 })
})

test('buildD3Data', () => {
  const events: Events = [event1, event2]
  const timelineEvents: TimelineEvents = buildD3Data(events)

  expect(timelineEvents.length).toBe(2)
  expect(timelineEvents).toEqual([
    {
      ...event1,
      start: 238,
      end: 243,
      lane: regionsWithEvents.indexOf('World'),
    },
    {
      ...event2,
      start: 569,
      end: 574,
      lane: regionsWithEvents.indexOf('Europe'),
    },
  ])
})

test('should return events belonging to region with more events than default threshold', () => {
  const events: Events = [event1, event2]
  const timelineEvents: TimelineEvents = buildD3Data(events)
  const regionsWithEnoughEvents: Regions = ['Europe']

  expect(getEvents(timelineEvents, regionsWithEnoughEvents)).toEqual([
    {
      ...event2,
      start: 569,
      end: 574,
      lane: regionsWithEvents.indexOf('Europe'),
    },
  ])
})
