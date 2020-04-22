import React, { useEffect, useRef } from 'react'
import { Regions } from '../types/region'
import { TimelineEvents } from '../types/timelineEvent'
import drawGraph from './drawGraph'
import './Timeline.css'

interface TimelineProps {
  events: TimelineEvents
  regions: Regions
}
const Timeline = ({ events, regions }: TimelineProps) => {
  const graph = useRef(null)

  useEffect(() => drawGraph(graph, regions, events))

  return <div ref={graph} data-testid='chart'></div>
}

export default Timeline
