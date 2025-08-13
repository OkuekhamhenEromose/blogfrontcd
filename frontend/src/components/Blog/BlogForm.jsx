import { useState } from 'react';
import './BlogForm.css';

const BlogForm = ({ categories, onSubmit, initialData = {}, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    category_id: initialData.category?.id || categories[0]?.id || '',
    published: initialData.published !== undefined ? initialData.published : true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength="3"
          placeholder="Enter post title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          required
          placeholder="Write your post content here..."
        ></textarea>
      </div>

      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={handleChange}
        />
        <label htmlFor="published">Publish this post</label>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {initialData.id ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData.id ? 'Update Post' : 'Create Post'
          )}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;