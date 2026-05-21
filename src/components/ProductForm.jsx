import { useState, useRef } from 'react';
import { Upload, X, Save } from 'lucide-react';
import styles from './ProductForm.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({ name: product?.name || '', description: product?.description || '', category: product?.category || 'hot', price: product?.price || '', image: product?.image || '' });
  const [imagePreview, setImagePreview] = useState(product?.image || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert('File must be less than 5MB'); return; }
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); setFormData({ ...formData, image: reader.result }); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setUploading(true);
    try {
      const url = product ? `${API_URL}/drinks/${product.id}` : `${API_URL}/drinks`;
      const method = product ? 'PATCH' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error('Failed to save');
      onSuccess();
    } catch (error) { alert('Failed to save drink: ' + error.message); } finally { setUploading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}><h2>{product ? 'Edit Drink' : 'Add New Drink'}</h2><button type="button" onClick={onCancel} className={styles.closeBtn}><X size={20} /></button></div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Drink Image</label>
        {imagePreview ? <div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /><button type="button" onClick={() => { setImagePreview(null); setFormData({ ...formData, image: '' }); }} className={styles.removeImage}><X size={16} /></button></div> : <div className={styles.uploadZone} onClick={() => fileInputRef.current?.click()}><Upload size={40} /><p>Click to upload image</p><span className={styles.hint}>PNG, JPG under 5MB</span></div>}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput} />
      </div>
      <div className={styles.formGroup}><label className={styles.label}>Drink Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Matcha Magic" required className={styles.input} /></div>
      <div className={styles.formGroup}><label className={styles.label}>Description *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" required className={styles.input} /></div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}><label className={styles.label}>Category *</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={styles.input}><option value="hot">Hot Drink</option><option value="cold">Cold Drink</option></select></div>
        <div className={styles.formGroup}><label className={styles.label}>Price ($) *</label><input type="number" step="0.01" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} placeholder="5.50" required className={styles.input} /></div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
        <button type="submit" className={styles.submitBtn} disabled={uploading}><Save size={18} />{uploading ? 'Saving...' : product ? 'Update Drink' : 'Add Drink'}</button>
      </div>
    </form>
  );
};

export default ProductForm;