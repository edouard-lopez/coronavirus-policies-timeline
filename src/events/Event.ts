import { DateTime } from "luxon";
import { Event, Events } from "../types/event";
import { TimelineEvents, TimelineEvent } from "../types/timelineEvent";

const buildD3Data = (allDataset: Array<Events>): TimelineEvents => {
  const data: TimelineEvents = [];

  allDataset.forEach((dataset: Events, index: number) => {
    const events = addD3Metadata(dataset, index);
    events.forEach(event => data.push(event));
  });

  return data;
};

const addLane = (event: Event, lane: number): TimelineEvent =>
  ({ ...event, lane } as TimelineEvent);

const addD3Metadata = (dataset: Events, index: number): TimelineEvents =>
  dataset.map(event => addLane(addStartAndEnd(event), index));

const addStartAndEnd = (event: Event) => {
  const published_date = DateTime.fromISO(event.published_date);
  const start = published_date.toSeconds();
  const end = published_date.plus({ days: 1 }).toSeconds();

  return {
    ...event,
    start,
    end
  };
};

export { buildD3Data, addLane, addD3Metadata, addStartAndEnd };
