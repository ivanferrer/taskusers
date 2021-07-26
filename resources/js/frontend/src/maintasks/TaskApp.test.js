import { render, screen } from '@testing-library/react';
import TaskApp from './TaskApp';

describe('TaskApp', () => {
  test('renders learn react link', () => {
    render(<TaskApp />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  })
})
