import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function ProductCard({ 
  product, 
  showQuantity = false, 
  showAddButton = false 
}) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQty = Math.max(1, quantity + change);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    //  console.log the product details
    console.log('Added to cart:', {
      product: product.name,
      quantity: quantity,
      price: product.price,
      total: (product.price * quantity).toFixed(2)
    });
    
    // Show visual feedback
    const card = document.activeElement?.closest(`.${styles.card}`);
    if (card) {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image?.startsWith('http') || product.image?.startsWith('data:') 
            ? product.image 
            : `/assets/drinks/${product.image?.split('/').pop()}` || '/placeholder.png'} 
          alt={product.name}
          className={styles.image}
          onError={(e) => {
            e.target.src = '/placeholder.png';
          }}
        />
        <span className={`${styles.badge} ${styles[product.category]}`}>
          {product.category}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price?.toFixed(2)}</p>
        
        {/* Quantity Selector + Add Button */}
        {showQuantity && showAddButton && (
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button 
                className={styles.qtyBtn}
                onClick={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button 
                className={styles.qtyBtn}
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            
            <button 
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
            >
              Add to Cart ${((product.price || 0) * quantity).toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}