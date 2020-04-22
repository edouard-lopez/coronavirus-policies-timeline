import { render } from '@testing-library/react';
import React from 'react';
import VisibleEvents from './VisibleEvents';

test('renders <VisibleEvents> component', () => {
  const { getByTestId } = render(<VisibleEvents />);
  expect(getByTestId('chart')).toBeInTheDocument();
});