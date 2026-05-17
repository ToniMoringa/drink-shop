import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import styles from './Shop.module.css';

export default function Shop() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Loading cute drinks...</div>;

  return (
    <div className={styles.shop}>
      <SearchBar value={search} onChange={setSearch} />
      <div className={styles.grid}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}