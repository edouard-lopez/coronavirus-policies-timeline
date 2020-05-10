import { event1, event2 } from '../events/events.mock'
import { GanttItems } from '../types/gantt'
import { Regions } from '../types/region'
import { buildItemsCollection, addStartAndEnd } from './items'

test('should addStartAndEnd date', () => {
  expect(addStartAndEnd(event1)).toEqual({
    ...event1,
    start: 1578182400,
    end: 1578268800,
  })
})

test('should build items collection', () => {
  const regionsWithEvents: Regions = ['World', 'Europe']
  const items: GanttItems = buildItemsCollection(
    [event1, event2],
    regionsWithEvents
  )

  expect(items).toEqual({
    '1': {
      id: '1',
      rowId: 'world',
      label: 'Pneumonia of unknown cause – China',
      time: {
        end: 1578268800,
        start: 1578182400,
      },
    },
    '2': {
      id: '2',
      rowId: 'europe',
      label: "China's first confirmed Covid-19 case traced back to November 17",
      time: {
        end: 1584144017,
        start: 1584057617,
      },
    },
  })
})
