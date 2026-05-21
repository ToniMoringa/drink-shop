import { useState, useEffect } from 'react';

export const useProducts = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const ENDPOINT = API_URL + '/drinks';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data).flat());
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, addProduct, updateProduct };
};
