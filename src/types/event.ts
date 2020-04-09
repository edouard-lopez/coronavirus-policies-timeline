import { Entity } from "./entity";
import { Tag } from "./tag";
import { Scope } from "./scope";

export interface Event {
  published_date: string;
  url: string;
  title: string;
  entity: Entity;
  tags: Array<Tag>;
  scope: Scope;
}

export type Events = Array<Event>;
