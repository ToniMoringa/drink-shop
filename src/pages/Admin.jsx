import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import { Plus, Edit2, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Admin.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : Object.values(data));
      setError(null);
    } catch (err) { 
      console.error(err);
      setError('Failed to load products'); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this drink?')) return;
    try {
    
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) { 
      console.error(err);
      alert('Failed to delete'); 
    }
  };

  if (loading) return <div className={styles.loading}><Loader2 className={styles.spinner} size={48} /><p>Loading...</p></div>;
  if (error) return <div className={styles.error}><AlertCircle size={48} /><p>{error}</p><button onClick={fetchProducts}>Retry</button></div>;

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1>Admin Portal</h1>
        <button className={styles.addButton} onClick={() => { setEditingProduct(null); setShowForm(!showForm); }}>
          <Plus size={20} />{showForm ? 'Cancel' : 'Add Drink'}
        </button>
      </div>
      {showForm && <ProductForm product={editingProduct} onSuccess={() => { fetchProducts(); setShowForm(false); setEditingProduct(null); }} onCancel={() => { setShowForm(false); setEditingProduct(null); }} />}
      <div className={styles.productsList}>
        <h2>Manage Drinks ({products.length})</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => { setEditingProduct(product); setShowForm(true); }}><Edit2 size={16} /> Edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}><Trash2 size={16} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;