// src/pages/Admin.jsx
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts'; 
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import { Plus, Edit2, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Admin.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'; 

const Admin = () => {
  //  Replace local state with hook
  const { products, loading, addProduct, updateProduct, deleteProduct, refetch } = useProducts();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null); // error state for UI

  const handleSubmit = async (formData) => {
    const result = editingProduct 
      ? await updateProduct(editingProduct.id, formData)
      : await addProduct(formData);
    
    if (result.success) {
      setShowForm(false);
      setEditingProduct(null);
      refetch(); // fresh data
    } else {
      setError(result.error);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this drink?')) return;
    const result = await deleteProduct(id); // Use hook's delete
    if (!result.success) alert('Failed to delete');
    // State updates automatically via hook
  };

  if (loading) return <div className={styles.loading}><Loader2 className={styles.spinner} size={48} /><p>Loading...</p></div>;
  if (error) return <div className={styles.error}><AlertCircle size={48} /><p>{error}</p><button onClick={refetch}>Retry</button></div>;

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1>Admin Portal</h1>
        <button className={styles.addButton} onClick={() => { setEditingProduct(null); setShowForm(!showForm); }}>
          <Plus size={20} />{showForm ? 'Cancel' : 'Add Drink'}
        </button>
      </div>
      
      {showForm && (
        <ProductForm 
          product={editingProduct} 
          onSuccess={handleSubmit} 
          onCancel={() => { setShowForm(false); setEditingProduct(null); }} 
        />
      )}

      <div className={styles.productsList}>
        <h2>Manage Drinks ({products.length})</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => { setEditingProduct(product); setShowForm(true); }}>
                  <Edit2 size={16} /> Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>
                  <Trash2 size={16} /> Delete
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