import { DateTime } from "luxon";
import { Event, Events } from "../types/event";
import { TimelineEvents, TimelineEvent } from "../types/timelineEvent";
import { projectToGraph } from "../Timeline/boundaries";
import { countriesWithEvents } from "../Country/countries";

const buildD3Data = (dataset: Events): TimelineEvents => {
  const data: TimelineEvents = [];

  dataset.forEach((event) => {
    const eventWithMetadata = addD3Metadata(event)    
    data.push(eventWithMetadata)
  });

  return data;
};

const addLane = (event: Event, lane: number): TimelineEvent =>
  ({ ...event, lane } as TimelineEvent);

const addD3Metadata = (event: Event): TimelineEvent => {
  const lane = countriesWithEvents.indexOf(event.scope);

  return addLane(addStartAndEnd(event), lane);
};

const addStartAndEnd = (event: Event) => {
  const published_date = DateTime.fromISO(event.published_date);
  const { start, end } = projectToGraph(
    published_date,
    published_date.plus({ days: 1 })
  );

  return {
    ...event,
    start,
    end,
  };
};

export { buildD3Data, addLane, addD3Metadata, addStartAndEnd };
