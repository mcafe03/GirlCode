import { useState } from "react";

export default function ProductInfo({ product }) {
  const sizes = product.sizes || ["S", "M", "L", "XL"]; // fallback sizes
  const details = product.details || [
    "High-quality fabric",
    "Comfortable fit",
    "Modern design",
  ]; // fallback details

  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-info">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-price">₱{product.price}</p>

      {/* Size Selector */}
      <div className="product-size">
        <label>Size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          {sizes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <a href="#" className="size-chart">Size Chart</a>
      </div>

      {/* Quantity Selector */}
      <div className="product-quantity">
        <label>Quantity</label>
        <div className="quantity-controls">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>‹</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>›</button>
        </div>
      </div>

      {/* Description */}
      <div className="product-description">
        <h3>Description and Details</h3>
        <ul>
          {details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>

      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
}
