import { Region } from './region'

export type Row = {
  id: string
  label: Region
}
export type GanttRows = {
  [name: string]: Row
}

export type Item = {
  id: string
  rowId: string
  label: string
  time: {
    start: number
    end: number
  }
}

export type GanttItems = {
  [name: string]: Item
}
