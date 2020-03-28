import { Event as EventType, Events } from "../types/event";
import { TimelineEvents } from "../types/timelineEvent";
import * as Event from "./Event";

const event1: EventType = {
  published_date: "2020-01-05T00:00:00+00:00",
  url:
    "https://www.who.int/csr/don/05-january-2020-pneumonia-of-unkown-cause-china/en/",
  title: "Pneumonia of unknown cause – China",
  tags: ["announcement", "announce_first_case"],
  entity: "government"
};

const event2: EventType = {
  published_date: "2020-03-13T08:00:17+08:00",
  url:
    "https://www.scmp.com/news/china/society/article/3074991/coronavirus-chinas-first-confirmed-covid-19-case-traced-back",
  title: "China's first confirmed Covid-19 case traced back to November 17",
  tags: ["virus"],
  entity: "government"
};

test("add `start` and `end` based on published date", () => {
  const newEvent:EventType = Event.addStartAndEnd(event1);
  expect(newEvent).toEqual({ ...event1, start: 1578182400, end: 1578268800 });
});

test("addMetadata to all items", () => {
  const events: Array<EventType> = [
    event1,
    { ...event1, entity: "individual" }
  ];
  const lane = 0;

  const newEvents:Events = Event.addMetadata(events, lane);

  expect(newEvents.length).toBe(2);
  expect(newEvents[0]).toEqual({
    ...event1,
    start: 1578182400,
    end: 1578268800,
    lane: 0
  });
});

test("add `lane`", () => {
  const lane = 0;
  const newEvent: EventType = Event.addLane(event1, lane);
  expect(newEvent).toEqual({ ...event1, lane: 0 });
});

test("foo bar", () => {
  const dataset:Array<Events> = [[event1], [event2]];
  const data:TimelineEvents = Event.buildData(dataset);

  expect(data.length).toBe(2);
  expect(data).toEqual([
    { ...event1, start: 1578182400, end: 1578268800, lane: 0 },
    { ...event2, start: 1584057617, end: 1584144017, lane: 1 }
  ]);
});
