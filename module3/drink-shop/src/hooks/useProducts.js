import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3001/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const addProduct = async (product) => {
    const res = await fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (id, updates) => {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setProducts(products.map((p) => (p.id === id ? updated : p)));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, addProduct, updateProduct };
};
