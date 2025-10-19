import React, { useState, useEffect } from "react";
import "../css/login.css";
import mainImg from "../assets/main.png";
import confidenceImg from "../assets/confidence.png";
import beautyImg from "../assets/beauty.png";
import classyImg from "../assets/classy.png";
import dominanceImg from "../assets/dominance.png";
import allureImg from "../assets/allure.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [hovered, setHovered] = useState("");
  const [zoom, setZoom] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [fadeIn, setFadeIn] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email address";
    else if (!form.email.toLowerCase().endsWith("@gmail.com"))
      newErrors.email = "Email must end with @gmail.com";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.length === 0) {
      setMessage("No accounts found. Please register first.");
      setTimeout(() => {
        setMessage("");
        navigate("/register");
      }, 1500);
      return;
    }

    const matchedUser = storedUsers.find(
      (user) =>
        user.email.toLowerCase() === form.email.toLowerCase() &&
        user.password === form.password
    );

    if (matchedUser) {
      setMessage("Login successful! Redirecting to home...");
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 1500);
    } else {
      setMessage("Invalid email or password. Please try again.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const imageMap = {
    Confidence: confidenceImg,
    Beauty: beautyImg,
    Classy: classyImg,
    Dominance: dominanceImg,
    Allure: allureImg,
  };

  const currentImage = hovered ? imageMap[hovered] : mainImg;

  useEffect(() => {
    if (hovered) {
      setZoom(true);
      const timeout = setTimeout(() => setZoom(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [hovered]);

  return (
    <div className="login-container flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* IMAGE SECTION */}
      <div
        className={`login-left ${zoom ? "zoomed" : ""} relative w-full md:w-1/2 h-[220px] md:h-auto bg-cover bg-center transition-all duration-700`}
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-3 left-0 w-full flex flex-col items-center gap-1 md:gap-2">
          {["Confidence", "Beauty", "Classy", "Dominance", "Allure"].map(
            (word) => (
              <h1
                key={word}
                onMouseEnter={() => setHovered(word)}
                onMouseLeave={() => setHovered("")}
                className="hover-word text-white text-sm sm:text-lg font-semibold tracking-wide transition-transform duration-300 hover:scale-110 cursor-pointer"
              >
                {word}
              </h1>
            )
          )}
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="login-right flex justify-center items-center w-full md:w-1/2 py-12 px-6 sm:px-10 bg-white shadow-lg">
        <form
          className={`login-form form-fade w-full max-w-md ${
            fadeIn ? "active" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Sign in</h1>
          <p className="register-text mb-4 text-gray-600">
            Don’t have an account?{" "}
            <span
              className="register-link text-red-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here!
            </span>
          </p>

          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your Gmail address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
          {errors.email && (
            <p className="error-text text-red-500 text-sm mb-2">
              {errors.email}
            </p>
          )}

          <label className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="input-group mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
          {errors.password && (
            <p className="error-text text-red-500 text-sm mb-2">
              {errors.password}
            </p>
          )}

          {message && (
            <p
              className={`text-center mt-2 text-sm ${
                message.toLowerCase().includes("invalid") ||
                message.toLowerCase().includes("no account")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="login-btn w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
