import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Package, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Shop.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const fetchProducts = async () => {
    try {
      setLoading(true);
    
      const response = await fetch(`${API_URL}/products`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
   
      setProducts(Array.isArray(data) ? data : Object.values(data));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load products. Is the backend running on port 3001?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className={styles.loading}><Loader2 className={styles.spinner} size={48} /><p>Brewing your drinks...</p></div>;
  
  if (error) return <div className={styles.error}><AlertCircle size={48} /><p>{error}</p><button onClick={fetchProducts}>Try Again</button></div>;

  return (
    <div className={styles.shop}>
      <div className={styles.header}><h1>Our Menu</h1><p>Choose your perfect pixel drink</p></div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} category={category} setCategory={setCategory} />
      {filteredProducts.length === 0 ? (
        <div className={styles.empty}><Package size={64} /><p>No drinks found</p></div>
      ) : (
        <div className={styles.grid}>{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      )}
    </div>
  );
};

export default Shop;