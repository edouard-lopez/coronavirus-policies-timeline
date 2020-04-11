import React, { useState, useEffect, useRef } from "react";

import drawGraph from "./drawGraph";
import { countriesWithEvents } from "../Country/countries";
import events from "../data/events.json";

import "./Timeline.css";
import { buildD3Data } from "../events/Event";

const sortByScope = (a, b) => {
  if (a.scope > b.scope) {
    return 1;
  }
  if (a.scope < b.scope) {
    return -1;
  }
  return 0;
};

const dataset = buildD3Data(events);
dataset.sort(sortByScope);

function Timeline() {
  const [countries] = useState(countriesWithEvents);
  const [data] = useState(dataset);

  const graph = useRef(null);
  useEffect(() => drawGraph(graph, countries, data));

  return <div ref={graph}></div>;
}

export default Timeline;
