import { useState, useEffect } from 'react';

export const useProducts = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const ENDPOINT = `${API_URL}/drinks`;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data).flat());
    } catch (err) { console.error('Fetch error:', err); } finally { setLoading(false); }
  };

  const addProduct = async (prod) => {
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(prod) });
      const newP = await res.json();
      setProducts(prev => [...prev, newP]);
    } catch (err) { console.error('Add error:', err); }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`${ENDPOINT}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
      const upd = await res.json();
      setProducts(prev => prev.map(p => p.id === id ? upd : p));
    } catch (err) { console.error('Update error:', err); }
  };

  useEffect(() => { fetchProducts(); }, []);
  return { products, loading, addProduct, updateProduct };
};