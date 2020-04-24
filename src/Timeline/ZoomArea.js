import { addLanes } from './Lanes'
import { addRegionLabels } from './RegionLabels.js'

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

export { drawZoomArea }
