import { Event } from "./event";

export interface TimelineEvent extends Event {
  start: number;
  end: number;
  lane: number;
}

export type TimelineEvents = Array<TimelineEvent>;
