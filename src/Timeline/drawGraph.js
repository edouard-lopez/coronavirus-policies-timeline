import * as d3 from 'd3'
import { GRAPH_BEGIN, GRAPH_WIDTH } from './boundaries'
import { drawZoomArea } from './ZoomArea'
import { drawOverviewArea } from './OverviewArea'
import { drawBrush } from './Brush'

const drawGraph = (element, lanes, data) => {
  const timeBegin = GRAPH_BEGIN
  const timeEnd = GRAPH_WIDTH

  const graphWidth = element.current.offsetWidth

  const margin = {
    top: 20,
    right: 15,
    bottom: 15,
    left: 150,
  }
  const width = graphWidth - margin.left - margin.right
  const graphHeight = 60 * lanes.length
  const height = graphHeight - margin.top - margin.bottom

  const zoomAreaHeight = height * 0.8
  const overviewAreaHeight = height * 0.2

  const x = d3.scaleLinear().domain([timeBegin, timeEnd]).range([0, width])

  const xStartPoint = d3.scaleLinear().range([0, width])

  const yStartPoint = d3
    .scaleLinear()
    .domain([0, lanes.length])
    .range([0, zoomAreaHeight])

  const yEndPoint = d3
    .scaleLinear()
    .domain([0, lanes.length])
    .range([0, overviewAreaHeight])

  const svg = d3
    .select(element.current)
    .append('svg')
    .attr('class', 'chart')
    .attr('viewBox', [0, 0, graphWidth, graphHeight])
    .style('display', 'block')

  const chartProps = {
    graphHeight,
    graphWidth,
    height,
    zoomAreaHeight,
    margin,
    overviewAreaHeight,
    svg,
    width,
  }

  svg
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', zoomAreaHeight)

  const zoomArea = drawZoomArea(data, { ...chartProps, yStartPoint }, lanes)
  const overviewArea = drawOverviewArea(
    data,
    { ...chartProps, x, yEndPoint },
    lanes
  )
  const brushed = () =>
    drawBrush(data, { x, xStartPoint, yStartPoint }, zoomArea)
  //brush
  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, overviewAreaHeight],
    ])
    .on('brush', brushed)

  overviewArea
    .append('g')
    .attr('class', 'x brush')
    .call(brush)
    .selectAll('rect')
    .attr('y', 1)
    .attr('height', overviewAreaHeight - 1)

  brushed()
}

export default drawGraph
