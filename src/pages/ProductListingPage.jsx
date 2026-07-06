import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/common/ProductCard";
import gsap from "gsap";

export default function ProductListingPage({ navigate, category, search, filterWishlist }) {
  const { products, wishlist, addToCart } = useContext(AppContext);

  // --- State Variables ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(700);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("featured");
  
  // Modals / Overlays state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedQVVariant, setSelectedQVVariant] = useState({});

  const gridRef = useRef(null);

  // Sync initial navigation inputs
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }

    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }
  }, [category, search]);

  // Extract unique brands in current category for filter checklist
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));

  // --- Filtering Logic ---
  const getFilteredProducts = () => {
    return products.filter((p) => {
      // 1. Category filter
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      
      // 2. Wishlist only filter (passed from navbar)
      if (filterWishlist && !wishlist.includes(p.id)) return false;

      // 3. Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

      // 4. Price filter
      const activePrice = p.onSale ? p.salePrice : p.price;
      if (activePrice > priceRange) return false;

      // 5. Rating filter
      if (p.rating < minRating) return false;

      // 6. Stock filter
      if (onlyInStock && p.stock <= 0) return false;

      // 7. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.onSale ? a.salePrice : a.price;
      const priceB = b.onSale ? b.salePrice : b.price;

      switch (sortType) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "rating":
          return b.rating - a.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0; // Featured (natural JSON order)
      }
    });
  };

  const filteredProducts = getFilteredProducts();

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrands([]);
    setPriceRange(700);
    setMinRating(0);
    setOnlyInStock(false);
    setSearchQuery("");
    setSortType("featured");
  };

  // --- Animations ---
  useEffect(() => {
    // Staggered reveal of products when list updates
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".plp-grid-card");
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" }
        );
      }
    }
  }, [selectedCategory, selectedBrands, priceRange, minRating, onlyInStock, searchQuery, sortType, filterWishlist]);

  // Handle Quick View Modal launch
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    // Initialize default variants
    const initialVariants = {};
    product.variants?.forEach((v) => {
      initialVariants[v.name] = v.options[0];
    });
    setSelectedQVVariant(initialVariants);

    // GSAP Modal reveal animation
    setTimeout(() => {
      const modalBox = document.querySelector(".qv-modal-box");
      if (modalBox) {
        gsap.fromTo(modalBox, 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }
        );
      }
    }, 50);
  };

  const handleAddToCartQV = () => {
    if (!quickViewProduct) return;
    addToCart(quickViewProduct, 1, selectedQVVariant);
    setQuickViewProduct(null);

    // Animate navbar cart badge flash
    const cartBadge = document.querySelector(".bi-bag-fill")?.parentElement;
    if (cartBadge) {
      gsap.fromTo(cartBadge, 
        { scale: 1 }, 
        { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <div className="container py-4 position-relative" style={{ minHeight: "90vh" }}>
      {/* Search Header Banner */}
      <div className="row mb-4">
        <div className="col-12 text-start">
          <span className="badge-tech mb-2">Electra Catalog</span>
          <h2 className="display-5 fw-bold text-gradient">
            {filterWishlist ? "Your Curated Wishlist" : selectedCategory === "All" ? "All Premium Products" : selectedCategory}
          </h2>
          <p className="text-secondary mb-3">
            Showing {filteredProducts.length} premium tech items matching your selected criteria.
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="row g-4">
        {/* 1. FILTER SIDEBAR (col-lg-3) */}
        <div className="col-lg-3">
          <div className="glass-panel p-4 sticky-lg-top" style={{ top: "110px", zIndex: 10 }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Filters</h5>
              <button 
                className="btn btn-sm btn-link text-decoration-none text-cyan p-0" 
                onClick={resetFilters}
                style={{ fontSize: "0.85rem", color: "var(--accent-cyan)" }}
              >
                Reset All
              </button>
            </div>

            {/* Category selection */}
            <div className="mb-4">
              <label className="fw-semibold text-uppercase tracking-wider text-secondary mb-2 d-block" style={{ fontSize: "0.75rem" }}>
                Category
              </label>
              <div className="d-flex flex-column gap-2">
                {["All", "Smart Home", "Audio", "Wearables", "Gaming", "Charging", "Computer Accessories", "Lifestyle Tech"].map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm text-start py-1.5 px-2.5 rounded-3 d-flex justify-content-between align-items-center ${
                      selectedCategory === cat ? "bg-primary bg-opacity-20 text-cyan border-cyan fw-medium" : "bg-transparent text-secondary border-transparent"
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (filterWishlist) navigate("products"); // break wishlist lock if clicking cats
                    }}
                    style={{ 
                      fontSize: "0.85rem", 
                      border: "1px solid transparent",
                      color: selectedCategory === cat ? "var(--accent-cyan)" : "var(--text-secondary)"
                    }}
                  >
                    <span>{cat}</span>
                    <span className="badge bg-secondary bg-opacity-25 text-white" style={{ fontSize: "0.7rem" }}>
                      {products.filter((p) => cat === "All" || p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="fw-semibold text-uppercase tracking-wider text-secondary mb-0" style={{ fontSize: "0.75rem" }}>
                  Max Price
                </label>
                <span className="fw-bold text-cyan" style={{ fontSize: "0.85rem", color: "var(--accent-cyan)" }}>
                  ${priceRange}
                </span>
              </div>
              <input
                type="range"
                className="form-range"
                min="10"
                max="700"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="d-flex justify-content-between text-secondary" style={{ fontSize: "0.75rem" }}>
                <span>$10</span>
                <span>$700</span>
              </div>
            </div>

            {/* Brands Checkbox */}
            <div className="mb-4">
              <label className="fw-semibold text-uppercase tracking-wider text-secondary mb-2 d-block" style={{ fontSize: "0.75rem" }}>
                Brands
              </label>
              <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: "150px" }}>
                {allBrands.map((brand) => (
                  <div key={brand} className="form-check text-start">
                    <input
                      type="checkbox"
                      className="form-check-input bg-transparent border-secondary"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                        }
                      }}
                    />
                    <label className="form-check-label text-secondary" htmlFor={`brand-${brand}`} style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Ratings Filter */}
            <div className="mb-4">
              <label className="fw-semibold text-uppercase tracking-wider text-secondary mb-2 d-block" style={{ fontSize: "0.75rem" }}>
                Min Rating
              </label>
              <div className="d-flex flex-column gap-1.5">
                {[4.5, 4.0, 3.0].map((stars) => (
                  <button
                    key={stars}
                    className={`btn btn-sm text-start py-1 px-2.5 rounded-3 d-flex align-items-center gap-2 ${
                      minRating === stars ? "bg-primary bg-opacity-20 text-cyan" : "bg-transparent text-secondary"
                    }`}
                    onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                    style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
                  >
                    <i className="bi bi-star-fill text-warning"></i>
                    <span>{stars}+ Stars</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Switch */}
            <div className="form-check form-switch text-start">
              <input
                className="form-check-input border-secondary bg-transparent"
                type="checkbox"
                role="switch"
                id="inStockOnly"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <label className="form-check-label text-secondary" htmlFor="inStockOnly" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT GRID SECTION (col-lg-9) */}
        <div className="col-lg-9">
          {/* Top Bar Sort and Search */}
          <div className="glass-panel p-3 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            {/* Real-time search filter */}
            <div className="input-group" style={{ maxWidth: "320px" }}>
              <span className="input-group-text bg-transparent border-secondary text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-secondary text-white"
                placeholder="Search matching results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            {/* Sort Selection */}
            <div className="d-flex align-items-center gap-2">
              <span className="text-secondary text-nowrap" style={{ fontSize: "0.85rem" }}>Sort By:</span>
              <select
                className="form-select bg-transparent border-secondary text-white rounded-pill px-3 py-1.5"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                style={{ 
                  fontSize: "0.85rem",
                  background: "var(--surface-solid)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)"
                }}
              >
                <option value="featured" style={{ background: "var(--surface-solid)" }}>Featured</option>
                <option value="price-asc" style={{ background: "var(--surface-solid)" }}>Price: Low to High</option>
                <option value="price-desc" style={{ background: "var(--surface-solid)" }}>Price: High to Low</option>
                <option value="rating" style={{ background: "var(--surface-solid)" }}>Top Rated</option>
                <option value="name-asc" style={{ background: "var(--surface-solid)" }}>Product Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Grid list container */}
          {filteredProducts.length > 0 ? (
            <div ref={gridRef} className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-xl-4 col-md-6 plp-grid-card">
                  <ProductCard product={product} navigate={navigate} onQuickView={openQuickView} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-5 text-center my-5">
              <i className="bi bi-inboxes display-3 text-secondary mb-3"></i>
              <h3>No products found</h3>
              <p className="text-secondary mb-4">We couldn't find matches for your search. Try resetting some filters.</p>
              <button className="btn btn-outline-light rounded-pill px-4" onClick={resetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>



      {/* --- QUICK VIEW DETAILS MODAL --- */}
      {quickViewProduct && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3" style={{
          background: "rgba(0,0,0,0.7)",
          zIndex: 1050,
          backdropFilter: "blur(5px)"
        }} onClick={() => setQuickViewProduct(null)}>
          <div 
            className="qv-modal-box glass-panel p-4 p-md-5 w-100" 
            style={{
              maxWidth: "800px",
              borderRadius: "24px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-color)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small className="badge-tech mb-2 d-inline-block">{quickViewProduct.brand}</small>
                <h3 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>{quickViewProduct.name}</h3>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning"><i className="bi bi-star-fill"></i> {quickViewProduct.rating}</span>
                  <span className="text-secondary" style={{ fontSize: "0.85rem" }}>({quickViewProduct.reviewCount} Reviews)</span>
                </div>
              </div>
              <button 
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" 
                onClick={() => setQuickViewProduct(null)}
                style={{ width: "32px", height: "32px", padding: 0, color: "var(--text-primary)", borderColor: "var(--border-color)" }}
                aria-label="Close dialog"
              >
                <i className="bi bi-x-lg" style={{ fontSize: "0.85rem" }}></i>
              </button>
            </div>

            <div className="row g-4 mt-1">
              {/* Product Gallery (left) */}
              <div className="col-md-5 text-center">
                <div className="rounded-3 bg-dark bg-opacity-25 p-3 d-flex align-items-center justify-content-center" style={{ height: "240px" }}>
                  <img 
                    src={quickViewProduct.images[0]} 
                    alt={quickViewProduct.name} 
                    className="img-fluid rounded object-fit-cover h-100"
                  />
                </div>
              </div>

              {/* Product Details Actions (right) */}
              <div className="col-md-7 text-start d-flex flex-column justify-content-between">
                <div>
                  {/* Prices */}
                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    {quickViewProduct.onSale ? (
                      <>
                        <h4 className="fw-bold text-cyan mb-0" style={{ color: "var(--accent-cyan)" }}>
                          ${quickViewProduct.salePrice.toFixed(2)}
                        </h4>
                        <span className="text-decoration-line-through text-secondary">
                          ${quickViewProduct.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <h4 className="fw-bold mb-0 text-white">
                        ${quickViewProduct.price.toFixed(2)}
                      </h4>
                    )}
                  </div>

                  <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                    {quickViewProduct.description}
                  </p>

                  {/* Dynamic Variants Selectors */}
                  {quickViewProduct.variants?.map((v) => (
                    <div key={v.name} className="mb-3">
                      <span className="text-secondary text-uppercase fw-semibold mb-1 d-block" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                        Select {v.name}
                      </span>
                      <div className="d-flex gap-2">
                        {v.options.map((opt) => (
                          <button
                            key={opt}
                            className={`btn btn-sm rounded-pill px-3 py-1.5 ${
                              selectedQVVariant[v.name] === opt ? "btn-primary bg-primary text-white border-transparent" : "btn-outline-secondary"
                            }`}
                            onClick={() => setSelectedQVVariant({ ...selectedQVVariant, [v.name]: opt })}
                            style={{ 
                              fontSize: "0.8rem",
                              background: selectedQVVariant[v.name] === opt ? "var(--accent-blue)" : "transparent",
                              border: selectedQVVariant[v.name] === opt ? "none" : "1px solid var(--border-color)",
                              color: "var(--text-primary)"
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-top d-flex align-items-center gap-3" style={{ borderColor: "var(--border-color) !important" }}>
                  <button 
                    className="btn btn-premium flex-grow-1 py-2.5"
                    onClick={handleAddToCartQV}
                    disabled={quickViewProduct.stock <= 0}
                  >
                    {quickViewProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button 
                    className="btn btn-premium-outline py-2.5" 
                    onClick={() => {
                      setQuickViewProduct(null);
                      navigate("product-detail", { productId: quickViewProduct.id });
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary py-2.5 px-3 rounded-pill"
                    onClick={() => setQuickViewProduct(null)}
                    style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
