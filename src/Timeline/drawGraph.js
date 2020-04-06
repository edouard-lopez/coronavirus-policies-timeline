import * as d3 from "d3";
import { DateTime } from "luxon";
import { GRAPH_BEGIN, GRAPH_WIDTH } from "./boundaries";

const date = (d) => {
  return DateTime.fromISO(d.published_date).toLocaleString(DateTime.DATE_MED);
};
const title = (d) => `${date(d)}: ${d.title}`;

const drawZoomArea = (
  { svg, margin, width, mainHeight },
  data,
  yStartPoint,
  lanes
) => {
  const zoomArea = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("width", width)
    .attr("height", mainHeight)
    .attr("class", "zoomArea");

  //zoomArea lanes and texts
  zoomArea
    .append("g")
    .selectAll(".event-lines")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", margin.right)
    .attr("y1", (d) => yStartPoint(d.lane))
    .attr("x2", width)
    .attr("y2", (d) => yStartPoint(d.lane))
    .attr("class", "event-line");

  zoomArea
    .append("g")
    .selectAll(".country-names")
    .data(lanes)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", -margin.right)
    .attr("y", (d, i) => yStartPoint(i + 0.5))
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "country-name pf-c-title");

  return zoomArea.append("g").attr("clip-path", "url(#clip)");
};

const drawOverviewArea = (
  { svg, margin, width, mainHeight, miniHeight },
  data,
  x,
  yEndPoint,
  lanes
) => {
  const overviewArea = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + margin.left + "," + (mainHeight + margin.top) + ")"
    )
    .attr("width", width)
    .attr("height", miniHeight)
    .attr("class", "overviewArea");

  //mini lanes and texts
  overviewArea
    .append("g")
    .selectAll(".event-lines")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", margin.right)
    .attr("y1", (d) => yEndPoint(d.lane))
    .attr("x2", width)
    .attr("y2", (d) => yEndPoint(d.lane))
    .attr("class", "event-line");

  overviewArea
    .append("g")
    .selectAll(".country-names")
    .data(lanes)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", -margin.right)
    .attr("y", (d, i) => yEndPoint(i + 0.5))
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "country-name pf-c-chip__text");

  //mini event rects
  overviewArea
    .append("g")
    .selectAll("overview-events")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", (d) => `overview-event event${d.lane}`)
    .attr("x", (d) => x(d.start))
    .attr("y", (d) => yEndPoint(d.lane + 0.5) - 5)
    .attr("width", (d) => x(d.end - d.start))
    .attr("height", 10);

  //mini labels
  overviewArea
    .append("g")
    .selectAll(".miniLabels")
    .data(data)
    .enter()
    .append("text")
    // .text(d => title(d))
    .attr("x", (d) => x(d.start))
    .attr("y", (d) => yEndPoint(d.lane + 0.5))
    .attr("dy", ".5ex");

  return overviewArea;
};

const displayBrush = (data, { x, xStartPoint, yStartPoint }, zoomArea) => {
  const selection = d3.event && d3.event.selection;
  if (!selection) return;
  let zoomedEvents,
    labels,
    timeSelection = selection.map(x.invert),
    minExtent = timeSelection[0],
    maxExtent = timeSelection[1],
    visibleEvents = data.filter(
      (d) => d.start < maxExtent && d.end > minExtent
    );

  xStartPoint.domain([minExtent, maxExtent]);

  //update zoomArea event rects
  zoomedEvents = zoomArea
    .selectAll("rect")
    .data(visibleEvents, (d) => title(d))
    .attr("x", (d) => xStartPoint(d.start))
    .attr("width", (d) => xStartPoint(d.end) - xStartPoint(d.start));

  zoomedEvents
    .enter()
    .append("rect")
    .attr("class", (d) => `zoomed-event event${d.lane}`)
    .attr("x", (d) => xStartPoint(d.start))
    .attr("y", (d) => yStartPoint(d.lane))
    .attr("width", (d) => xStartPoint(d.end) - xStartPoint(d.start))
    .attr("height", (d) => yStartPoint(1));

  zoomedEvents.exit().remove();

  //update the event labels
  labels = zoomArea
    .selectAll("text")
    .data(visibleEvents, (d) => title(d))
    .attr("x", (d) => xStartPoint(Math.max(d.start, minExtent) + 2));

  labels
    .enter()
    .append("a")
    .attr("href", (d) => d.url)
    .attr("target", "_blank")
    .attr("class", "event-link")
    .append("text")
    .text((d) => title(d))
    .attr("x", (d) => xStartPoint(Math.max(d.start, minExtent)))
    .attr("y", (d) => yStartPoint(d.lane + 0.5))
    .attr("text-anchor", "start")
    .attr("class", "event-label");
};

const drawGraph = (element, lanes, data) => {
  const timeBegin = GRAPH_BEGIN;
  const timeEnd = GRAPH_WIDTH;
  const graphWidth = element.current.offsetWidth;

  const margin = {
    top: 20,
    right: 15,
    bottom: 15,
    left: 100,
  };
  const width = graphWidth - margin.left - margin.right;
  const graphHeight = 500;
  const height = graphHeight - margin.top - margin.bottom;

  const mainHeight = height * 0.8;
  const miniHeight = height * 0.2;

  const x = d3.scaleLinear().domain([timeBegin, timeEnd]).range([0, width]);

  const xStartPoint = d3.scaleLinear().range([0, width]);

  const yStartPoint = d3
    .scaleLinear()
    .domain([0, lanes.length])
    .range([0, mainHeight]);

  const yEndPoint = d3
    .scaleLinear()
    .domain([0, lanes.length])
    .range([0, miniHeight]);

  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("class", "chart")
    .attr("viewBox", [0, 0, graphWidth, graphHeight])
    .style("display", "block");

  const chart = {
    graphHeight,
    graphWidth,
    height,
    mainHeight,
    margin,
    miniHeight,
    svg,
    width,
  };

  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", mainHeight);

  const zoomArea = drawZoomArea(chart, data, yStartPoint, lanes);
  const overviewArea = drawOverviewArea(chart, data, x, yEndPoint, lanes);
  const brushed = () =>
    displayBrush(data, { x, xStartPoint, yStartPoint }, zoomArea);
  //brush
  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, miniHeight],
    ])
    .on("brush", brushed);

  overviewArea
    .append("g")
    .attr("class", "x brush")
    .call(brush)
    .selectAll("rect")
    .attr("y", 1)
    .attr("height", miniHeight - 1);

  brushed();
};

export default drawGraph;
