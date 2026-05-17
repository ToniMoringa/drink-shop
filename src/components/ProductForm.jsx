import { Thermometer, Droplets } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image || '/placeholder.png'} 
          alt={product.name}
          className={styles.image}
        />
        <span className={`${styles.badge} ${styles[product.category]}`}>
          {product.category === 'hot' ? (
            <><Thermometer size={14} /> Hot</>
          ) : (
            <><Droplets size={14} /> Cold</>
          )}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}