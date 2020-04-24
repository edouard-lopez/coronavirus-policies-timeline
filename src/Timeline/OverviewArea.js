import { colorize } from './colors'
import { addLanes } from './Lanes'
import { addRegionLabels } from './RegionLabels.js'

export const drawOverviewArea = (
  data,
  { svg, margin, width, zoomAreaHeight, overviewAreaHeight, x, yEndPoint },
  lanes
) => {
  const overviewArea = svg
    .append('g')
    .attr(
      'transform',
      'translate(' + margin.left + ',' + (zoomAreaHeight + margin.top) + ')'
    )
    .attr('width', width)
    .attr('height', overviewAreaHeight)
    .attr('class', 'overviewArea')

  //mini lanes and texts
  addLanes(overviewArea, data, { margin, width, positionAt: yEndPoint })
  addRegionLabels(overviewArea, lanes, {
    margin,
    positionAt: yEndPoint,
    classes: ['pf-c-chip__text'],
  })

  //mini event rects
  overviewArea
    .append('g')
    .selectAll('.overview-event')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'overview-event')
    .attr('x', (d) => x(d.start))
    .attr('y', (d) => yEndPoint(d.lane + 0.5) - 5)
    .attr('width', (d) => x(d.end - d.start))
    .attr('height', 10)
    .attr('style', (d) => colorize(d.lane))

  return overviewArea
}
