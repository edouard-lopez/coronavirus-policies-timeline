import { GanttRows } from '../types/gantt'
import { Regions, Region } from '../types/region'

export const buildRowsCollection = (regions: Regions): GanttRows => {
  const rows: GanttRows = {}

  regions.forEach((region) => {
    const regionId:string = idify(region)
    rows[regionId] = {
      id: regionId,
      label: region,
    }
  })
  return rows
}

export const idify = (region:Region) => region.toLowerCase().replace(/ /g, '-')