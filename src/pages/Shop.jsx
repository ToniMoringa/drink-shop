import { mockProducts } from '../data/mockData';

//  mock data in production, API in development
const USE_MOCK_DATA = import.meta.env.PROD;

const fetchProducts = async () => {
  try {
    setLoading(true);

    if (USE_MOCK_DATA) {
      //  mock data for production
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network
      setProducts(mockProducts);
    } else {
      //  JSON server for development
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    }

    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Package, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.spinner} size={48} />
        <p>Brewing your drinks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <AlertCircle size={48} />
        <p>Oops! Couldn't load drinks</p>
        <button onClick={fetchProducts}>Try Again</button>
      </div>
    );
  }

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

      {filteredProducts.length === 0 ? (
        <div className={styles.empty}>
          <Package size={64} />
          <p>No drinks found</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
