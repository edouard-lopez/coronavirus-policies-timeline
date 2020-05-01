import React from 'react';
import { render } from '../test-utils';
import VisibleEvents from './VisibleEvents';

test('renders <VisibleEvents> component', () => {
  const { getByTestId } = render(<VisibleEvents />);
  expect(getByTestId('chart')).toBeInTheDocument();
});