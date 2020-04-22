import * as d3 from 'd3'
import { DateTime } from 'luxon'
import { drawZoomedEvents } from './ZoomArea'

const date = (d) => {
  return DateTime.fromISO(d.published_date).toLocaleString(DateTime.DATE_MED)
}
const title = (d) => `${date(d)}: ${d.title}`

const wrap = (text, width) => {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr('y'),
      dy = parseFloat(text.attr('dy')),
      tspan = text
        .text(null)
        .append('tspan')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', dy + 'em')
    while ((word = words.pop())) {
      line.push(word)
      tspan.text(line.join(' '))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word)
      }
    }
  })
}

const drawBrush = (data, { x, xStartPoint, yStartPoint }, zoomArea) => {
  const selection = d3.event && d3.event.selection
  if (!selection) return
  let labels,
    timeSelection = selection.map(x.invert),
    minExtent = timeSelection[0],
    maxExtent = timeSelection[1],
    visibleEvents = data.filter((d) => d.start < maxExtent && d.end > minExtent)

  xStartPoint.domain([minExtent, maxExtent])

  drawZoomedEvents(zoomArea, visibleEvents, {
    xStartPoint,
    yStartPoint,
  })

  //update the event labels
  labels = zoomArea
    .selectAll('.event-link')
    .data(visibleEvents, (d) => title(d))
    .attr('transform', (d) =>
      translateLabel(d, { xStartPoint, yStartPoint, minExtent })
    )

  labels
    .enter()
    .append('a')
    .attr('class', 'event-link')
    .attr('transform', (d) =>
      translateLabel(d, { xStartPoint, yStartPoint, minExtent })
    )
    .attr('xlink:href', (d) => d.url)
    .attr('target', '_blank')
    .append('text')
    .text((d) => title(d))
    .attr('class', 'event-label')
    .attr('text-anchor', 'start')

  labels.exit().remove()
}

const translateLabel = (
  d,
  { xStartPoint, yStartPoint, minExtent },
  offset = 2
) => {
  const x = xStartPoint(Math.max(d.start, minExtent) + offset)
  const y = yStartPoint(d.lane + 0.5)
  return `translate(${x}, ${y})`
}

export { date, title, drawBrush }
