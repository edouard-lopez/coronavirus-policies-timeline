import * as d3 from "d3";

const drawGraph = (element, data) => {
  console.log("element", element);
  console.log("data", data);

  const lanes = ["Chinese", "Japanese", "Korean"];
  const timeBegin = 0;
  const timeEnd = 2000;
  const graphWidth = element.current.offsetWidth;
  const isWide = graphWidth > 780;
  const marginMultiplier = isWide ? 3 : 1;
  const margin = {
    top: 20 * marginMultiplier,
    right: 15 * marginMultiplier,
    bottom: 15 * marginMultiplier,
    left: 60 * marginMultiplier
  };
  const width = graphWidth - margin.left - margin.right;
  const graphHeight = 500;
  const height = graphHeight - margin.top - margin.bottom;

  const miniHeight = height * 0.2;
  const mainHeight = height * 0.8;
  console.log("miniHeight", miniHeight);
  console.log("mainHeight", mainHeight);

  const x = d3
    .scaleLinear()
    .domain([timeBegin, timeEnd])
    .range([0, width]);

  const x1 = d3.scaleLinear().range([0, width]);

  const y1 = d3
    .scaleLinear()
    .domain([0, lanes.length])
    .range([0, mainHeight]);

  const y2 = d3
    .scaleLinear()
    .domain([0, lanes.length])
    .range([0, miniHeight]);

  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("class", "chart")
    .attr("width", graphWidth)
    .attr("height", graphHeight);

  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", mainHeight);

  const main = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("width", width)
    .attr("height", mainHeight)
    .attr("class", "main");

  const mini = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + margin.left + "," + (mainHeight + margin.top) + ")"
    )
    .attr("width", width)
    .attr("height", miniHeight)
    .attr("class", "mini");

  //main lanes and texts
  main
    .append("g")
    .selectAll(".laneLines")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", margin.right)
    .attr("y1", d => y1(d.lane))
    .attr("x2", width)
    .attr("y2", d => y1(d.lane))
    .attr("stroke", "lightgray");

  main
    .append("g")
    .selectAll(".laneText")
    .data(lanes)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", -margin.right)
    .attr("y", (d, i) => y1(i + 0.5))
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");

  //mini lanes and texts
  mini
    .append("g")
    .selectAll(".laneLines")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", margin.right)
    .attr("y1", d => y2(d.lane))
    .attr("x2", width)
    .attr("y2", d => y2(d.lane))
    .attr("stroke", "lightgray");

  mini
    .append("g")
    .selectAll(".laneText")
    .data(lanes)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", -margin.right)
    .attr("y", (d, i) => y2(i + 0.5))
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");

  const itemRects = main.append("g").attr("clip-path", "url(#clip)");

  //mini item rects
  mini
    .append("g")
    .selectAll("miniItems")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", d => `miniItem${d.lane}`)
    .attr("x", d => x(d.start))
    .attr("y", d => y2(d.lane + 0.5) - 5)
    .attr("width", d => x(d.end - d.start))
    .attr("height", 10);

  //mini labels
  mini
    .append("g")
    .selectAll(".miniLabels")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.id)
    .attr("x", d => x(d.start))
    .attr("y", d => y2(d.lane + 0.5))
    .attr("dy", ".5ex");

  const display = () => {
    const selection = d3.event && d3.event.selection;
    if (!selection) return;
    let rects,
      labels,
      timeSelection = selection.map(x.invert),
      minExtent = timeSelection[0],
      maxExtent = timeSelection[1],
      visItems = data.filter(d => d.start < maxExtent && d.end > minExtent);

    x1.domain([minExtent, maxExtent]);

    //update main item rects
    rects = itemRects
      .selectAll("rect")
      .data(visItems, d => d.id)
      .attr("x", d => x1(d.start))
      .attr("width", d => x1(d.end) - x1(d.start));

    rects
      .enter()
      .append("rect")
      .attr("class", d => `miniItem${d.lane}`)
      .attr("x", d => x1(d.start))
      .attr("y", d => y1(d.lane) + 10)
      .attr("width", d => x1(d.end) - x1(d.start))
      .attr("height", d => 0.8 * y1(1));

    rects.exit().remove();

    //update the item labels
    labels = itemRects
      .selectAll("text")
      .data(visItems, d => d.id)
      .attr("x", d => x1(Math.max(d.start, minExtent) + 2));

    labels
      .enter()
      .append("text")
      .text(d => d.id)
      .attr("x", d => x1(Math.max(d.start, minExtent)))
      .attr("y", d => y1(d.lane + 0.5))
      .attr("text-anchor", "start");

    labels.exit().remove();
  };

  //brush
  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, miniHeight]
    ])
    .on("brush", display);

  mini
    .append("g")
    .attr("class", "x brush")
    .call(brush)
    .selectAll("rect")
    .attr("y", 1)
    .attr("height", miniHeight - 1);

  display();
};

export default drawGraph;