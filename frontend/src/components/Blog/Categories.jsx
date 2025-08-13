import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = ({ categories }) => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Categories</h2>
      <div className="categories-list">
        {categories.map(category => (
          <Link 
            key={category.id} 
            to={`/blog?category=${category.id}`}
            className="category-item"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;