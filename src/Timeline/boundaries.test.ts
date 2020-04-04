import { DateTime } from "luxon";
import { projectToGraph, FIRST_CASE, MIN_ITEM_WIDTH, GRAPH_BEGIN } from "./boundaries";

test("project initial date to graph", () => {
  const event_start = FIRST_CASE;
  const event_end = event_start.plus({ days: 1 });
  const projectedValue = projectToGraph(event_start, event_end);

  expect(projectedValue.start).toBe(GRAPH_BEGIN);
});

test("projection compute a minimal width", () => {
  const event_start = DateTime.fromISO("2020-03-17T00:00:00+00:00");
  const event_end = event_start.plus({ hours: 12 });

  const projectedValue = projectToGraph(event_start, event_end);

  expect(projectedValue.start).toBe(589);
  expect(projectedValue.end).toBe(589+MIN_ITEM_WIDTH);
});
