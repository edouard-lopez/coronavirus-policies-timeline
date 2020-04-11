export const addLines = (context, data, { margin, width, positionAt }) =>
  context
    .append("g")
    .selectAll(".event-line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", margin.right)
    .attr("y1", (d) => positionAt(d.lane))
    .attr("x2", width)
    .attr("y2", (d) => positionAt(d.lane))
    .attr("class", "event-line");
