import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/common/ProductCard";
import MagneticButton from "../components/common/MagneticButton";
import gsap from "gsap";

export default function CartPage({ navigate }) {
  const { cart, updateCartQuantity, updateCartVariants, removeFromCart, products } = useContext(AppContext);

  // --- States ---
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Shipping estimator states
  const [shippingCountry, setShippingCountry] = useState("US");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingMethod, setShippingMethod] = useState("ground");
  const [shippingEstimated, setShippingEstimated] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState(0);

  // Editing variants states inside cart rows (stores cartId of active row being edited)
  const [editingCartId, setEditingCartId] = useState(null);

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => {
    const activePrice = item.product.onSale ? item.product.salePrice : item.product.price;
    return sum + activePrice * item.quantity;
  }, 0);

  // Dynamic Shipping Calculations
  const calculateShippingFee = () => {
    if (!shippingEstimated && subtotal > 0) {
      // Default initial calculations before zip input
      return subtotal >= 150 ? 0 : 9.99;
    }
    if (subtotal === 0) return 0;

    if (shippingMethod === "express") {
      return 15.00;
    } else {
      // Standard ground
      return subtotal >= 150 ? 0 : 9.99;
    }
  };

  const shippingFee = calculateShippingFee();

  // Coupon Discount Calculations
  const discountVal = appliedCoupon ? subtotal * appliedCoupon.rate : 0;

  // Tax calculations (8%)
  const estimatedTax = (subtotal - discountVal) * 0.08;

  // Grand Total
  const grandTotal = Math.max(0, subtotal - discountVal + shippingFee + estimatedTax);

  // Handle coupon validation
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();

    if (code === "ELECTRA10") {
      setAppliedCoupon({ code: "ELECTRA10", rate: 0.1 });
      setCouponInput("");
      flashSummaryRow();
    } else if (code === "WELCOME20") {
      setAppliedCoupon({ code: "WELCOME20", rate: 0.2 });
      setCouponInput("");
      flashSummaryRow();
    } else {
      setCouponError("Invalid coupon code. Try 'ELECTRA10' or 'WELCOME20'.");
    }
  };

  const flashSummaryRow = () => {
    gsap.fromTo(".summary-discount-row", 
      { backgroundColor: "rgba(40, 167, 69, 0.2)", scale: 0.98 },
      { backgroundColor: "transparent", scale: 1, duration: 0.5, ease: "power2.out" }
    );
  };

  // Handle shipping estimate form
  const handleEstimateShipping = (e) => {
    e.preventDefault();
    if (shippingZip.trim()) {
      setShippingEstimated(true);
      // Simulate checking zip to set rates
      setEstimatedFee(shippingMethod === "express" ? 15.0 : subtotal >= 150 ? 0 : 9.99);
      
      // Flash summary values
      gsap.fromTo(".summary-shipping-row",
        { scale: 0.98, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.4 }
      );
    }
  };

  // Custom Item deletion with GSAP transition
  const handleDeleteItem = (cartId) => {
    const rowEl = document.getElementById(`cart-row-${cartId}`);
    if (rowEl) {
      gsap.to(rowEl, {
        opacity: 0,
        x: -40,
        height: 0,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          removeFromCart(cartId);
        }
      });
    } else {
      removeFromCart(cartId);
    }
  };

  // Accessory Recommendations for cross-selling
  const crossSellAccessories = products.filter(
    (p) => ["Charging", "Mobile Accessories"].includes(p.category) && !cart.some((item) => item.product.id === p.id)
  ).slice(0, 4);

  return (
    <div className="container py-4 text-start" style={{ minHeight: "90vh" }}>
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <span className="badge-tech mb-2">Shopping Cart</span>
          <h2 className="display-5 fw-bold text-gradient">Your Selected Electronics</h2>
        </div>
      </div>

      {cart.length > 0 ? (
        <div className="row g-4">
          {/* LEFT COLUMN: SHOPPING CART LIST (col-lg-8) */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              
              {/* Items Cards */}
              {cart.map((item) => {
                const activePrice = item.product.onSale ? item.product.salePrice : item.product.price;
                const itemTotal = activePrice * item.quantity;

                return (
                  <div 
                    key={item.cartId}
                    id={`cart-row-${item.cartId}`}
                    className="glass-panel p-3 p-md-4 d-flex flex-column flex-md-row align-items-center gap-3 position-relative"
                    style={{ 
                      borderRadius: "20px", 
                      border: "1px solid var(--border-color)",
                      background: "var(--surface-color)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {/* Product Image */}
                    <div className="d-flex align-items-center justify-content-center bg-dark bg-opacity-25 rounded" style={{ width: "80px", height: "80px", minWidth: "80px" }}>
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="img-fluid rounded object-fit-cover h-100 w-100"
                      />
                    </div>

                    {/* Product Specs/Details */}
                    <div className="flex-grow-1 text-center text-md-start">
                      <small className="text-secondary text-uppercase fw-semibold tracking-wider" style={{ fontSize: "0.7rem" }}>
                        {item.product.brand}
                      </small>
                      <h6 className="fw-bold mb-1 text-truncate" style={{ color: "var(--text-primary)", maxWidth: "260px", margin: "0 auto" }}>
                        {item.product.name}
                      </h6>
                      
                      {/* Selected Variants display */}
                      <div className="d-flex align-items-center justify-content-center justify-content-md-start flex-wrap gap-2 mt-1">
                        {Object.entries(item.selectedVariants).map(([key, val]) => (
                          <span key={key} className="badge bg-secondary bg-opacity-20" style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                            {key}: {val}
                          </span>
                        ))}
                        {item.product.variants && (
                          <button 
                            className="btn btn-sm btn-link text-cyan p-0 ms-1 fw-semibold text-decoration-none"
                            onClick={() => setEditingCartId(editingCartId === item.cartId ? null : item.cartId)}
                            style={{ fontSize: "0.7rem", color: "var(--accent-cyan)" }}
                          >
                            {editingCartId === item.cartId ? "[Close]" : "[Change]"}
                          </button>
                        )}
                      </div>

                      {/* Inline Options Editor Panel */}
                      {editingCartId === item.cartId && item.product.variants && (
                        <div className="mt-2 p-2 border border-secondary border-opacity-20 rounded bg-dark bg-opacity-25 text-start">
                          {item.product.variants.map((v) => (
                            <div key={v.name} className="mb-2">
                              <small className="text-secondary d-block mb-1">{v.name}:</small>
                              <div className="d-flex gap-1.5 flex-wrap">
                                {v.options.map((opt) => (
                                  <button
                                    key={opt}
                                    className={`btn btn-sm py-0.5 px-2 rounded-pill ${
                                      item.selectedVariants[v.name] === opt ? "btn-primary bg-primary text-white" : "btn-outline-secondary"
                                    }`}
                                    onClick={() => {
                                      const nextVariants = { ...item.selectedVariants, [v.name]: opt };
                                      updateCartVariants(item.cartId, nextVariants);
                                    }}
                                    style={{ 
                                      fontSize: "0.75rem",
                                      background: item.selectedVariants[v.name] === opt ? "var(--accent-blue)" : "transparent",
                                      border: item.selectedVariants[v.name] === opt ? "none" : "1px solid var(--border-color)",
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
                      )}
                    </div>

                    {/* Price, Quantity, Subtotal, Delete Row actions */}
                    <div className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between justify-content-md-end gap-4 w-100 w-md-auto mt-2 mt-md-0">
                      
                      {/* Price column */}
                      <div className="text-center">
                        <small className="text-secondary d-block d-md-none" style={{ fontSize: "0.75rem" }}>Price</small>
                        <span className="fw-semibold" style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}>
                          ${activePrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity selectors */}
                      <div className="d-flex align-items-center gap-1.5 justify-content-center">
                        <button 
                          className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                          onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                          style={{ width: "26px", height: "26px", color: "var(--text-primary)", borderColor: "var(--border-color)", padding: 0 }}
                        >
                          -
                        </button>
                        <span className="fw-bold px-2 text-center" style={{ color: "var(--text-primary)", minWidth: "24px" }}>
                          {item.quantity}
                        </span>
                        <button 
                          className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                          onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          style={{ width: "26px", height: "26px", color: "var(--text-primary)", borderColor: "var(--border-color)", padding: 0 }}
                        >
                          +
                        </button>
                      </div>

                      {/* Total price column */}
                      <div className="text-end">
                        <small className="text-secondary d-block d-md-none" style={{ fontSize: "0.75rem" }}>Total</small>
                        <span className="fw-bold text-cyan" style={{ color: "var(--accent-cyan)", fontSize: "1rem" }}>
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Action delete row button */}
                      <div>
                        <button 
                          className="btn btn-link text-danger p-1 d-flex align-items-center justify-content-center"
                          onClick={() => handleDeleteItem(item.cartId)}
                          aria-label="Remove item"
                          style={{ transition: "transform 0.2s ease" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Continue shopping row */}
              <div className="pt-2 text-start">
                <button 
                  className="btn btn-premium-outline rounded-pill px-4" 
                  onClick={() => navigate("products")}
                >
                  &larr; Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: UNIFIED SIDEBAR (col-lg-4) */}
          <div className="col-lg-4">
            <div className="glass-panel p-4 d-flex flex-column gap-4" style={{ borderRadius: "24px", border: "1px solid var(--border-color)" }}>
              <h5 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>Order Summary</h5>

              {/* Collapsible Promo & Shipping Tools */}
              <div className="accordion accordion-flush bg-transparent" id="cartSummaryTools" style={{ borderBottom: "1px solid var(--border-color)" }}>
                
                {/* 1. Promo Code Accordion */}
                <div className="accordion-item bg-transparent border-0">
                  <h2 className="accordion-header" id="headingPromo">
                    <button 
                      className="accordion-button collapsed bg-transparent fw-semibold px-0 py-3 border-0 text-secondary" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapsePromo" 
                      aria-expanded="false" 
                      aria-controls="collapsePromo"
                      style={{ fontSize: "0.85rem", boxShadow: "none" }}
                    >
                      <i className="bi bi-tag-fill me-2 text-cyan" style={{ color: "var(--accent-cyan)" }}></i> Have a Promo Code?
                    </button>
                  </h2>
                  <div id="collapsePromo" className="accordion-collapse collapse" aria-labelledby="headingPromo" data-bs-parent="#cartSummaryTools">
                    <div className="accordion-body px-0 pt-1 pb-3">
                      <form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                        <input 
                          type="text" 
                          required
                          className="form-control bg-transparent border-secondary uppercase"
                          placeholder="e.g. ELECTRA10"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          style={{ fontSize: "0.85rem", borderColor: "var(--border-color)" }}
                        />
                        <button className="btn btn-sm btn-primary px-3" type="submit" style={{ background: "var(--accent-blue)", border: "none" }}>
                          Apply
                        </button>
                      </form>
                      {appliedCoupon && (
                        <div className="text-success mt-2 d-flex align-items-center gap-1" style={{ fontSize: "0.8rem" }}>
                          <i className="bi bi-check-circle-fill"></i> Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.rate * 100}% off)
                          <button className="btn btn-link text-danger p-0 ms-auto fw-bold text-decoration-none" onClick={() => setAppliedCoupon(null)} style={{ fontSize: "0.75rem" }}>[Remove]</button>
                        </div>
                      )}
                      {couponError && (
                        <small className="text-danger mt-2 d-block" style={{ fontSize: "0.8rem" }}>{couponError}</small>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Calculate Shipping Accordion */}
                <div className="accordion-item bg-transparent border-0">
                  <h2 className="accordion-header" id="headingShipping">
                    <button 
                      className="accordion-button collapsed bg-transparent fw-semibold px-0 py-3 border-0 text-secondary" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#collapseShipping" 
                      aria-expanded="false" 
                      aria-controls="collapseShipping"
                      style={{ fontSize: "0.85rem", boxShadow: "none" }}
                    >
                      <i className="bi bi-truck me-2 text-cyan" style={{ color: "var(--accent-cyan)" }}></i> Calculate Shipping
                    </button>
                  </h2>
                  <div id="collapseShipping" className="accordion-collapse collapse" aria-labelledby="headingShipping" data-bs-parent="#cartSummaryTools">
                    <div className="accordion-body px-0 pt-1 pb-3">
                      <form onSubmit={handleEstimateShipping} className="d-flex flex-column gap-2">
                        <select 
                          className="form-select bg-transparent border-secondary" 
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                          style={{ fontSize: "0.85rem", background: "var(--surface-solid)", borderColor: "var(--border-color)" }}
                        >
                          <option value="US" style={{ background: "var(--surface-solid)" }}>United States</option>
                          <option value="UK" style={{ background: "var(--surface-solid)" }}>United Kingdom</option>
                          <option value="CA" style={{ background: "var(--surface-solid)" }}>Canada</option>
                        </select>
                        <div className="row g-2">
                          <div className="col-6">
                            <input 
                              type="text" 
                              required
                              placeholder="Zip Code" 
                              className="form-control bg-transparent border-secondary"
                              value={shippingZip}
                              onChange={(e) => setShippingZip(e.target.value)}
                              style={{ fontSize: "0.85rem", borderColor: "var(--border-color)" }}
                            />
                          </div>
                          <div className="col-6">
                            <select
                              className="form-select bg-transparent border-secondary"
                              value={shippingMethod}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              style={{ fontSize: "0.85rem", background: "var(--surface-solid)", borderColor: "var(--border-color)" }}
                            >
                              <option value="ground" style={{ background: "var(--surface-solid)" }}>Ground Service</option>
                              <option value="express" style={{ background: "var(--surface-solid)" }}>Express Air</option>
                            </select>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary w-100 rounded-pill py-1.5 mt-1" type="submit" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)", fontSize: "0.8rem" }}>
                          Get Rates
                        </button>
                        {shippingEstimated && (
                          <small className="text-success text-center d-block mt-1.5" style={{ fontSize: "0.8rem" }}>
                            Rates loaded: <strong>{shippingFee === 0 ? "Free Shipping" : `$${shippingFee.toFixed(2)}`}</strong>
                          </small>
                        )}
                      </form>
                    </div>
                  </div>
                </div>

              </div>

              {/* Checkout breakdown list details */}
              <div className="d-flex flex-column gap-3 border-bottom border-secondary border-opacity-25 pb-3" style={{ fontSize: "0.9rem" }}>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Subtotal</span>
                  <span className="fw-bold" style={{ color: "var(--text-primary)" }}>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="d-flex justify-content-between summary-discount-row text-success">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="fw-bold">-${discountVal.toFixed(2)}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between summary-shipping-row">
                  <span className="text-secondary">Shipping</span>
                  <span className="fw-semibold" style={{ color: "var(--text-primary)" }}>
                    {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Estimated Tax</span>
                  <span className="fw-semibold" style={{ color: "var(--text-primary)" }}>${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="d-flex justify-content-between align-items-baseline pt-1">
                <span className="fw-semibold fs-5" style={{ color: "var(--text-primary)" }}>Total</span>
                <span className="fw-bold display-6 text-cyan" style={{ color: "var(--accent-cyan)", fontSize: "1.8rem" }}>
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout CTAs */}
              <div className="d-flex flex-column gap-2 mt-2">
                <MagneticButton style={{ width: "100%" }} onClick={() => navigate("checkout")}>
                  <button className="btn-premium w-100 py-3">
                    Proceed to Checkout
                  </button>
                </MagneticButton>
                <div className="text-center mt-2">
                  <span className="text-secondary" style={{ fontSize: "0.85rem" }}>
                    <i className="bi bi-shield-lock-fill me-1 text-cyan" style={{ color: "var(--accent-cyan)" }}></i> SSL Secure Checkout
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="glass-panel p-5 text-center my-5" style={{ borderRadius: "24px" }}>
          <i className="bi bi-cart-x display-1 text-secondary mb-3"></i>
          <h3 className="fw-bold">Your Cart is Empty</h3>
          <p className="text-secondary mx-auto mb-4" style={{ maxWidth: "450px" }}>
            Explore our premium categories and find flagship smart tech accessories to add to your workspace catalog.
          </p>
          <button className="btn btn-premium rounded-pill px-5 py-2.5" onClick={() => navigate("products")}>
            Browse Shop Catalog
          </button>
        </div>
      )}

      {/* DYNAMIC ACCESSORIES CROSS-SELL GRID */}
      {crossSellAccessories.length > 0 && (
        <div className="row mt-5 pt-4 text-start">
          <div className="col-12">
            <h3 className="fw-bold mb-4 text-gradient">Recommended Accessories</h3>
            <div className="row g-4">
              {crossSellAccessories.map((product) => (
                <div key={product.id} className="col-xl-3 col-lg-4 col-md-6">
                  <ProductCard product={product} navigate={navigate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
