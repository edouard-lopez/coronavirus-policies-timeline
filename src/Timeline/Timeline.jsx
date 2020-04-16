import React, { useState, useEffect, useRef } from "react";

import drawGraph from "./drawGraph";
import { regionsWithEvents } from "../Region/regions";
import events from "../data/events.json";

import "./Timeline.css";
import { buildD3Data } from "../events/Event";

const sortByRegion = (a, b) => {
  if (a.region > b.region) {
    return 1;
  }
  if (a.region < b.region) {
    return -1;
  }
  return 0;
};

const dataset = buildD3Data(events);
dataset.sort(sortByRegion);

function Timeline() {
  const [regions] = useState(regionsWithEvents);
  const [data] = useState(dataset);

  const graph = useRef(null);
  useEffect(() => drawGraph(graph, regions, data));

  return <div ref={graph}  data-testid="chart"></div>;
}

export default Timeline;
