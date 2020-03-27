import React from 'react';
import { render } from '@testing-library/react';
import Timeline from './Timeline';

test('renders <Timeline> component', () => {
  const { getByText } = render(<Timeline />);
  expect(getByText(/Timeline/)).toBeInTheDocument();
});