import events from "./events.json";
import { Events } from "../types/event";

const getScope = (events:Events) => {
return []
}

const scopes = [
  "China",
  "Canada",
  "Europe",
  "France",
  "Italy",
  "Japan",
  "South Korea",
  "Spain",
  "USA",
].sort();

export { getScope, scopes, events };
