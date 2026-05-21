import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import { Plus, Edit2, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Admin.module.css';

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const ENDPOINT = API_URL + '/drinks';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(ENDPOINT);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : Object.values(data).flat());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this drink?')) return;
    try {
      const response = await fetch(`${ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.spinner} size={48} />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <AlertCircle size={48} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1>Admin Portal</h1>
        <button
          className={styles.addButton}
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={20} />
          {showForm ? 'Cancel' : 'Add Drink'}
        </button>
      </div>
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            fetchProducts();
            setShowForm(false);
            setEditingProduct(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <div className={styles.productsList}>
        <h2>Manage Drinks ({products.length})</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
              <div className={styles.actions}>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(product)}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
