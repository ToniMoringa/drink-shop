import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Upload, X } from 'lucide-react';
import styles from './ProductForm.module.css';

export default function ProductForm() {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'cold',
    price: '',
    image: ''
  });
  const [preview, setPreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFormData({ ...formData, image: '' });
    setPreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ 
      ...formData, 
      price: parseFloat(formData.price) 
    });
    setFormData({ name: '', description: '', category: 'cold', price: '', image: '' });
    setPreview('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add New Drink ✨</h2>
      
      <input
        type="text"
        placeholder="Drink Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows="3"
      />
      
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="cold">Cold Drink 🧊</option>
        <option value="hot">Hot Drink ☕</option>
      </select>
      
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Price ($)"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
      />
      
      <label className={styles.upload}>
        <Upload size={24} />
        <span>Drop PNG here or click to upload</span>
        <input 
          type="file" 
          accept="image/png,image/jpeg" 
          onChange={handleImageUpload} 
          hidden 
        />
      </label>
      
      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.preview} />
          <button type="button" onClick={clearImage} className={styles.clearBtn}>
            <X size={20} />
          </button>
        </div>
      )}
      
      <button type="submit" className={styles.submitBtn}>
        Add Drink 🎉
      </button>
    </form>
  );
}