import { Tag } from "./tag";
import { Entity } from "./entity";

export interface Event {
  published_date: string;
  url: string;
  title: string;
  entity: Entity;
  tags: Array<Tag>;
}