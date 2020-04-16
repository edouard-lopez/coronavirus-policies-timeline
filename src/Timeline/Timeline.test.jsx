import React from 'react';
import { render } from '@testing-library/react';
import Timeline from './Timeline';

test('renders <Timeline> component', () => {
  const { getByTestId } = render(<Timeline />);
  expect(getByTestId('chart')).toBeInTheDocument();
});