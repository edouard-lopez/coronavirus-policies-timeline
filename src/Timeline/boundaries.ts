import { DateTime } from 'luxon'

const pandemyDuration = (now: DateTime = DateTime.fromSeconds(Date.now())) => {
  const end = DateTime.fromSeconds(
    Math.min(now.toSeconds(), END_OF_2020.toSeconds())
  )
  // const end = now
  return end.diff(FIRST_CASE)
}

const FIRST_CASE = DateTime.fromISO('2019-11-17T00:00:00+00:00') // 17 November 2019 https://www.theguardian.com/world/2020/mar/13/first-covid-19-case-happened-in-november-china-government-records-show-report
const END_OF_2020 = DateTime.fromISO('2020-12-31T23:59:59+00:00')
const PANDEMY_DURATION = pandemyDuration()
const GRAPH_WIDTH = 2000 // pixels
const MAP_DATA_TO_GRAPH = PANDEMY_DURATION.as('seconds') / GRAPH_WIDTH
const MIN_ITEM_WIDTH = 5 // pixels
const GRAPH_BEGIN = 0

const projectToGraph = (start: DateTime, end: DateTime) => {
  const start_at = start.diff(FIRST_CASE).as('seconds') / MAP_DATA_TO_GRAPH
  const end_at = Math.max(
    end.diff(FIRST_CASE).as('seconds') / MAP_DATA_TO_GRAPH,
    start_at + MIN_ITEM_WIDTH
  )

  return {
    start: Math.round(start_at),
    end: Math.round(end_at),
  }
}

export {
  END_OF_2020,
  FIRST_CASE,
  GRAPH_BEGIN,
  GRAPH_WIDTH,
  MAP_DATA_TO_GRAPH,
  MIN_ITEM_WIDTH,
  pandemyDuration,
  projectToGraph,
}
