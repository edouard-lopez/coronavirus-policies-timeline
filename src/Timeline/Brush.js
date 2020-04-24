import * as d3 from 'd3'
import { drawZoomedEvents } from './ZoomedEvents'

const drawBrush = (data, { x, xStartPoint, yStartPoint }, zoomArea) => {
  const selection = d3.event && d3.event.selection
  if (!selection) return
  let [selectionStart, selectionEnd] = selection.map(x.invert)
  let visibleEvents = data.filter(
    (event) => event.end > selectionStart && event.start < selectionEnd
  )

  xStartPoint.domain([selectionStart, selectionEnd])

  drawZoomedEvents(zoomArea, visibleEvents, {
    xStartPoint,
    yStartPoint,
    selectionStart,
  })
}

export { drawBrush }
