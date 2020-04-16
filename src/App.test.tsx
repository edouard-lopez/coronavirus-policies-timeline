import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const TimelineElement = getByText(/Timeline/i);
  expect(TimelineElement).toBeInTheDocument();

  const SelectionElement = getByText(/Selection/i);
  expect(SelectionElement).toBeInTheDocument();
});
