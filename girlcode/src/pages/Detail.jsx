import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";
import Header from "../components/Header";
import "../css/detail.css";
import { useCart } from "../context/CartContext";

export default function Detail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  // safe initial mainImage
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const { addToCart, cartItems } = useCart();

  const handleSizeSelect = (size) => {
    const sizeMap = {
      S: "Small",
      M: "Medium",
      L: "Large",
      XL: "XL",
      XXL: "XXL",
      "1X": "1X",
      "2X": "2X",
      "3X": "3X",
      "5": "US 5",
      "6": "US 6",
      "7": "US 7",
      "8": "US 8",
      "9": "US 9",
      "10": "US 10",
    };

    const mappedSize = sizeMap[size] || size;
    setSelectedSize(mappedSize);
    setShowSizeChart(false);

    const select = document.querySelector("select");
    if (select) {
      select.classList.add("updated");
      setTimeout(() => select.classList.remove("updated"), 400);
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="detail-page-container">
          <p>Product not found.</p>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: mainImage,
      size: selectedSize,
      quantity,
      price: product.price,
    });

   
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 1600);
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const categoryList = product.categories.map((c) => c.toLowerCase());
  const hasSizeChart = categoryList.some((c) =>
    ["tops", "bottoms", "dresses", "plus size", "shoes"].includes(c)
  );

  const renderSizeChart = () => {
   
    if (categoryList.includes("plus size") || categoryList.includes("dresses")) {
      return (
        <>
          <h3>Dresses & Plus Size</h3>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust (in)</th>
                <th>Waist (in)</th>
                <th>Hips (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "S", bust: "33–35", waist: "26–28", hips: "36–38" },
                { size: "M", bust: "36–38", waist: "29–31", hips: "39–41" },
                { size: "L", bust: "39–41", waist: "32–34", hips: "42–44" },
                { size: "XL", bust: "42–45", waist: "35–38", hips: "45–47" },
                { size: "1X", bust: "46–48", waist: "39–42", hips: "48–50" },
                { size: "2X", bust: "49–52", waist: "43–46", hips: "51–54" },
                { size: "3X", bust: "53–56", waist: "47–50", hips: "55–58" },
              ].map((row) => (
                <tr
                  key={row.size}
                  className="clickable-size-row"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td>{row.size}</td>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (categoryList.includes("tops")) {
      return (
        <>
          <h3>Tops</h3>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust (in)</th>
                <th>Waist (in)</th>
                <th>Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "S", bust: "32–34", waist: "26–28", length: "23–24" },
                { size: "M", bust: "35–37", waist: "29–31", length: "24–25" },
                { size: "L", bust: "38–40", waist: "32–34", length: "25–26" },
                { size: "XL", bust: "41–44", waist: "35–38", length: "26–27" },
              ].map((row) => (
                <tr
                  key={row.size}
                  className="clickable-size-row"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td>{row.size}</td>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (categoryList.includes("bottoms")) {
      return (
        <>
          <h3>Bottoms</h3>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Waist (in)</th>
                <th>Hips (in)</th>
                <th>Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "S", waist: "26–28", hips: "34–36", length: "38" },
                { size: "M", waist: "29–31", hips: "37–39", length: "39" },
                { size: "L", waist: "32–34", hips: "40–42", length: "40" },
                { size: "XL", waist: "35–38", hips: "43–45", length: "41" },
              ].map((row) => (
                <tr
                  key={row.size}
                  className="clickable-size-row"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td>{row.size}</td>
                  <td>{row.waist}</td>
                  <td>{row.hips}</td>
                  <td>{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (categoryList.includes("shoes")) {
      return (
        <>
          <h3>Women's Shoes</h3>
          <table>
            <thead>
              <tr>
                <th>US</th>
                <th>EU</th>
                <th>Foot Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "5", eu: "35", length: "22.1" },
                { size: "6", eu: "36", length: "22.9" },
                { size: "7", eu: "37", length: "23.6" },
                { size: "8", eu: "38", length: "24.3" },
                { size: "9", eu: "39", length: "25.0" },
                { size: "10", eu: "40", length: "25.7" },
              ].map((row) => (
                <tr
                  key={row.size}
                  className="clickable-size-row"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td>{row.size}</td>
                  <td>{row.eu}</td>
                  <td>{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return <p>No size chart available for this product.</p>;
  };

  return (
    <>
      <Header />

      <div className="detail-page-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link> ›{" "}
          <Link to="/products" className="breadcrumb-link">Products</Link> ›{" "}
          <span className="active">{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* IMAGE SECTION: thumbnails left on desktop, below on mobile */}
          <div className="image-section">
            <div className="thumbnails left">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

            <div className="main-image">
              <img src={mainImage} alt={product.name} />
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="info-section">
            <h1>{product.name}</h1>
            <p className="price">{product.price} PHP</p>

            {hasSizeChart && (
              <div className="size-row">
                <label>Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {categoryList.includes("shoes") ? (
                    <>
                      <option>US 5</option>
                      <option>US 6</option>
                      <option>US 7</option>
                      <option>US 8</option>
                      <option>US 9</option>
                      <option>US 10</option>
                    </>
                  ) : categoryList.includes("plus size") ||
                    categoryList.includes("dresses") ? (
                    <>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                      <option>XL</option>
                      <option>1X</option>
                      <option>2X</option>
                      <option>3X</option>
                    </>
                  ) : (
                    <>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                      <option>XL</option>
                    </>
                  )}
                </select>
                <button
                  className="size-chart"
                  onClick={() => setShowSizeChart(true)}
                >
                  Size Chart
                </button>
              </div>
            )}

            <div className="quantity-row">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <div className="details">
              <h3>Description and Details</h3>
              <ul>{product.details?.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="sizechart-overlay" onClick={() => setShowSizeChart(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.22 }}
            className="sizechart-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sizechart-close" onClick={() => setShowSizeChart(false)}>✕</button>
            <h2>Size Chart</h2>
            <div className="sizechart-content">{renderSizeChart()}</div>
          </motion.div>
        </div>
      )}

      {/* Centered Added-to-Cart Popup */}
      {showCartPopup && (
        <div className="added-notification" onClick={() => setShowCartPopup(false)}>
          <div
            className="added-box modern"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={mainImage} alt={product.name} />
            <div className="text">
              <p className="title">Added to Cart</p>
              <p className="name">{product.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
