import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { describe, it, expect } from 'vitest';

describe('Home', () => {
  it('renders main heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText('Pixel Brew Café')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(
      screen.getByText(/Cute pixel drinks for cozy souls/),
    ).toBeInTheDocument();
  });

  it('renders browse drinks button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Browse Drinks/)).toBeInTheDocument();
  });
});
