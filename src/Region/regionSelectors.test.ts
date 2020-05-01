import { RootState, getSelectedRegions } from './regionSelectors'
import { Regions } from '../types/region'

test('should return default list if no region selected', () => {
  const state: RootState = {
    selectedRegions: [],
    regionFilter: '',
  }
  const defaultRegions: Regions = ['World', 'France']

  expect(getSelectedRegions(state, defaultRegions)).toEqual(defaultRegions)
})

test('should regions from state if some are selected', () => {
  const state: RootState = {
    selectedRegions: ['Afghanistan', 'Zambia'],
    regionFilter: '',
  }
  const defaultRegions:Regions = []

  expect(getSelectedRegions(state, defaultRegions)).toEqual(
    state.selectedRegions
  )
})
