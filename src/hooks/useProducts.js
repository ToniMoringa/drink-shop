import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/drinks`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data));
    } catch (error) { console.error('Fetch error:', error); } finally { setLoading(false); }
  };

  const addProduct = async (product) => {
    try {
      const res = await fetch(`${API_URL}/drinks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) { console.error('Add error:', error); }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/drinks/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error) { console.error('Update error:', error); }
  };

  useEffect(() => { fetchProducts(); }, []);
  return { products, loading, addProduct, updateProduct };
};