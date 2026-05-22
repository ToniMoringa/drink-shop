// src/hooks/useProducts.js
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // products matches Admin.jsx and your backend
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data));
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      return { success: true, data: newProduct }; //  Return result for feedback
    } catch (error) {
      console.error('Add error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return { success: true, data: updated };
    } catch (error) {
      console.error('Update error:', error);
      return { success: false, error: error.message };
    }
  };

  // deleteProduct for full CRUD
  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Return all CRUD functions
  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
