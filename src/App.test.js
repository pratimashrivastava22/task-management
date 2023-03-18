import { screen } from '@testing-library/react';
import { render } from './TestUtils'
test('renders learn react link', () => {
  render(<div />);
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});
