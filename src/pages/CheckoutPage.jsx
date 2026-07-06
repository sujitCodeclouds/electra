import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import MagneticButton from "../components/common/MagneticButton";
import gsap from "gsap";

export default function CheckoutPage({ navigate }) {
  const { cart, clearCart } = useContext(AppContext);

  // --- Summary Calculations ---
  const subtotal = cart.reduce((sum, item) => {
    const activePrice = item.product.onSale ? item.product.salePrice : item.product.price;
    return sum + activePrice * item.quantity;
  }, 0);

  // --- States ---
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [shippingMethod, setShippingMethod] = useState("ground");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  
  // Billing Address States (if separate)
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingZip, setBillingZip] = useState("");

  // Payment card states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  // Form validations state
  const [validated, setValidated] = useState(false);

  const shippingFee = shippingMethod === "express" ? 15.00 : subtotal >= 150 ? 0 : 9.99;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shippingFee + estimatedTax;

  // Formatting Card Number: "XXXX XXXX XXXX XXXX"
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  // Formatting Expiration Date: "MM/YY"
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  // Formatting CVV: 3 or 4 digits
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCardCvv(value);
  };

  // Triggering Card Flip Animation on CVV focus
  const triggerCardFlip = (flip) => {
    setIsCardFlipped(flip);
    const cardEl = document.querySelector(".payment-card-visual");
    if (cardEl) {
      gsap.to(cardEl, {
        rotationY: flip ? 180 : 0,
        duration: 0.6,
        ease: "back.out(1.2)"
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    // Simple validations checks
    if (!email || !fullName || !address || !city || !zip || !cardName || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
      // Flash form elements to indicate verification errors
      gsap.fromTo(".checkout-form-container", 
        { x: -10 },
        { x: 0, duration: 0.1, repeat: 3, yoyo: true, ease: "power1.inOut" }
      );
      return;
    }

    // Set submit processing states
    setPayLoading(true);

    // Dynamic processing animation
    const payBtn = document.querySelector(".btn-pay-action");
    if (payBtn) {
      gsap.to(payBtn, { scale: 0.98, opacity: 0.8, duration: 0.2 });
    }

    setTimeout(() => {
      // Simulate Order Placement Success
      const orderId = `EL-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDetails = {
        orderId,
        fullName,
        email,
        address: `${address}, ${city}, ${zip}`,
        grandTotal,
        itemsCount: cart.length,
        items: cart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.onSale ? item.product.salePrice : item.product.price,
          image: item.product.images[0]
        }))
      };

      // Wipe Cart from context
      clearCart();
      // Navigate to order confirmation
      navigate("confirmation", { orderDetails });
    }, 2000);
  };

  return (
    <div className="container py-4 text-start" style={{ minHeight: "90vh" }}>
      
      {/* 1. PROGRESS STEPS TIMELINE INDICATOR */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8">
          <div className="glass-panel py-3 px-4 d-flex justify-content-between align-items-center" style={{ borderRadius: "20px" }}>
            <div className="d-flex align-items-center gap-2 text-cyan fw-bold" style={{ color: "var(--accent-cyan)", fontSize: "0.85rem" }}>
              <span className="rounded-circle bg-cyan text-dark d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px", fontSize: "0.75rem", background: "var(--accent-cyan)" }}>
                ✓
              </span>
              <span>Cart</span>
            </div>
            <div className="flex-grow-1 border-top border-secondary border-opacity-50 mx-3"></div>
            <div className="d-flex align-items-center gap-2 fw-bold" style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
              <span className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px", fontSize: "0.75rem", background: "var(--accent-blue)" }}>
                2
              </span>
              <span>Checkout Details</span>
            </div>
            <div className="flex-grow-1 border-top border-secondary border-opacity-25 mx-3"></div>
            <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: "0.85rem" }}>
              <span className="rounded-circle bg-secondary bg-opacity-20 text-secondary-custom d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px", fontSize: "0.75rem" }}>
                3
              </span>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 checkout-form-container">
        {/* LEFT COLUMN: CONTACT, SHIPPING, PAYMENT (col-lg-8) */}
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} noValidate>
            
            {/* SECTION 1: CONTACT INFO */}
            <div className="glass-panel p-4 mb-4" style={{ borderRadius: "24px" }}>
              <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}><i className="bi bi-person-bounding-box text-cyan me-2" style={{ color: "var(--accent-cyan)" }}></i> Contact Information</h5>
              <div className="mb-0">
                <label htmlFor="contactEmail" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  className={`form-control bg-transparent border-secondary ${validated && !email ? "is-invalid" : ""}`}
                  id="contactEmail" 
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="invalid-feedback">Please enter a valid email address.</div>
              </div>
            </div>

            {/* SECTION 2: SHIPPING ADDRESS */}
            <div className="glass-panel p-4 mb-4" style={{ borderRadius: "24px" }}>
              <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}><i className="bi bi-truck text-cyan me-2" style={{ color: "var(--accent-cyan)" }}></i> Shipping Address</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="shippingName" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    className={`form-control bg-transparent border-secondary ${validated && !fullName ? "is-invalid" : ""}`}
                    id="shippingName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <div className="invalid-feedback">Recipient name is required.</div>
                </div>

                <div className="col-md-8 col-12">
                  <label htmlFor="shippingAddr" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Street Address</label>
                  <input 
                    type="text" 
                    required
                    className={`form-control bg-transparent border-secondary ${validated && !address ? "is-invalid" : ""}`}
                    id="shippingAddr"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="invalid-feedback">Street address is required.</div>
                </div>

                <div className="col-md-4 col-6">
                  <label htmlFor="shippingCity" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>City</label>
                  <input 
                    type="text" 
                    required
                    className={`form-control bg-transparent border-secondary ${validated && !city ? "is-invalid" : ""}`}
                    id="shippingCity"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <div className="invalid-feedback">City is required.</div>
                </div>

                <div className="col-md-4 col-6">
                  <label htmlFor="shippingZip" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Zip Code</label>
                  <input 
                    type="text" 
                    required
                    className={`form-control bg-transparent border-secondary ${validated && !zip ? "is-invalid" : ""}`}
                    id="shippingZip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <div className="invalid-feedback">Zip code is required.</div>
                </div>

                {/* Delivery Options */}
                <div className="col-md-8 col-12">
                  <label htmlFor="shippingMethods" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Delivery Service</label>
                  <select 
                    id="shippingMethods"
                    className="form-select bg-transparent border-secondary"
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    style={{ background: "var(--surface-solid)" }}
                  >
                    <option value="ground" style={{ background: "var(--surface-solid)" }}>Standard Ground (3-5 days) — {subtotal >= 150 ? "FREE" : "$9.99"}</option>
                    <option value="express" style={{ background: "var(--surface-solid)" }}>Express Air Delivery (1-2 days) — $15.00</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: BILLING ADDRESS */}
            <div className="glass-panel p-4 mb-4" style={{ borderRadius: "24px" }}>
              <div className="form-check form-switch text-start">
                <input 
                  className="form-check-input border-secondary bg-transparent" 
                  type="checkbox" 
                  role="switch" 
                  id="billingSameCheck" 
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                />
                <label className="form-check-label fw-bold" style={{ color: "var(--text-primary)" }} htmlFor="billingSameCheck">
                  Billing address same as shipping address
                </label>
              </div>

              {!sameAsShipping && (
                <div className="row g-3 mt-3 pt-3 border-top border-secondary border-opacity-10">
                  <div className="col-12">
                    <label htmlFor="billingName" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Billing Name</label>
                    <input 
                      type="text" 
                      required={!sameAsShipping}
                      className="form-control bg-transparent border-secondary"
                      id="billingName"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="billingAddr" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Billing Street</label>
                    <input 
                      type="text" 
                      required={!sameAsShipping}
                      className="form-control bg-transparent border-secondary"
                      id="billingAddr"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 col-6">
                    <label htmlFor="billingCity" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>City</label>
                    <input 
                      type="text" 
                      required={!sameAsShipping}
                      className="form-control bg-transparent border-secondary"
                      id="billingCity"
                      value={billingCity}
                      onChange={(e) => setBillingCity(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-6">
                    <label htmlFor="billingZip" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Billing Zip</label>
                    <input 
                      type="text" 
                      required={!sameAsShipping}
                      className="form-control bg-transparent border-secondary"
                      id="billingZip"
                      value={billingZip}
                      onChange={(e) => setBillingZip(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 4: PAYMENT INFORMATION */}
            <div className="glass-panel p-4 mb-4" style={{ borderRadius: "24px" }}>
              <h5 className="fw-bold mb-4" style={{ color: "var(--text-primary)" }}><i className="bi bi-credit-card text-cyan me-2" style={{ color: "var(--accent-cyan)" }}></i> Secure Payment</h5>
              
              <div className="row g-4">
                {/* 3D Mock Credit Card Graphic Representation */}
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <div className="payment-card-visual position-relative text-white" style={{
                    width: "260px",
                    height: "160px",
                    background: "linear-gradient(135deg, #0b0f19 0%, #0066ff 60%, #a855f7 100%)",
                    borderRadius: "16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}>
                    {/* Front side of card representation */}
                    {!isCardFlipped ? (
                      <div className="p-3 w-100 h-100 d-flex flex-column justify-content-between text-start">
                        <div className="d-flex justify-content-between align-items-center">
                          <i className="bi bi-cpu fs-3 text-warning"></i>
                          <span className="fw-bold tracking-widest text-white-50" style={{ fontSize: "0.8rem" }}>CREDIT</span>
                        </div>
                        <h6 className="fw-medium tracking-widest my-2 fs-5 text-white">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center text-uppercase" style={{ fontSize: "0.75rem" }}>
                          <div>
                            <span className="text-secondary d-block" style={{ fontSize: "0.6rem" }}>Card Holder</span>
                            <span className="text-truncate d-block" style={{ maxWidth: "120px" }}>{cardName || "NAME SURNAME"}</span>
                          </div>
                          <div>
                            <span className="text-secondary d-block" style={{ fontSize: "0.6rem" }}>Expiry</span>
                            <span>{cardExpiry || "MM/YY"}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Back side of card representation (rotated 180 degrees) */
                      <div className="w-100 h-100 d-flex flex-column justify-content-between py-3 text-start" style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden"
                      }}>
                        <div className="bg-dark w-100" style={{ height: "30px" }}></div>
                        <div className="px-3 my-2">
                          <span className="text-secondary d-block" style={{ fontSize: "0.6rem" }}>Signature / CVV</span>
                          <div className="bg-light text-dark fw-bold px-2 py-1 text-end rounded" style={{ fontStyle: "italic", fontSize: "0.85rem" }}>
                            {cardCvv || "•••"}
                          </div>
                        </div>
                        <div className="px-3 d-flex justify-content-end align-items-center text-secondary" style={{ fontSize: "0.65rem" }}>
                          <span>ELECTRA SECURE SYSTEM</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Secure inputs */}
                <div className="col-md-7 text-start">
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="cardName" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Cardholder Name</label>
                      <input 
                        type="text" 
                        required
                        className={`form-control bg-transparent border-secondary ${validated && !cardName ? "is-invalid" : ""}`}
                        id="cardName" 
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      />
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="cardNum" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Card Number</label>
                      <input 
                        type="text" 
                        required
                        className={`form-control bg-transparent border-secondary ${validated && cardNumber.length < 19 ? "is-invalid" : ""}`}
                        id="cardNum" 
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                      <div className="invalid-feedback">Please enter a valid 16-digit card number.</div>
                    </div>

                    <div className="col-6">
                      <label htmlFor="cardExp" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Expiration Date</label>
                      <input 
                        type="text" 
                        required
                        className={`form-control bg-transparent border-secondary ${validated && cardExpiry.length < 5 ? "is-invalid" : ""}`}
                        id="cardExp" 
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                      />
                    </div>

                    <div className="col-6">
                      <label htmlFor="cardCvv" className="form-label text-secondary" style={{ fontSize: "0.85rem" }}>Security Code (CVV)</label>
                      <input 
                        type="password" 
                        required
                        className={`form-control bg-transparent border-secondary ${validated && cardCvv.length < 3 ? "is-invalid" : ""}`}
                        id="cardCvv" 
                        placeholder="•••"
                        value={cardCvv}
                        onChange={handleCvvChange}
                        onFocus={() => triggerCardFlip(true)}
                        onBlur={() => triggerCardFlip(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit checkout triggers */}
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY & CTA (col-lg-4) */}
        <div className="col-lg-4">
          <div className="glass-panel p-4 mb-4 sticky-lg-top" style={{ top: "110px", zIndex: 10 }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text-primary)" }}>Order Details</h5>
            
            {/* Products summary row list */}
            <div className="d-flex flex-column gap-3 mb-4 overflow-auto border-bottom border-secondary border-opacity-25 pb-3" style={{ maxHeight: "200px" }}>
              {cart.map((item) => {
                const activePrice = item.product.onSale ? item.product.salePrice : item.product.price;
                return (
                  <div key={item.cartId} className="d-flex align-items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="rounded object-fit-cover bg-dark bg-opacity-25"
                      style={{ width: "42px", height: "42px" }}
                    />
                    <div className="flex-grow-1 text-truncate" style={{ fontSize: "0.85rem" }}>
                      <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "160px", color: "var(--text-primary)" }}>{item.product.name}</h6>
                      <small className="text-secondary">{item.quantity}x @ ${activePrice.toFixed(2)}</small>
                    </div>
                    <span className="fw-bold" style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                      ${(activePrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations summaries */}
            <div className="d-flex flex-column gap-3 border-bottom border-secondary border-opacity-25 pb-3 mb-4" style={{ fontSize: "0.85rem" }}>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Subtotal</span>
                <span className="fw-bold" style={{ color: "var(--text-primary)" }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
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
            <div className="d-flex justify-content-between align-items-baseline mb-4">
              <span className="fw-semibold fs-5" style={{ color: "var(--text-primary)" }}>Total</span>
              <span className="fw-bold display-6 text-cyan" style={{ color: "var(--accent-cyan)" }}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout completes CTA */}
            <div className="d-flex flex-column gap-3">
              <MagneticButton style={{ width: "100%" }} onClick={handleSubmit}>
                <button className="btn-premium btn-pay-action w-100 py-3 d-flex align-items-center justify-content-center gap-2" disabled={payLoading}>
                  {payLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-shield-lock-fill"></i>
                      <span>Complete Purchase</span>
                    </>
                  )}
                </button>
              </MagneticButton>

              <button className="btn btn-sm btn-link text-center text-secondary text-decoration-none" onClick={() => navigate("cart")}>
                &larr; Back to Shopping Cart
              </button>

              {/* Trust Badges */}
              <div className="pt-3 border-top border-secondary border-opacity-25 mt-2 text-center">
                <div className="d-flex justify-content-center align-items-center gap-3 opacity-60">
                  <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: "0.65rem" }}>
                    <i className="bi bi-lock-fill text-success fs-6"></i>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: "0.65rem" }}>
                    <i className="bi bi-shield-check text-success fs-6"></i>
                    <span>PCI Compliant</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
