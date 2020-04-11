import * as d3 from "d3";
import { DateTime } from "luxon";
import { colorize } from "./colors";

const date = (d) => {
  return DateTime.fromISO(d.published_date).toLocaleString(DateTime.DATE_MED);
};
const title = (d) => `${date(d)}: ${d.title}`;

const drawBrush = (data, { x, xStartPoint, yStartPoint }, zoomArea) => {
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
    .attr("class", "zoomed-event")
    .attr("x", (d) => xStartPoint(d.start))
    .attr("y", (d) => yStartPoint(d.lane))
    .attr("width", (d) => xStartPoint(d.end) - xStartPoint(d.start))
    .attr("height", (d) => yStartPoint(1))
    .attr("style", (d) => colorize(d.lane));

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

export { date, title, drawBrush };
