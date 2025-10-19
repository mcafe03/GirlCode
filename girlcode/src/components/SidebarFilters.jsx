export default function SidebarFilters({ selectedCategory, onFilterChange }) {
  const categories = ["All Products", "Tops", "Bottoms", "Dresses", "Plus Size", "Shoes", "Bags"];

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">ALL PRODUCTS</h3>
      <p className="sidebar-subtitle">
        Shop now, not later. Browse the best of our favorite sale styles and brands.
      </p>

      <ul className="sidebar-list">
        {categories.map(cat => (
          <li 
            key={cat} 
            className={`sidebar-item ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => onFilterChange(cat)}
          >
            <span className="bullet"></span> {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
