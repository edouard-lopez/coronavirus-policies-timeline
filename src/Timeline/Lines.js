import { getRegionsWithEvents } from '../Region/regions'

export const addLines = (context, data, { margin, width, positionAt }) => {
  const lanes = context
    .append('g')
    .selectAll('.region-lane')
    .data(getRegionsWithEvents(data))
    .enter()
    .append('g')
    .attr('class', (d) => `region-lane region-${d}`)
  lanes
    .insert('line')
    .attr('x1', margin.right)
    .attr('y1', (d, i) => positionAt(i))
    .attr('x2', width)
    .attr('y2', (d, i) => positionAt(i))
    .attr('class', 'event-line')
  lanes
    .insert('rect')
    .attr('x', margin.right)
    .attr('y', (d, i) => positionAt(i))
    .attr('width', width)
    .attr('height', (d, i) => positionAt(i + 1))
    .attr('class', 'event-lane')

  return lanes
}
