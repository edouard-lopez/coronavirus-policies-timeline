import { DateTime } from 'luxon'
import { colorize } from './colors'

const date = (d) => {
  return DateTime.fromISO(d.published_date).toLocaleString(DateTime.DATE_MED)
}

const title = (d) => `${d.title} [${date(d)}]`

export const drawZoomedEvents = (
  zoomArea,
  visibleEvents,
  { xStartPoint, yStartPoint, selectionStart }
) => {
  const xEvent = (d) => xStartPoint(Math.max(d.start, selectionStart))
  const y = (d) => yStartPoint(d.lane)
  const xLink = (d) => xStartPoint(Math.max(d.start, selectionStart))
  const width = (d) => xStartPoint(d.end) - xStartPoint(d.start)

  const zoomedEvents = zoomArea
    .selectAll('.zoomed-event')
    .data(visibleEvents, (d) => d)
    .attr('transform', (d) => `translate(${xEvent(d)},${y(d)})`)
    .enter()
    .append('g')
    .attr('class', 'zoomed-event')
    .attr('transform', (d) => `translate(${xEvent(d)},${y(d)})`)

  // eslint-disable-next-line no-unused-vars
  const rects = zoomedEvents
    .insert('rect')
    .attr('width', (d) => width(d))
    .attr('height', (d) => yStartPoint(1))
    .attr('style', (d) => colorize(d.lane))

  // eslint-disable-next-line no-unused-vars
  const links = zoomedEvents
    .insert('a')
    .attr('xlink:href', (d) => d.url)
    .attr('target', '_blank')
    .attr('transform', (d) => `translate(${xLink(d)}, 0)`)
    .append('text')
    .text((d) => title(d))
    .attr('transform', 'translate(2,12)')
    .attr('class', 'event-label')
    .attr('text-anchor', 'start')

  zoomedEvents.exit().remove()

  return zoomedEvents
}
