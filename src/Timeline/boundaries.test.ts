import { DateTime } from 'luxon'
import {
  projectToGraph,
  FIRST_CASE,
  MIN_ITEM_WIDTH,
  GRAPH_BEGIN,
  pandemyDuration,
  END_OF_2020,
} from './boundaries'

test('project initial date to graph', () => {
  const event_start = FIRST_CASE
  const event_end = event_start.plus({ days: 1 })
  const projectedValue = projectToGraph(event_start, event_end)

  expect(projectedValue.start).toBe(GRAPH_BEGIN)
})

test('projection compute a minimal width', () => {
  const event_start = DateTime.fromISO('2020-03-17T00:00:00+00:00')
  const event_end = event_start.plus({ hours: 12 })

  const projectedValue = projectToGraph(event_start, event_end)

  expect(projectedValue.start).toBe(589)
  expect(projectedValue.end).toBe(589 + MIN_ITEM_WIDTH)
})

test('pandemy duration finish before end of 2020', () => {
  const lastEvent = DateTime.fromISO('2020-01-31')

  expect(pandemyDuration(lastEvent).as('seconds')).toStrictEqual(
    lastEvent.diff(FIRST_CASE).as('seconds')
  )
})

test('pandemy duration finish at the end of 2020', () => {
  const lastEvent = DateTime.fromISO('2022-01-31')

  expect(pandemyDuration(lastEvent).as('seconds')).toStrictEqual(
    END_OF_2020.diff(FIRST_CASE).as('seconds')
  )
})
