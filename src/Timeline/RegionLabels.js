const region = (d) => d;

const addRegionLabels = (context, lanes, { margin, positionAt, classes }) =>
  context
    .append("g")
    .selectAll(".region-name")
    .data(lanes)
    .enter()
    .append("text")
    .text((d) => region(d))
    .attr("x", -margin.right)
    .attr("y", (d, i) => positionAt(i + 0.5))
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("x-region", (d, i) => region(d, i))
    .attr("class", `region-name ${[...classes]}`);

export { region, addRegionLabels };
