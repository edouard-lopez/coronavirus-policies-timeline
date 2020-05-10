import React, { useEffect } from 'react'
import GSTC from 'react-gantt-schedule-timeline-calendar'
import { buildRowsCollection } from '../Gantt/rows'
import { regionsWithEvents } from '../Region/regions'
import { buildItemsCollection } from '../Gantt/items'

const GanttTimeline = ({ events, regions }) => {
  const rows = buildRowsCollection(regionsWithEvents)
  const items = buildItemsCollection(events, regionsWithEvents)

  const config = {
    height: 300,
    list: {
      rows,
      columns: {
        data: {
          id: {
            id: 'id',
            data: 'id',
            width: 50,
            header: {
              content: 'ID',
            },
          },
          label: {
            id: 'label',
            data: 'label',
            width: 200,
            header: {
              content: 'Label',
            },
          },
        },
      },
    },
    chart: { items },
  }

  let subs = []

  const onState = (state) => null

  useEffect(() => {
    return () => {
      subs.forEach((unsub) => unsub())
    }
  })

  return (
    <div className='App'>
      <GSTC config={config} onState={onState} />
    </div>
  )
}

export default GanttTimeline
