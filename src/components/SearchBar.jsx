import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchContainer}>
      <Search size={20} className={styles.icon} />
      <input
        type="text"
        placeholder="Search drinks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}