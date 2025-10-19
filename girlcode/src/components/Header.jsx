import { ShoppingBag, User, X, LogOut, UserCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logored from "../assets/logored.png";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { cartItems, clearCart } = useCart();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "products", label: "Products", path: "/products?category=All Products" },
    { id: "about", label: "About", path: "#about" },
    { id: "contact", label: "Contact", path: "#contact" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!storedUser);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const restrictedRoutes = ["/cart", "/account"];
    if (!storedUser && restrictedRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location, navigate]);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setDropdownOpen((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

const handleLogout = () => {
  localStorage.removeItem("loggedInUser");
  clearCart(); 
  navigate("/login");
  setDropdownOpen(false);
};

  const handleCartClick = (e) => {
    e.preventDefault();
    navigate(isLoggedIn ? "/cart" : "/login");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (e, link) => {
    if (link.path.startsWith("#")) {
      e.preventDefault();
      const targetId = link.path.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const delayedTarget = document.getElementById(targetId);
          if (delayedTarget) delayedTarget.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/70">
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-10 py-4">

        {/* Left side */}
        <div className="flex items-center">
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 ml-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`hover:text-[#8C1C13] transition ${
                    location.pathname === link.path
                      ? "font-semibold text-[#8C1C13]"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logored} alt="Logo" className="h-10 sm:h-12 mx-auto" />
        </div>

        {/* Right side - icons */}
        <div className="flex items-center space-x-5 relative">
          {/* Cart */}
          <button onClick={handleCartClick} className="relative">
            <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-[#8C1C13] transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8C1C13] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={handleAccountClick}>
              <User className="w-5 h-5 text-gray-700 cursor-pointer hover:text-[#8C1C13] transition" />
            </button>

            {isLoggedIn && dropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    navigate("/account");
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <UserCircle className="w-4 h-4 mr-2 text-[#8C1C13]" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2 text-[#8C1C13]" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col text-center py-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="block py-2 text-gray-700 hover:text-[#8C1C13] transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
