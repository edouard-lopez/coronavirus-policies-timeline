import { getRegionsWithEvents } from '../Region/regions'

export const addLanes = (context, data, { margin, width, positionAt }) =>
  context
    .append('g')
    .selectAll('.region-lane')
    .data(getRegionsWithEvents(data))
    .enter()
    .append('g')
    .attr('class', (d) => `region-lane region-${d}`)
    .insert('rect')
    .attr('x', margin.right)
    .attr('y', (d, i) => positionAt(i))
    .attr('width', width)
    .attr('height', (d, i) => positionAt(i + 1))
    .attr('class', 'event-lane')
