import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import mainImg from "../assets/main.png";
import confidenceImg from "../assets/confidence.png";
import beautyImg from "../assets/beauty.png";
import classyImg from "../assets/classy.png";
import dominanceImg from "../assets/dominance.png";
import allureImg from "../assets/allure.png";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  const imageMap = {
    Confidence: confidenceImg,
    Beauty: beautyImg,
    Classy: classyImg,
    Dominance: dominanceImg,
    Allure: allureImg,
  };
  const currentImage = hovered ? imageMap[hovered] : mainImg;

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "email") {
      if (!value) errorMsg = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        errorMsg = "Please enter a valid email address";
      else if (!value.toLowerCase().endsWith("@gmail.com"))
        errorMsg = "Email must end with @gmail.com";
    }

    if (name === "username") {
      if (!value) errorMsg = "Username is required";
      else if (value.length < 3)
        errorMsg = "Username must be at least 3 characters long";
    }

    if (name === "password") {
      if (!value) errorMsg = "Password is required";
      else if (value.length < 8)
        errorMsg = "Password must be at least 8 characters long";
      else if (!/[A-Z]/.test(value))
        errorMsg = "Password must contain at least one uppercase letter";
      else if (!/[a-z]/.test(value))
        errorMsg = "Password must contain at least one lowercase letter";
      else if (!/[0-9]/.test(value))
        errorMsg = "Password must contain at least one number";
    }

    if (name === "confirmPassword") {
      if (!value) errorMsg = "Please confirm your password";
      else if (value !== form.password) errorMsg = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(form).forEach((field) => validateField(field, form[field]));

    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors || Object.values(form).some((val) => val === "")) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.email.toLowerCase() === form.email.toLowerCase()
    );

    if (userExists) {
      setMessage("⚠️ An account with this email already exists.");
      return;
    }

    const { email, username, password } = form;
    const updatedUsers = [...existingUsers, { email, username, password }];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setMessage("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      setMessage("");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="login-container flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* IMAGE SECTION */}
      <div
        className="login-left w-full md:w-1/2 relative bg-cover bg-center h-[220px] md:h-auto transition-all duration-700"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute bottom-4 left-0 w-full flex flex-col items-center gap-1 md:gap-2">
          {["Confidence", "Beauty", "Classy", "Dominance", "Allure"].map(
            (word) => (
              <h1
                key={word}
                onMouseEnter={() => setHovered(word)}
                onMouseLeave={() => setHovered("")}
                className="hover-word text-white text-sm sm:text-lg font-semibold tracking-wide drop-shadow-md transition-transform duration-300 hover:scale-110 cursor-pointer"
              >
                {word}
              </h1>
            )
          )}
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="login-right flex justify-center items-center w-full md:w-1/2 py-10 px-6 sm:px-10 bg-white shadow-lg">
        <form
          className={`login-form form-fade w-full max-w-md ${
            fadeIn ? "active" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Sign up</h1>
          <p className="register-text mb-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="register-link text-red-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here!
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
            Username
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
          {errors.username && (
            <p className="error-text text-red-500 text-sm mb-2">
              {errors.username}
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

          <label className="block font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="input-group mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
          {errors.confirmPassword && (
            <p className="error-text text-red-500 text-sm mb-2">
              {errors.confirmPassword}
            </p>
          )}

          {message && (
            <p
              className={`text-center mt-2 text-sm ${
                message.includes("⚠️") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="login-btn w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
