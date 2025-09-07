import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Example: check if "Home" link is rendered
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
