import { Facebook, Instagram, Twitter  } from "lucide-react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import display1 from "../assets/display1.png";
import display2 from "../assets/display2.png";
import display3 from "../assets/display3.png";
import display4 from "../assets/display4.png";
import bg from "../assets/bg.png";
import img7 from "../assets/img7.png";
import logowhite from "../assets/logowhite.png";
import Header from "../components/Header";
import confidenceImg from "../assets/confidence.png";
import beautyImg from "../assets/beauty.png";
import classyImg from "../assets/classy.png";
import dominanceImg from "../assets/dominance.png";
import redbg from "../assets/redbg.png";

import { Link } from "react-router-dom";


import "../css/landing.css"; 
import { useState } from "react";


export default function LandingPage() {

const products = [
  {
    id: 1,
    img: product1,
    title: "Metallic Open Stitch Sweater Dress",
    price: "1000 PHP",
  },
  {
    id: 2,
    img: product2,
    title: "Mixed Fabric Tank Dress",
    price: "680 PHP",
  },
  {
    id: 3,
    img: product3,
    title: "Shirred Godet Flare Poplin Dress",
    price: "900 PHP",
  },
  {
    id: 4,
    img: product4,
    title: "Off The Shoulder Maxi Dress",
    price: "780 PHP",
  },
];


  return (
    <div id="home" className="min-h-screen">
  
      {/* Header */}
      <Header />

      {/* Home */}
      <div className="relative w-full overflow-hidden mt-5">
        <div className="flex justify-center gap-2 sm:gap-4">
          <div className="home-card group w-[80%] sm:w-auto">
            <img src={img1} alt="Front 1" className="home-img-front" />
            <img src={img4} alt="Back 1" className="home-img-back" />
          </div>

          <div className="home-card group w-[80%] sm:w-auto">
            <img src={img2} alt="Front 2" className="home-img-front" />
            <img src={img5} alt="Back 2" className="home-img-back" />
          </div>

          <div className="home-card group w-[80%] sm:w-auto">
            <img src={img3} alt="Front 3" className="home-img-front" />
            <img src={img6} alt="Back 3" className="home-img-back" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div id="products" className="text-center px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 mt-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8C1C13] mb-3 sm:mb-4">
          Made for Women. Worn with Power.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
          Girl Code is where fashion meets empowerment — stylish, affordable, 
          and made to celebrate every woman’s individuality.
        </p>
      </div>

      {/* Products */}
      <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-1">
        <div className="mb-6 sm:mb-8 md:mb-10 text-left">
          <h2 className="section-title">NEW COLLECTION</h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-900">
            Curves in Style
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <Link to="/products?category=plussize">
              <div key={product.id} className="product-card group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="product-img"
                  />
                  <div className="product-overlay">
                    <span>VIEW PRODUCT</span>
                  </div>
                </div>

                <div className="product-info  text-left">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      
    {/* Display */}
    <div
      id="categories"
      className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-5xl mx-auto gap-3 sm:gap-0 mt-10"
    >
      {/* Shoes */}
      <div className="order-1 sm:order-1 display-card group aspect-square max-w-[280px] mx-auto sm:max-w-none">
        <img src={display1} alt="Display 1" className="display-img" />
        <div className="overlay opacity-0 group-hover:opacity-100">
          <div className="overlay-content p-2 sm:p-6">
            <p className="display-text text-xs sm:text-lg">
              A woman in heels is a woman in power.
            </p>
            <Link to="/products?category=shoes">
              <button className="display-btn text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-2">
                SHOP MORE SHOES →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tops */}
      <div className="order-2 sm:order-2 display-card group aspect-square max-w-[280px] mx-auto sm:max-w-none">
        <img src={display2} alt="Display 2" className="display-img" />
        <div className="overlay opacity-100">
          <div className="overlay-content p-2 sm:p-6">
            <p className="display-text text-xs sm:text-lg">
              A woman in suit is a woman in power.
            </p>
            <Link to="/products?category=tops">
              <button className="display-btn text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-2">
                SHOP MORE TOPS →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottoms */}
      <div className="order-4 sm:order-3 display-card group aspect-square max-w-[280px] mx-auto sm:max-w-none">
        <img src={display3} alt="Display 3" className="display-img" />
        <div className="overlay opacity-100">
          <div className="overlay-content p-2 sm:p-6">
            <p className="display-text text-xs sm:text-lg">
              A woman in skirt is a woman in power.
            </p>
            <Link to="/products?category=bottoms">
              <button className="display-btn text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-2">
                SHOP MORE BOTTOMS →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bags */}
      <div className="order-3 sm:order-4 display-card group aspect-square max-w-[280px] mx-auto sm:max-w-none">
        <img src={display4} alt="Display 4" className="display-img" />
        <div className="overlay opacity-0 group-hover:opacity-100">
          <div className="overlay-content p-2 sm:p-6">
            <p className="display-text text-xs sm:text-lg">
              A woman who carries is a woman in power.
            </p>
            <Link to="/products?category=bags">
              <button className="display-btn text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-2">
                SHOP MORE BAGS →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>


    {/* About */}
    <div className="relative w-full mt-20 mb-10">
      <img src={bg}  alt="Background" className="w-full h-auto object-cover"/>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-snug tracking-wide">
          Where there is{" "}
          <span
            className="text-[#8C1C13] font-monsieur italic"
            style={{
              fontSize: "1.4em",
              lineHeight: "1",
            }}
          >
            Woman
          </span>
          ,<br />
          <span className="block mt-2">there is Power.</span>
        </h1>
      </div>
    </div>

    
    <section id="about" className="relative w-full bg-white text-black py-24 overflow-hidden">
      <img
        src={confidenceImg}
        alt="Confidence"
        className="absolute top-10 left-2 sm:left-10 w-20 sm:w-28 md:w-36 rotate-[-10deg] shadow-2xl border-8 sm:border-[10px] border-white z-0 transition-transform duration-300 hover:scale-110 hover:rotate-[-5deg]"
      />
      <img
        src={beautyImg}
        alt="Beauty"
        className="absolute top-10 right-2 sm:right-10 w-20 sm:w-28 md:w-36 rotate-[8deg] shadow-2xl border-8 sm:border-[10px] border-white z-0 transition-transform duration-300 hover:scale-110 hover:rotate-[12deg]"
      />
      <img
        src={classyImg}
        alt="Classy"
        className="absolute bottom-10 left-4 sm:left-16 w-20 sm:w-28 md:w-36 rotate-[12deg] shadow-2xl border-8 sm:border-[10px] border-white z-0 transition-transform duration-300 hover:scale-110 hover:rotate-[8deg]"
      />
      <img
        src={dominanceImg}
        alt="Dominance"
        className="absolute bottom-10 right-4 sm:right-10 w-20 sm:w-28 md:w-36 rotate-[-10deg] shadow-2xl border-8 sm:border-[10px] border-white z-0 transition-transform duration-300 hover:scale-110 hover:rotate-[-5deg]"
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C1C13] mb-4 font-semibold">
          [ GIRL CODE ]
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-tight text-[#111]">
          <span className="block">Empowering</span>
          <span className="block">Confidence to New</span>
          <span
            className="block text-[#8C1C13] text-5xl sm:text-7xl md:text-8xl"
            style={{ fontFamily: "Monsieur La Doulaise, cursive" }}
          >
            Heights
          </span>
        </h2>
      </div>

      <div className="text-center max-w-3xl mx-auto mt-12 sm:mt-16 px-4 sm:px-6 relative z-20">
        <h3 className="text-xl sm:text-3xl font-semibold mb-4">Who We Are?</h3>
        <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-xs sm:text-base">
          Girl Code is a women-centered fashion brand created by Mafe Quincena,
          built on the belief that fashion is more than just clothing — it is
          empowerment, inclusivity, and self-expression. The brand celebrates
          women of every shape, size, and style, offering affordable yet stylish
          pieces designed to inspire confidence and authenticity.
        </p>
      <Link
        to="/products"
        className="bg-[#8C1C13] text-white px-6 sm:px-8 py-2 rounded-full font-semibold hover:bg-[#a31c1c] transition-all duration-300 text-sm sm:text-base inline-block text-center"
      >
        SHOP NOW →
      </Link>
      </div>
    </section>


    <footer
      id="contact"
      className="relative text-white px-6 sm:px-12 lg:px-20 py-12"
      style={{
        backgroundImage: `url(${redbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto z-10">
        <div>
          <img src={logowhite} alt="Logo" className="h-12 mb-4" />
          <h3 className="font-semibold mb-2">Made for Women. Worn with Power.</h3>
          <p className="text-sm leading-relaxed">
            Girl Code is a women-centered fashion brand that goes beyond clothing.
            We create stylish, affordable, and inclusive pieces designed to empower
            confidence and celebrate individuality.
          </p>
        </div>

        <div className="flex flex-col space-y-3 md:items-center">
          <a href="#" className="hover:underline">Home</a>
          <a href="#products" className="nav-link">Product</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#about" className="nav-link">Our Story</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Subscribe to our Newsletter</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black w-full"
            />
            <button
              type="button"
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md"
            >
              Subscribe
            </button>
          </div>

          <p className="mt-6 text-sm">Follow us on social media.</p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-white hover:text-gray-300" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-white hover:text-gray-300" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Twitter className="w-5 h-5 text-white hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>


    </div>
  );
}
