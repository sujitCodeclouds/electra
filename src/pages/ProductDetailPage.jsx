import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/common/ProductCard";
import MagneticButton from "../components/common/MagneticButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import gsap from "gsap";

export default function ProductDetailPage({ navigate, productId }) {
  const { products, addToCart, wishlist, toggleWishlist } = useContext(AppContext);

  // 1. Retrieve current product detail
  const product = products.find((p) => p.id === productId) || products[0];

  if (!product) {
    return (
      <div className="container py-5 text-center" style={{ paddingTop: "120px" }}>
        <h3>Product Not Found</h3>
        <button className="btn btn-primary rounded-pill mt-3" onClick={() => navigate("products")}>
          Back to Shop
        </button>
      </div>
    );
  }

  // --- States ---
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [videoOpen, setVideoOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Frequently Bought Together states
  const [fbtChecked, setFbtChecked] = useState([true, true]); // checkbox states for 2 bundle accessories
  
  const mainBuyBtnRef = useRef(null);

  // Initialize defaults
  useEffect(() => {
    setSelectedImgIdx(0);
    const initialVariants = {};
    product.variants?.forEach((v) => {
      initialVariants[v.name] = v.options[0];
    });
    setSelectedVariants(initialVariants);
    setFbtChecked([true, true]);
    setQuantity(1);
  }, [productId, product]);

  // Scroll listener for sticky purchase bar
  useEffect(() => {
    const handleScroll = () => {
      const buyBtn = mainBuyBtnRef.current;
      if (!buyBtn) return;
      
      const buyBtnRect = buyBtn.getBoundingClientRect();
      // Show sticky bar once user scrolls past the main buy button
      if (buyBtnRect.bottom < 0) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch accessory items for Frequently Bought Together (FBT)
  const getFbtItems = () => {
    // Lookup related items or take fallbacks from same category
    const relatedIds = product.related || [];
    let items = products.filter((p) => relatedIds.includes(p.id) && p.id !== product.id);
    if (items.length < 2) {
      items = [...items, ...products.filter((p) => p.category === product.category && p.id !== product.id && !items.find(x => x.id === p.id))];
    }
    return items.slice(0, 2);
  };

  const fbtAccessories = getFbtItems();

  // Dynamic FBT calculations (10% discount on bundle)
  const getFbtTotal = () => {
    let sum = product.onSale ? product.salePrice : product.price;
    fbtAccessories.forEach((item, idx) => {
      if (fbtChecked[idx]) {
        sum += item.onSale ? item.salePrice : item.price;
      }
    });
    return sum * 0.9; // 10% discount
  };

  const handleAddFbtBundle = () => {
    // Add main product to cart
    addToCart(product, 1, selectedVariants);
    // Add accessory products to cart
    fbtAccessories.forEach((item, idx) => {
      if (fbtChecked[idx]) {
        // Build initial variants for accessory
        const accVariants = {};
        item.variants?.forEach((v) => {
          accVariants[v.name] = v.options[0];
        });
        addToCart(item, 1, accVariants);
      }
    });

    // Animate navbar cart indicator
    const cartBadge = document.querySelector(".bi-bag-fill")?.parentElement;
    if (cartBadge) {
      gsap.fromTo(cartBadge, { scale: 1 }, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1 });
    }
  };

  // Get related products for slider (same category, excluding current)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const activePrice = product.onSale ? product.salePrice : product.price;
  const isWishlisted = wishlist.includes(product.id);

  // Bounce total price text on checkbox toggle
  const handleFbtCheckChange = (index) => {
    const newChecked = [...fbtChecked];
    newChecked[index] = !newChecked[index];
    setFbtChecked(newChecked);

    // GSAP price bounce text
    gsap.fromTo(".fbt-total-price-text",
      { scale: 0.95 },
      { scale: 1, duration: 0.25, ease: "bounce.out" }
    );
  };

  return (
    <div className="product-detail-page py-4 position-relative">
      
      {/* --- STICKY FLOATING PURCHASE BAR --- */}
      <div 
        className="fixed-top glass-panel px-4 py-2 mx-auto d-flex justify-content-between align-items-center"
        style={{
          zIndex: 1020,
          borderRadius: "0 0 20px 20px",
          borderTop: "none",
          background: "var(--navbar-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          transform: showStickyBar ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="rounded"
              style={{ width: "42px", height: "42px", objectFit: "cover" }}
            />
            <div>
              <h6 className="fw-bold mb-0 text-truncate d-none d-sm-block" style={{ maxWidth: "220px" }}>{product.name}</h6>
              <div className="d-flex align-items-center gap-2">
                <span className="text-cyan fw-bold" style={{ color: "var(--accent-cyan)", fontSize: "0.9rem" }}>
                  ${activePrice.toFixed(2)}
                </span>
                <span className="badge bg-dark bg-opacity-70 text-warning" style={{ fontSize: "0.7rem" }}>
                  ★ {product.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-none d-md-block"
              onClick={() => toggleWishlist(product.id)}
              style={{ color: "var(--text-primary)", borderColor: "var(--border-color)", fontSize: "0.8rem" }}
            >
              <i className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"}`}></i> Wishlist
            </button>
            <button 
              className="btn btn-sm btn-premium rounded-pill px-4 py-2"
              onClick={() => addToCart(product, quantity, selectedVariants)}
              style={{ fontSize: "0.8rem" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Breadcrumb navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb" style={{ fontSize: "0.85rem" }}>
            <li className="breadcrumb-item">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("landing"); }} className="text-secondary">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("products"); }} className="text-secondary">Shop</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("products", { category: product.category }); }} className="text-secondary">{product.category}</a>
            </li>
            <li className="breadcrumb-item active" style={{ color: "var(--text-primary)" }} aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Gallery & Core Info Row */}
        <div className="row g-5 mb-5 text-start">
          {/* Column Left: Gallery Viewer */}
          <div className="col-lg-6">
            <div className="glass-panel p-3 mb-3 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 overflow-hidden" style={{ borderRadius: "24px", height: "400px" }}>
              <img 
                src={product.images[selectedImgIdx]} 
                alt={product.name} 
                className="img-fluid object-fit-cover rounded-3 h-100 w-100 transition-all hover-zoom-lens"
                style={{ 
                  cursor: "crosshair",
                  transition: "transform 0.4s ease"
                }}
                onMouseMove={(e) => {
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;
                  e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                  e.currentTarget.style.transform = "scale(1.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
            
            {/* Thumbnails grid */}
            <div className="row g-2 px-1">
              {product.images.map((img, idx) => (
                <div key={idx} className="col-3">
                  <div 
                    className={`rounded-3 p-1 bg-dark bg-opacity-25 overflow-hidden border ${
                      selectedImgIdx === idx ? "border-cyan" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{ height: "80px", cursor: "pointer", borderColor: selectedImgIdx === idx ? "var(--accent-cyan)" : "transparent" }}
                  >
                    <img src={img} alt="thumbnail" className="w-100 h-100 object-fit-cover rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Right: Details Purchase Control Panel */}
          <div className="col-lg-6 d-flex flex-column justify-content-between">
            <div>
              {/* Badges and tags */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-tech">{product.brand}</span>
                {product.stock > 0 ? (
                  <span 
                    className="rounded-pill border" 
                    style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: 600,
                      padding: "4px 12px",
                      display: "inline-block",
                      color: "#10b981", 
                      backgroundColor: "rgba(16, 185, 129, 0.1)", 
                      borderColor: "rgba(16, 185, 129, 0.2)" 
                    }}
                  >
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span 
                    className="rounded-pill border" 
                    style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: 600,
                      padding: "4px 12px",
                      display: "inline-block",
                      color: "#ef4444", 
                      backgroundColor: "rgba(239, 68, 68, 0.1)", 
                      borderColor: "rgba(239, 68, 68, 0.2)" 
                    }}
                  >
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Title & Review Count */}
              <h1 className="fw-bold mb-2 display-5" style={{ color: "var(--text-primary)" }}>{product.name}</h1>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`bi ${i < Math.floor(product.rating) ? "bi-star-fill" : "bi-star"} me-1`}></i>
                  ))}
                  <span className="fw-bold ms-1" style={{ color: "var(--text-primary)" }}>{product.rating}</span>
                </div>
                <span className="text-secondary" style={{ fontSize: "0.9rem" }}>| {product.reviewCount} Verified Reviews</span>
              </div>

              {/* Price Panel */}
              <div className="glass-panel p-3 mb-4 d-inline-flex align-items-baseline gap-3" style={{ borderRadius: "16px" }}>
                {product.onSale ? (
                  <>
                    <h2 className="fw-bold text-cyan mb-0" style={{ color: "var(--accent-cyan)" }}>
                      ${product.salePrice.toFixed(2)}
                    </h2>
                    <span className="text-decoration-line-through text-secondary fs-5">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="badge bg-danger rounded-pill px-2 py-1 fw-bold" style={{ fontSize: "0.75rem" }}>
                      Save ${Math.round(product.price - product.salePrice)}
                    </span>
                  </>
                ) : (
                  <h2 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>
                    ${product.price.toFixed(2)}
                  </h2>
                )}
              </div>

              <p className="text-secondary mb-4" style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--text-secondary)" }}>
                {product.description}
              </p>

              {/* Interactive Dynamic Variants */}
              {product.variants?.map((v) => (
                <div key={v.name} className="mb-4">
                  <span className="text-secondary text-uppercase fw-semibold mb-2 d-block" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    Choose {v.name}
                  </span>
                  <div className="d-flex flex-wrap gap-2">
                    {v.options.map((opt) => (
                      <button
                        key={opt}
                        className={`btn rounded-pill px-4 py-2 fw-medium ${
                          selectedVariants[v.name] === opt ? "btn-primary bg-primary text-white border-transparent shadow-sm" : "btn-outline-secondary"
                        }`}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [v.name]: opt })}
                        style={{
                          fontSize: "0.85rem",
                          background: selectedVariants[v.name] === opt ? "var(--accent-blue)" : "transparent",
                          border: selectedVariants[v.name] === opt ? "none" : "1px solid var(--border-color)",
                          color: "var(--text-primary)"
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity Select counter */}
              <div className="mb-4">
                <span className="text-secondary text-uppercase fw-semibold mb-2 d-block" style={{ fontSize: "0.75rem" }}>
                  Quantity
                </span>
                <div className="d-flex align-items-center gap-2" style={{ maxWidth: "120px" }}>
                  <button 
                    className="btn btn-outline-secondary rounded-circle px-2 py-1 d-flex align-items-center justify-content-center"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    style={{ width: "32px", height: "32px", color: "var(--text-primary)", borderColor: "var(--border-color)" }}
                  >
                    -
                  </button>
                  <span className="fw-bold flex-grow-1 text-center" style={{ color: "var(--text-primary)" }}>{quantity}</span>
                  <button 
                    className="btn btn-outline-secondary rounded-circle px-2 py-1 d-flex align-items-center justify-content-center"
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    style={{ width: "32px", height: "32px", color: "var(--text-primary)", borderColor: "var(--border-color)" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="d-flex flex-wrap gap-3 pt-3 border-top" style={{ borderColor: "var(--border-color) !important" }}>
              <div ref={mainBuyBtnRef} className="flex-grow-1">
                <MagneticButton style={{ width: "100%" }} onClick={() => addToCart(product, quantity, selectedVariants)}>
                  <button className="btn-premium w-100 py-3 text-center" disabled={product.stock <= 0}>
                    {product.stock > 0 ? "Add to Shopping Cart" : "Out of Stock"}
                  </button>
                </MagneticButton>
              </div>
              <button 
                className="btn btn-premium-outline rounded-circle p-0 d-flex align-items-center justify-content-center"
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: "56px",
                  height: "56px",
                  borderColor: "var(--border-color)",
                  color: isWishlisted ? "#dc3545" : "var(--text-primary)"
                }}
              >
                <i className={`bi ${isWishlisted ? "bi-heart-fill fs-4" : "bi-heart fs-4"}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Video Showcase Card Grid */}
        <div className="row mb-5 text-start">
          <div className="col-12">
            <div 
              className="glass-panel p-5 text-center position-relative overflow-hidden hover-lift"
              onClick={() => setVideoOpen(true)}
              style={{
                borderRadius: "24px",
                backgroundImage: `linear-gradient(to bottom, rgba(11,15,25,0.8), rgba(11,15,25,0.9)), url(${product.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "280px",
                cursor: "pointer",
                border: "1px solid var(--border-color)"
              }}
            >
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-cyan text-white shadow shadow-lg" style={{
                  width: "80px",
                  height: "80px",
                  background: "var(--accent-gradient)",
                  transition: "all 0.3s ease"
                }}>
                  <i className="bi bi-play-fill display-5 ps-1"></i>
                </div>
              </div>
              <div className="position-absolute bottom-4 start-50 translate-middle-x">
                <h5 className="fw-bold mb-1 text-white">Watch {product.name} Video Guide</h5>
                <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>Explore engineering details, Matter connectivity, and options showcases.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal Popup */}
        {videoOpen && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3" style={{
            background: "rgba(0,0,0,0.85)",
            zIndex: 1070,
            backdropFilter: "blur(10px)"
          }} onClick={() => setVideoOpen(false)}>
            <div className="w-100" style={{ maxWidth: "800px" }} onClick={(e) => e.stopPropagation()}>
              <div className="d-flex justify-content-end mb-2">
                <button className="btn btn-close btn-close-white fs-5" onClick={() => setVideoOpen(false)}></button>
              </div>
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-lg border border-secondary">
                {/* Embedded placeholder loop */}
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Product Video Tour"
                  allowFullScreen
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Specification, FAQ, and Review Tabs */}
        <div className="row mb-5 text-start">
          <div className="col-12">
            <div className="glass-panel p-4" style={{ borderRadius: "20px" }}>
              {/* Tab navigation headers */}
              <ul className="nav nav-tabs border-secondary mb-4 gap-2 flex-wrap">
                {[
                  { id: "specs", label: "Technical Specifications" },
                  { id: "reviews", label: `Reviews (${product.reviewCount})` },
                  { id: "faqs", label: "FAQ & Support" },
                  { id: "delivery", label: "Delivery & Returns" }
                ].map((tab) => (
                  <li key={tab.id} className="nav-item">
                    <button
                      className={`nav-link border-0 rounded-pill px-4 py-2 ${
                        activeTab === tab.id ? "active bg-primary text-white bg-opacity-25" : "text-secondary bg-transparent"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        color: activeTab === tab.id ? "var(--accent-cyan) !important" : "var(--text-secondary)",
                        fontSize: "0.9rem"
                      }}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Tab Contents */}
              <div className="tab-content pt-2">
                {/* 1. Specs Tab */}
                {activeTab === "specs" && (
                  <div className="row g-3">
                    {Object.entries(product.specs || {}).map(([key, val]) => (
                      <div key={key} className="col-md-6 border-bottom border-secondary border-opacity-25 pb-2">
                        <span className="text-secondary fw-semibold text-uppercase" style={{ fontSize: "0.75rem" }}>{key}</span>
                        <h6 className="fw-medium mt-1 mb-0" style={{ color: "var(--text-primary)" }}>{val}</h6>
                      </div>
                    ))}
                    <div className="col-12 mt-4">
                      <h6 className="fw-bold mb-2">Key Features:</h6>
                      <ul className="text-secondary d-flex flex-column gap-2 mb-0" style={{ fontSize: "0.95rem" }}>
                        {product.features?.map((f, i) => (
                          <li key={i} className="d-flex align-items-start gap-2">
                            <i className="bi bi-circle-fill text-cyan" style={{ fontSize: "0.5rem", marginTop: "0.5rem", color: "var(--accent-cyan)" }}></i>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2. Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="d-flex flex-column gap-4">
                    {[
                      { name: "Alex K.", rating: 5, date: "July 2, 2026", comment: "Outstanding piece of engineering. Setup was instantly detected by my hub. Materials feel incredibly solid and premium. Battery exceeds the advertised bounds.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" },
                      { name: "Sarah M.", rating: 4, date: "June 28, 2026", comment: "Excellent performance and looks fantastic on my desk. Dynamic displays are crisp. Knocking off one star because shipping took 4 days instead of 2.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" }
                    ].map((r, idx) => (
                      <div key={idx} className="pb-3 border-bottom border-secondary border-opacity-25 d-flex gap-3">
                        <img src={r.avatar} alt={r.name} className="rounded-circle" style={{ width: "42px", height: "42px", objectFit: "cover" }} />
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <h6 className="fw-semibold mb-0" style={{ fontSize: "0.95rem" }}>{r.name}</h6>
                            <small className="text-secondary" style={{ fontSize: "0.75rem" }}>{r.date}</small>
                          </div>
                          <div className="text-warning mb-2" style={{ fontSize: "0.8rem" }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i key={i} className={`bi ${i < r.rating ? "bi-star-fill" : "bi-star"} me-0.5`}></i>
                            ))}
                          </div>
                          <p className="text-secondary mb-0" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>"{r.comment}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. FAQs Tab */}
                {activeTab === "faqs" && (
                  <div className="accordion accordion-flush" id="faqAccordion">
                    {[
                      { q: "Is this compatible with the Matter 1.3 standard?", a: "Yes, this product is certified Matter over Thread. It works out of the box with Apple HomeKit, Amazon Alexa, Google Assistant, and Samsung SmartThings." },
                      { q: "What is the return policy?", a: "We offer a 30-day money-back guarantee with free prepaid return shipping labels included inside your account orders dashboard." },
                      { q: "How long does a full charge take?", a: "Using a standard 20W or higher power delivery charger, it reaches 80% capacity in approximately 35 minutes, and 100% in 1.5 hours." }
                    ].map((faq, idx) => (
                      <div key={idx} className="accordion-item bg-transparent border-secondary border-opacity-25 py-2" style={{ color: "var(--text-primary)" }}>
                        <h2 className="accordion-header" id={`heading-${idx}`}>
                          <button 
                            className="accordion-button collapsed bg-transparent fw-semibold px-0 py-2 border-0" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={`#collapse-${idx}`} 
                            aria-expanded="false" 
                            aria-controls={`collapse-${idx}`}
                            style={{ color: "var(--text-primary)", boxShadow: "none" }}
                          >
                            {faq.q}
                          </button>
                        </h2>
                        <div id={`collapse-${idx}`} className="accordion-collapse collapse" aria-labelledby={`heading-${idx}`} data-bs-parent="#faqAccordion">
                          <div className="accordion-body px-0 text-secondary" style={{ fontSize: "0.9rem" }}>
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Delivery & Returns Tab */}
                {activeTab === "delivery" && (
                  <div className="row g-4 text-start">
                    <div className="col-md-6">
                      <h6 className="fw-semibold text-cyan mb-2" style={{ color: "var(--accent-cyan)" }}>Shipping Options</h6>
                      <ul className="text-secondary d-flex flex-column gap-2 list-unstyled" style={{ fontSize: "0.9rem" }}>
                        <li><strong>Standard Ground:</strong> Free on all orders, delivers in 3-5 business days.</li>
                        <li><strong>Express Priority:</strong> $15 (Free on orders above $150), delivers in 1-2 business days.</li>
                        <li><strong>Next-Day Delivery:</strong> $29 flat, order before 2 PM for next-day arrival.</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-semibold text-cyan mb-2" style={{ color: "var(--accent-cyan)" }}>Return Policy</h6>
                      <p className="text-secondary mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                        We design our products to exceed expectations. If you are not satisfied, returns are accepted within 30 days of shipment receipt. Contact support to get a prepaid label. Restocking fees do not apply.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- FREQUENTLY BOUGHT TOGETHER (FBT) BUNDLE BOX --- */}
        <div className="row mb-5 text-start">
          <div className="col-12">
            <div className="glass-panel p-4 p-md-5" style={{ borderRadius: "24px", border: "1px solid rgba(0, 102, 255, 0.25)" }}>
              <div className="mb-4">
                <span className="badge-tech mb-2">Bundle & Save 10%</span>
                <h3 className="fw-bold text-white mb-1">Frequently Bought Together</h3>
                <p className="text-secondary mb-0" style={{ fontSize: "0.9rem" }}>Add complementary tech accessories directly to your cart at a special discount bundle.</p>
              </div>

              {/* FBT Items Checklist Layout Row */}
              <div className="row g-4 align-items-center">
                {/* Items listings col */}
                <div className="col-lg-8">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    
                    {/* Item 1: Main Product */}
                    <div className="d-flex align-items-center gap-3 p-2 bg-dark bg-opacity-20 rounded-3 flex-grow-1 w-100">
                      <img src={product.images[0]} alt={product.name} className="rounded" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                      <div>
                        <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "160px", color: "var(--text-primary)" }}>{product.name}</h6>
                        <small className="text-cyan fw-bold" style={{ color: "var(--accent-cyan)" }}>${activePrice.toFixed(2)}</small>
                      </div>
                    </div>

                    <div className="text-secondary fw-bold fs-4 d-none d-md-block">+</div>

                    {/* Accessories */}
                    {fbtAccessories.map((acc, idx) => (
                      <React.Fragment key={acc.id}>
                        <div className="d-flex align-items-center gap-3 p-2 bg-dark bg-opacity-20 rounded-3 flex-grow-1 w-100 position-relative">
                          <input 
                            type="checkbox" 
                            className="form-check-input bg-transparent border-secondary position-absolute top-2 start-2"
                            checked={fbtChecked[idx]}
                            onChange={() => handleFbtCheckChange(idx)}
                          />
                          <img src={acc.images[0]} alt={acc.name} className="rounded ms-3" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                          <div>
                            <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "140px", color: "var(--text-primary)" }}>{acc.name}</h6>
                            <small className="text-secondary">${(acc.onSale ? acc.salePrice : acc.price).toFixed(2)}</small>
                          </div>
                        </div>
                        {idx === 0 && fbtAccessories.length > 1 && (
                          <div className="text-secondary fw-bold fs-4 d-none d-md-block">+</div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Bundle Buy CTA panel */}
                <div className="col-lg-4 text-center text-lg-end">
                  <div className="glass-panel p-3 d-inline-block text-start w-100" style={{ borderRadius: "16px", maxWidth: "300px" }}>
                    <span className="text-secondary" style={{ fontSize: "0.8rem" }}>Bundle Total (10% Off):</span>
                    <h4 className="fw-bold text-cyan fbt-total-price-text mt-1 mb-3" style={{ color: "var(--accent-cyan)" }}>
                      ${getFbtTotal().toFixed(2)}
                    </h4>
                    <button 
                      className="btn btn-premium w-100 py-2.5"
                      onClick={handleAddFbtBundle}
                    >
                      Buy Bundle Deal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SLIDER */}
        {relatedProducts.length > 0 && (
          <div className="row mb-5 text-start">
            <div className="col-12">
              <h3 className="fw-bold mb-4 text-gradient">Related Electronics</h3>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 4 }
                }}
                className="py-2"
              >
                {relatedProducts.map((p) => (
                  <SwiperSlide key={p.id}>
                    <ProductCard product={p} navigate={navigate} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
