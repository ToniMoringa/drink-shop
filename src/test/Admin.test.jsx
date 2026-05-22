// src/pages/Admin.test.jsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Admin from './Admin';
import { useProducts } from '../hooks/useProducts';

vi.mock('../hooks/useProducts');
const renderAdmin = () => render(<BrowserRouter><Admin /></BrowserRouter>);

describe('Admin CRUD', () => {
  it('calls deleteProduct on delete click', async () => {
    const mockDelete = vi.fn().mockResolvedValue({ success: true });
    useProducts.mockReturnValue({
      products: [{id:'1', name:'Test'}], loading: false, error: null,
      addProduct: vi.fn(), updateProduct: vi.fn(), deleteProduct: mockDelete, refetch: vi.fn()
    });
    window.confirm = vi.fn().mockReturnValue(true);
    renderAdmin();
    await waitFor(() => screen.getByRole('button', { name: /delete/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('toggles form and calls addProduct', async () => {
    const mockAdd = vi.fn().mockResolvedValue({ success: true });
    useProducts.mockReturnValue({
      products: [], loading: false, error: null,
      addProduct: mockAdd, updateProduct: vi.fn(), deleteProduct: vi.fn(), refetch: vi.fn()
    });
    renderAdmin();
    fireEvent.click(screen.getByRole('button', { name: /add drink/i }));
    expect(screen.getByRole('form')).toBeInTheDocument();
    // Simulate form submit (ProductForm calls onSuccess)
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => expect(mockAdd).toHaveBeenCalled());
  });
});