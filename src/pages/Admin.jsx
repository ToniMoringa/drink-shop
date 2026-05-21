import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import { Plus, Edit2, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Admin.module.css';

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const ENDPOINT = `${API_URL}/drinks`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data).flat());
      setError(null);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this drink?')) return;
    try {
      await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) { alert('Delete failed'); }
  };

  if (loading) return <div className={styles.loading}><Loader2 className={styles.spinner} size={48} /><p>Loading...</p></div>;
  if (error) return <div className={styles.error}><AlertCircle size={48} /><p>{error}</p></div>;

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1>Admin Portal</h1>
        <button className={styles.addButton} onClick={() => { setEditing(null); setShowForm(!showForm); }}>
          <Plus size={20} />{showForm ? 'Cancel' : 'Add Drink'}
        </button>
      </div>
      {showForm && <ProductForm product={editing} onSuccess={() => { fetchProducts(); setShowForm(false); setEditing(null); }} onCancel={() => { setShowForm(false); setEditing(null); }} />}
      <div className={styles.productsList}>
        <h2>Manage Drinks ({products.length})</h2>
        <div className={styles.grid}>
          {products.map(p => (
            <div key={p.id} className={styles.cardWrapper}>
              <ProductCard product={p} />
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => { setEditing(p); setShowForm(true); }}><Edit2 size={16} /> Edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}><Trash2 size={16} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Admin;