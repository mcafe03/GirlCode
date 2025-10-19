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

      <div className="product-page-container flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">

        {/* Sidebar for desktop */}
        <div className="desktop-only hidden lg:block w-1/4">
          <SidebarFilters
            selectedCategory={selectedCategory}
            onFilterChange={setSelectedCategory}
          />
        </div>

        {/* Product section */}
        <div className="product-section flex-1">

          {/* Header */}
          <div className="product-header text-center mb-6">
            <span className="show-now block text-sm tracking-widest text-gray-500 mb-1">
              SHOW NOW
            </span>
            <h2 className="section-title text-2xl font-semibold">{displayCategory}</h2>
          </div>

          {/* Filters for mobile */}
          <div className="mobile-filters block lg:hidden mb-6">
            <SidebarFilters
              selectedCategory={selectedCategory}
              onFilterChange={setSelectedCategory}
            />
          </div>

          {/* Product grid */}
          <div className="product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
