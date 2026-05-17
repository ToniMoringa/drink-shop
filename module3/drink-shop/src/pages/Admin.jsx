import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/ProductForm';
import styles from './Admin.module.css';

export default function Admin() {
  const { products, updateProduct } = useProducts();
  const [editingId, setEditingId] = useState(null);

  const handlePriceChange = (id, newPrice) => {
    updateProduct(id, { price: parseFloat(newPrice) });
  };

  return (
    <div className={styles.admin}>
      <h1>Manage Your Drinks</h1>
      <ProductForm />
      
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image} alt={product.name} />
            <div className={styles.info}>
              <h3>{product.name}</h3>
              <label>
                Price: $
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => handlePriceChange(product.id, e.target.value)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}