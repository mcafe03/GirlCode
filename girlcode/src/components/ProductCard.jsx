import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function ProductCard({ id, images, name, price }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  const handleClick = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (!isLoggedIn) navigate("/login");
    else navigate(`/product/${id}`);
  };


  const handleMouseEnter = () => {
    if (images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 800);
      
      document.querySelector(`#product-${id}`).dataset.interval = interval;
    }
  };

  const handleMouseLeave = () => {
    const elem = document.querySelector(`#product-${id}`);
    clearInterval(elem?.dataset.interval);
    setCurrentIndex(0);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; //
    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
     
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        
        setCurrentIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      }
    }
  };

  return (
    <div
      id={`product-${id}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="product-card cursor-pointer transition-transform duration-300"
    >
      <img
        src={images?.[currentIndex]}
        alt={name}
        className="product-image transition-all duration-500 ease-in-out"
      />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">₱{price}</p>
    </div>
  );
}
