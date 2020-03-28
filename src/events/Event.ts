import { DateTime } from "luxon";
import { Event, Events } from "../types/event";
import { TimelineEvent, TimelineEvents } from "../types/timelineEvent";

const buildData = (dataset: Array<Events>): TimelineEvents => {
  const data = [];

  dataset.forEach((events: Array<TimelineEvent>, index: number) =>
    data.push(addMetadata(events, index))
  );

  return data;
};

const addLane = (event: Event, lane: number) => ({ ...event, lane });

const addMetadata = (events: Events, index: number) =>
  events.map(event => addLane(addStartAndEnd(event), index));

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

export { buildData, addLane, addMetadata, addStartAndEnd };
