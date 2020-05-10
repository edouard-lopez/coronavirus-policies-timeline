import { Regions } from "../types/region"
import { buildRowsCollection, idify } from "./rows";

test('should return events belonging to region with more events than default threshold', () => {
  const regionsWithEvents: Regions = ['France', 'United Arab Emirates']

  expect(buildRowsCollection(regionsWithEvents)).toEqual({
        'france': {
          id: 'france',
          label: 'France',
        },
        'united-arab-emirates': {
          id: 'united-arab-emirates',
          label: 'United Arab Emirates',
        },
  })
})

test('should idify region name', () => {
  const region = "United Arab Emirates";

  expect(idify(region)).toBe('united-arab-emirates')
});