import { render } from '@testing-library/react'
import React from 'react'
import { Regions } from '../types/region'
import { TimelineEvents } from '../types/timelineEvent'
import Timeline from './Timeline'

test('renders <Timeline> component', () => {
  const { getByTestId } = render(<Timeline events={[]} regions={[]} />)
  expect(getByTestId('chart')).toBeInTheDocument()
})

test('renders <Timeline> component with data', () => {
  const events: TimelineEvents = [
    {
      published_date: '2020-01-05T00:00:00+00:00',
      url:
        'https://www.who.int/csr/don/05-january-2020-pneumonia-of-unkown-cause-china/en/',
      title: 'Pneumonia of unknown cause – China',
      tags: ['announcement', 'first-case'],
      entity: 'government',
      region: 'World',
      start: 238,
      end: 243,
      lane: 0,
    },
  ]
  const regions = ['World'] as Regions;

  const { container, queryAllByText } = render(
    <Timeline events={events} regions={regions} />
  )

  expect(container.querySelector('.overviewArea')).toBeInTheDocument()
  expect(queryAllByText('World').length).toBe(2)
})
