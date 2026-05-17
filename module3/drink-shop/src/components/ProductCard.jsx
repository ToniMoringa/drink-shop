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
      </div>
      <div className={styles.content}>
        <span className={`${styles.badge} ${styles[product.category]}`}>
          {product.category}
        </span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}