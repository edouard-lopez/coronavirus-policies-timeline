const country = (d) => d;

const addCountryLabels = (context, lanes, { margin, positionAt, classes }) =>
  context
    .append("g")
    .selectAll(".country-name")
    .data(lanes)
    .enter()
    .append("text")
    .text((d) => country(d))
    .attr("x", -margin.right)
    .attr("y", (d, i) => positionAt(i + 0.5))
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("x-country", (d, i) => country(d, i))
    .attr("class", `country-name ${[...classes]}`);

export { country, addCountryLabels };
