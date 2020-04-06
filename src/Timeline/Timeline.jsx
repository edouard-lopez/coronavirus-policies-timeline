import React, { useState, useEffect, useRef } from "react";
import drawGraph from "./drawGraph";
import {countryNames, events} from "../data/data.ts";
import "./Timeline.css";
import { buildD3Data } from "../events/Event";

const dataset = buildD3Data(events);

function Timeline() {
  const [countries] = useState(["pandemic", "WHO", ...countryNames]);
  const [data] = useState(dataset);

  const graph = useRef(null);
  useEffect(() => drawGraph(graph, countries, data));

  return (
    <div className="Timeline">
      <h2>Timeline</h2>
      <div ref={graph}></div>
    </div>
  );
}

export default Timeline;
