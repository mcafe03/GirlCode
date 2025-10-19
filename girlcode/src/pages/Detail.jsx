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
        <div className="detail-page-container text-center py-10">
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
          <h3 className="text-lg font-medium mb-3">Dresses & Plus Size</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-2">Size</th>
                <th className="pb-2">Bust (in)</th>
                <th className="pb-2">Waist (in)</th>
                <th className="pb-2">Hips (in)</th>
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
                  className="clickable-size-row cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td className="py-2">{row.size}</td>
                  <td className="py-2">{row.bust}</td>
                  <td className="py-2">{row.waist}</td>
                  <td className="py-2">{row.hips}</td>
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
          <h3 className="text-lg font-medium mb-3">Tops</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-2">Size</th>
                <th className="pb-2">Bust (in)</th>
                <th className="pb-2">Waist (in)</th>
                <th className="pb-2">Length (in)</th>
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
                  className="clickable-size-row cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td className="py-2">{row.size}</td>
                  <td className="py-2">{row.bust}</td>
                  <td className="py-2">{row.waist}</td>
                  <td className="py-2">{row.length}</td>
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
          <h3 className="text-lg font-medium mb-3">Bottoms</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-2">Size</th>
                <th className="pb-2">Waist (in)</th>
                <th className="pb-2">Hips (in)</th>
                <th className="pb-2">Length (in)</th>
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
                  className="clickable-size-row cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td className="py-2">{row.size}</td>
                  <td className="py-2">{row.waist}</td>
                  <td className="py-2">{row.hips}</td>
                  <td className="py-2">{row.length}</td>
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
          <h3 className="text-lg font-medium mb-3">Women's Shoes</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-2">US</th>
                <th className="pb-2">EU</th>
                <th className="pb-2">Foot Length (cm)</th>
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
                  className="clickable-size-row cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSizeSelect(row.size)}
                >
                  <td className="py-2">{row.size}</td>
                  <td className="py-2">{row.eu}</td>
                  <td className="py-2">{row.length}</td>
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

      <div className="detail-page-container max-w-6xl mx-auto px-4 py-8">
        <div className="breadcrumb text-sm mb-4">
          <Link to="/" className="breadcrumb-link text-gray-500 hover:text-black">
            Home
          </Link>{" "}
          ›{" "}
          <Link to="/products" className="breadcrumb-link text-gray-500 hover:text-black">
            Products
          </Link>{" "}
          › <span className="active font-semibold">{product.name}</span>
        </div>

        <div className="detail-layout flex flex-col lg:flex-row gap-8">
          {/* IMAGE SECTION */}
          <div className="image-section flex flex-col items-center lg:flex-row lg:items-start gap-4">
            <div className="thumbnails flex lg:flex-col gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i}`}
                  className={`thumbnail w-20 h-28 object-cover rounded-md border ${
                    mainImage === img ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

            <div className="main-image flex-1">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="info-section flex-1">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <p className="price text-lg text-rose-700 mb-4">{product.price} PHP</p>

            {hasSizeChart && (
              <div className="size-row mb-4">
                <label className="block font-medium mb-1">Size</label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="border rounded-md px-3 py-1"
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
                    className="size-chart text-rose-700 underline hover:text-black"
                    onClick={() => setShowSizeChart(true)}
                  >
                    Size Chart
                  </button>
                </div>
              </div>
            )}

            <div className="quantity-row mb-4">
              <label className="block font-medium mb-1">Quantity</label>
              <div className="quantity-controls flex items-center gap-2">
                <button onClick={decreaseQuantity} className="border px-2 rounded">
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity} className="border px-2 rounded">
                  +
                </button>
              </div>
            </div>

            <div className="details mb-6">
              <h3 className="font-semibold mb-2">Description and Details</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.details?.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <button
              className="add-to-cart bg-[#8C1C13] text-white px-6 py-3 rounded-md hover:bg-[#A32018] transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div
          className="sizechart-overlay fixed inset-0 flex items-center justify-center bg-black/50 z-40"
          onClick={() => setShowSizeChart(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.22 }}
            className="sizechart-modal bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="sizechart-close absolute top-3 right-3 text-xl"
              onClick={() => setShowSizeChart(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Size Chart</h2>
            <div className="sizechart-content">{renderSizeChart()}</div>
          </motion.div>
        </div>
      )}

      {showCartPopup && (
        <div
          className="added-notification fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={() => setShowCartPopup(false)}
        >
          <div
            className="added-box modern bg-white flex items-center gap-3 p-4 rounded-lg shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={mainImage} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
            <div className="text">
              <p className="title font-medium">Added to Cart</p>
              <p className="name text-gray-600">{product.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
