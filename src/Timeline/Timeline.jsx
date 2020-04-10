import React, { useState, useEffect, useRef } from "react";
import drawGraph from "./drawGraph";
import { countries } from "../CountrySelector/countries";
import events from "../data/events.json";

import "./Timeline.css";
import { buildD3Data } from "../events/Event";

const dataset = buildD3Data(events);

function Timeline() {
  const [areas] = useState([countries]);
  const [data] = useState(dataset);

  const graph = useRef(null);
  useEffect(() => drawGraph(graph, areas, data));

  return (
    <div className="Timeline">
      <h2>Timeline</h2>
      <div ref={graph}></div>
    </div>
  );
}

export default Timeline;
