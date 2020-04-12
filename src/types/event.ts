import { Entity } from "./entity";
import { Tag } from "./tag";
import { Region } from "./region";

export interface Event {
  published_date: string;
  url: string;
  title: string;
  entity: Entity;
  tags: Array<Tag>;
  region: Region;
}

export type Events = Array<Event>;
