import { Entity } from './entity'
import { Tag } from './tag'
import { Region } from './region'

type URL = string
type datetime = string

export interface Event {
  published_date: datetime
  url: URL
  title: string
  entity: Entity // who is giving the info, aggregate of source is often put under `newspaper`
  tags: Array<Tag>
  region: Region // region described by article
}

export type Events = Array<Event>
