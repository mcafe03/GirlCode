import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";
import Header from "../components/Header";
import "../css/product.css";

export default function ProductPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category") || "All Products";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) =>
          p.categories.some(
            (c) => normalize(c) === normalize(selectedCategory)
          )
        );

  const displayCategory =
    selectedCategory === "All Products"
      ? "Our Products"
      : products.find((p) =>
          p.categories.some((c) => normalize(c) === normalize(selectedCategory))
        )?.categories.find((c) => normalize(c) === normalize(selectedCategory)) ||
        selectedCategory;

  return (
    <>
      <Header />

      <div className="product-page-container">

        <div className="desktop-only">
          <SidebarFilters
            selectedCategory={selectedCategory}
            onFilterChange={setSelectedCategory}
          />
        </div>

        <div className="product-section">
        
          <div className="product-header">
            <span className="show-now">——— SHOW NOW</span>
            <h2 className="section-title">{displayCategory}</h2>
          </div>

          <div className="mobile-filters">
            <SidebarFilters
              selectedCategory={selectedCategory}
              onFilterChange={setSelectedCategory}
            />
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
