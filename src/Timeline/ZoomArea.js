import { addLanes } from './Lanes'
import { addRegionLabels } from './RegionLabels.js'
import { title } from './Brush'
import { colorize } from './colors'

const drawZoomArea = (
  data,
  { svg, margin, width, zoomAreaHeight, yStartPoint },
  lanes
) => {
  const zoomArea = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', zoomAreaHeight)
    .attr('class', 'zoomArea')

  //zoomArea lanes and texts
  addLanes(zoomArea, data, { margin, width, positionAt: yStartPoint })
  addRegionLabels(zoomArea, lanes, {
    margin,
    positionAt: yStartPoint,
    classes: ['pf-c-title'],
  })

  return zoomArea.append('g').attr('clip-path', 'url(#clip)')
}

const drawZoomedEvents = (
  zoomArea,
  visibleEvents,
  { xStartPoint, yStartPoint }
) => {
  //update zoomArea event rects
  const zoomedEvents = zoomArea
    .selectAll('rect')
    .data(visibleEvents, (d) => title(d))
    .attr('x', (d) => xStartPoint(d.start))
    .attr('width', (d) => xStartPoint(d.end) - xStartPoint(d.start))

  zoomedEvents
    .enter()
    .append('rect')
    .attr('class', 'zoomed-event')
    .attr('x', (d) => xStartPoint(d.start))
    .attr('y', (d) => yStartPoint(d.lane))
    .attr('width', (d) => xStartPoint(d.end) - xStartPoint(d.start))
    .attr('height', (d) => yStartPoint(1))
    .attr('style', (d) => colorize(d.lane))

  zoomedEvents.exit().remove()

  return zoomedEvents
}

export { drawZoomArea, drawZoomedEvents }
