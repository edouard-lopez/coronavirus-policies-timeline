import React, { useState, useEffect, useRef } from "react";
import drawGraph from "./drawGraph";
import COUNTRIES from "../data/countries.ts";
import WHO from "../data/who.json";
import pandemic from "../data/pandemic.json";
import "./Timeline.css";
import { buildD3Data } from "../events/Event";

const dataset = buildD3Data([pandemic, WHO]);

function Timeline() {
  const [countries, setCountries] = useState(["pandemic", "WHO", ...COUNTRIES]);
  const [data, setData] = useState(dataset);

  const graph = useRef(null);
  useEffect(() => drawGraph(graph, countries, data));

  return (
    <div className="Timeline">
      <h3>Timeline</h3>
      <div ref={graph}></div>
    </div>
  );
}

export default Timeline;
