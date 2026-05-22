// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      jsx;
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const crud = async (method, url, body) => {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Failed ${method}`);
    return res.json();
  };

  const addProduct = (product) =>
    crud('POST', `${API_URL}/products`, product)
      .then((newP) => {
        setProducts((p) => [...p, newP]);
        return { success: true };
      })
      .catch((err) => {
        setError(err.message);
        return { success: false, error: err.message };
      });

  const updateProduct = (id, updates) =>
    crud('PATCH', `${API_URL}/products/${id}`, updates)
      .then((updated) => {
        setProducts((p) => p.map((x) => (x.id === id ? updated : x)));
        return { success: true };
      })
      .catch((err) => {
        setError(err.message);
        return { success: false, error: err.message };
      });

  const deleteProduct = (id) =>
    crud('DELETE', `${API_URL}/products/${id}`)
      .then(() => {
        setProducts((p) => p.filter((x) => x.id !== id));
        return { success: true };
      })
      .catch((err) => {
        setError(err.message);
        return { success: false, error: err.message };
      });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
