import { Search, Filter, X } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchTerm, setSearchTerm, category, setCategory }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search drinks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className={styles.clearButton}
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className={styles.filterContainer}>
        <Filter size={18} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Drinks</option>
          <option value="hot">Hot Drinks</option>
          <option value="cold">Cold Drinks</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;