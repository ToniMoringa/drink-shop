import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Package, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Shop.module.css';

const Shop = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const ENDPOINT = `${API_URL}/drinks`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : Object.values(data).flat());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === 'all' || p.category === category),
  );

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.spinner} size={48} />
        <p>Brewing...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.error}>
        <AlertCircle size={48} />
        <p>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );

  return (
    <div className={styles.shop}>
      <div className={styles.header}>
        <h1>Our Menu</h1>
        <p>Choose your perfect pixel drink</p>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
      />
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <Package size={64} />
          <p>No drinks found</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Shop;
