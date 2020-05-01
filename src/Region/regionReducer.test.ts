import { Regions } from '../types/region'
import { selectRegion, unSelectRegion } from './regionActions'
import { selectedRegions } from './regionReducer'

test('should add selected item to the list', () => {
  const state: Regions = ['Romania']

  const regions = selectedRegions(state, selectRegion({ region: 'Uzbekistan' }))

  expect(regions.length).toBe(2)
  expect(regions).toEqual(['Romania', 'Uzbekistan'])
})

test('should remove un-selected item from the list', () => {
  const state: Regions = ['Romania','Zambia']

  const regions = selectedRegions(
    state,
    unSelectRegion({ region: 'Zambia' })
  )

  expect(regions.length).toBe(1)
  expect(regions).toEqual(['Romania'])
})
