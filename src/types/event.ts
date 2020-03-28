import { Entity } from "./entity";
import { Tag } from "./tag";

export interface Event {
  published_date: string;
  url: string;
  title: string;
  entity: Entity;
  tags: Array<Tag>;
}

export type Events = Array<Event>;
