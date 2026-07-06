import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar({ navigate, currentPage }) {
  const { theme, toggleTheme, cart, wishlist } = useContext(AppContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("products", { search: searchQuery });
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchToggle = () => {
    if (searchOpen) {
      if (searchQuery.trim() !== "") {
        setSearchQuery("");
      } else {
        setSearchOpen(false);
      }
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top py-2 py-lg-3" style={{
      background: "var(--navbar-bg)",
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
      borderBottom: "1px solid var(--border-color)",
      zIndex: 1030
    }}>
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* 1. BRAND LOGO */}
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); navigate("landing"); }} style={{
          fontFamily: "'Red Hat Text', sans-serif",
          fontWeight: 800,
          fontSize: "1.4rem",
          letterSpacing: "-0.04em",
          color: "var(--text-primary)",
          marginRight: "10px"
        }}>
          ELECTRA<span style={{ color: "var(--accent-cyan)" }}>.</span>
        </a>

        {/* 2. ACTION ICONS - RENDERED OUTSIDE COLLAPSE (Always visible on mobile & desktop) */}
        <div className="d-flex align-items-center gap-1 gap-md-2 ms-auto me-2 me-lg-0 order-lg-3">
          
          {/* Search Trigger Form */}
          <form onSubmit={handleSearchSubmit} className="d-flex align-items-center position-relative">
            {searchOpen && (
              <input
                type="text"
                className="form-control rounded-pill pe-4 ps-2 py-1 text-sm bg-transparent border-secondary"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-color)",
                  width: window.innerWidth < 450 ? "90px" : "150px",
                  fontSize: "0.8rem",
                  backdropFilter: "blur(10px)"
                }}
                autoFocus
              />
            )}
            <button
              type="button"
              className="btn border-0 text-primary-custom p-1 p-sm-2"
              onClick={handleSearchToggle}
              style={{ color: "var(--text-primary)" }}
            >
              <i className={`bi ${searchOpen ? (searchQuery ? "bi-x-lg text-danger" : "bi-x-lg") : "bi-search"} fs-5`}></i>
            </button>
          </form>

          {/* Theme Color Switcher */}
          <button 
            className="btn border-0 text-primary-custom p-1 p-sm-2" 
            onClick={toggleTheme} 
            aria-label="Toggle theme" 
            style={{ color: "var(--text-primary)" }}
          >
            <i className={`bi ${theme === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill"} fs-5`}></i>
          </button>

          {/* Wishlist Button */}
          <button 
            className="btn border-0 text-primary-custom position-relative p-1 p-sm-2" 
            onClick={() => navigate("products", { filterWishlist: true })} 
            aria-label="Wishlist" 
            style={{ color: "var(--text-primary)" }}
          >
            <i className="bi bi-heart fs-5"></i>
            {wishlist.length > 0 && (
              <span 
                className="position-absolute translate-middle badge rounded-pill bg-danger" 
                style={{ 
                  fontSize: "0.55rem",
                  top: "6px",
                  left: "75%"
                }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon Link */}
          <button 
            className="btn border-0 text-primary-custom position-relative p-1 p-sm-2 ps-2" 
            onClick={() => navigate("cart")} 
            aria-label="Cart" 
            style={{ color: "var(--text-primary)" }}
          >
            <div className="d-flex align-items-center px-2 px-sm-3 py-1 rounded-pill" style={{
              background: "rgba(0, 102, 255, 0.1)",
              border: "1px solid rgba(0, 102, 255, 0.2)",
              color: "var(--accent-blue)",
              gap: "8px"
            }}>
              <i className="bi bi-bag-fill fs-5"></i>
              <span className="fw-bold d-none d-sm-inline" style={{ fontSize: "0.85rem" }}>Cart</span>
              <span className="badge bg-primary rounded-pill" style={{
                fontSize: "0.7rem",
                background: "var(--accent-blue) !important",
                padding: "3px 8px"
              }}>
                {totalCartItems}
              </span>
            </div>
          </button>
        </div>

        {/* 3. MOBILE MENU HAMBURGER (Toggles page links only) */}
        <button 
          className="navbar-toggler border-0 order-lg-4 p-1" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation" 
          style={{ color: "var(--text-primary)" }}
        >
          <i className="bi bi-list fs-2"></i>
        </button>

        {/* 4. NAVIGATION LINKS (Collapses on mobile) */}
        <div className="collapse navbar-collapse order-lg-2" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-3">
            <li className="nav-item">
              <a className={`nav-link px-3 py-2 fw-medium ${currentPage === "landing" ? "active text-cyan fw-semibold" : "text-secondary-custom"}`} href="#" onClick={(e) => { e.preventDefault(); navigate("landing"); }} style={{
                color: currentPage === "landing" ? "var(--accent-cyan)" : "var(--text-secondary)",
                transition: "color 0.3s ease"
              }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link px-3 py-2 fw-medium ${currentPage === "products" ? "active text-cyan fw-semibold" : "text-secondary-custom"}`} href="#" onClick={(e) => { e.preventDefault(); navigate("products"); }} style={{
                color: currentPage === "products" ? "var(--accent-cyan)" : "var(--text-secondary)",
                transition: "color 0.3s ease"
              }}>
                Shop
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle px-3 py-2 fw-medium text-secondary-custom" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                color: "var(--text-secondary)"
              }}>
                Categories
              </a>
              <ul className="dropdown-menu dropdown-menu-dark glass-panel p-2 border-1" aria-labelledby="categoriesDropdown" style={{
                background: "var(--surface-solid)",
                borderRadius: "12px",
                border: "1px solid var(--border-color)"
              }}>
                {["Smart Home", "Audio", "Wearables", "Gaming", "Charging", "Computer Accessories", "Lifestyle Tech"].map((cat) => (
                  <li key={cat}>
                    <a className="dropdown-item py-2 px-3 rounded" href="#" onClick={(e) => {
                      e.preventDefault();
                      navigate("products", { category: cat });
                    }} style={{
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      transition: "all 0.2s ease"
                    }}>
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
