import { Event } from "./event";

interface TimelineEvent extends Event {
  start: number;
  end: number;
  lane: number;
}

type TimelineEvents = Array<TimelineEvent>;

export {
  TimelineEvent,
  TimelineEvents
}