import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // Show first 6 products as "featured"
      setProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading featured drinks...</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Drinks</h2>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'hot' ? styles.active : ''}`}
              onClick={() => setFilter('hot')}
            >
              Hot
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'cold' ? styles.active : ''}`}
              onClick={() => setFilter('cold')}
            >
              Cold
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showQuantity={true}
              showAddButton={true}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className={styles.viewAll}>
          <a href="/shop" className={styles.viewAllLink}>
            View All Drinks →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
