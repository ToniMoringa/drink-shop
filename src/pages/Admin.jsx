import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/ProductForm';
import { Edit2, Save, X } from 'lucide-react';
import styles from './Admin.module.css';

export default function Admin() {
  const { products, updateProduct } = useProducts();
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditPrice(product.price.toString());
  };

  const handleSave = (id) => {
    updateProduct(id, { price: parseFloat(editPrice) });
    setEditingId(null);
    setEditPrice('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditPrice('');
  };

  return (
    <div className={styles.admin}>
      <h1 className={styles.heading}>Admin Portal 🎮</h1>
      <p className={styles.subtitle}>Manage your cute drinks</p>
      
      <ProductForm />
      
      <div className={styles.productList}>
        <h2>Existing Products</h2>
        {products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image || '/placeholder.png'} alt={product.name} />
            <div className={styles.info}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className={styles.category}>{product.category}</span>
              
              {editingId === product.id ? (
                <div className={styles.editMode}>
                  <input
                    type="number"
                    step="0.01"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className={styles.priceInput}
                  />
                  <button onClick={() => handleSave(product.id)} className={styles.saveBtn}>
                    <Save size={18} />
                  </button>
                  <button onClick={handleCancel} className={styles.cancelBtn}>
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className={styles.priceRow}>
                  <span className={styles.price}>${product.price.toFixed(2)}</span>
                  <button onClick={() => handleEdit(product)} className={styles.editBtn}>
                    <Edit2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}