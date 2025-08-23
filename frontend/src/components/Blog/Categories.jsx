import { Link } from "react-router-dom";
import { Truck, Package, Award, Headphones, ShoppingCart, Users, Camera, Gamepad2 } from "lucide-react";
import "./Categories.css";

// Icon mapping for different category types
const categoryIcons = {
  "Free Shipping": Truck,
  "Always Fresh": Package,
  "Superior Quality": Award,
  "Support": Headphones,
  "Shopping": ShoppingCart,
  "Community": Users,
  "Photography": Camera,
  "Gaming": Gamepad2,
  // Default fallback
  default: Package
};

// Color mapping for different categories
const categoryColors = {
  "Free Shipping": "#E8B4E3",
  "Always Fresh": "#D4C5A9", 
  "Superior Quality": "#A8D8EA",
  "Support": "#C8D982",
  // Default colors for other categories
  default: ["#E8B4E3", "#D4C5A9", "#A8D8EA", "#C8D982"]
};

const Categories = ({ categories = [] }) => {
  if (!categories.length) {
    // Show default categories if none provided
    const defaultCategories = [
      { id: 1, name: "Free Shipping", description: "On order over $100" },
      { id: 2, name: "Always Fresh", description: "Product well package" },
      { id: 3, name: "Superior Quality", description: "Quality products" },
      { id: 4, name: "Support", description: "24/7 support" }
    ];

    return (
      <section className="categories-section">
        <div className="categories-grid">
          {defaultCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.name] || categoryIcons.default;
            const backgroundColor = categoryColors[category.name] || categoryColors.default[index % 4];
            
            return (
              <div key={category.id} className="category-card">
                <div 
                  className="category-icon"
                  style={{ backgroundColor }}
                >
                  <IconComponent size={32} color="white" />
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section">
      <div className="categories-grid">
        {categories.map((category, index) => {
          const IconComponent = categoryIcons[category.name] || categoryIcons.default;
          const backgroundColor = categoryColors[category.name] || 
            categoryColors.default[index % categoryColors.default.length];
          
          return (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="category-card category-link"
            >
              <div 
                className="category-icon"
                style={{ backgroundColor }}
              >
                <IconComponent size={32} color="white" />
              </div>
              <h3 className="category-title">{category.name}</h3>
              {category.description && (
                <p className="category-description">{category.description}</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;