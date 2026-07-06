import React, { useEffect, useRef, useState } from "react";
import MagneticButton from "../components/common/MagneticButton";
import ProductCard from "../components/common/ProductCard";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import gsap from "gsap";

export default function OrderConfirmationPage({ navigate, orderDetails }) {
  const { products } = useContext(AppContext);
  const successContainerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Fallback Mock data in case the user navigates directly without placing an order
  const order = orderDetails || {
    orderId: "EL-847291",
    fullName: "ALEX VANE",
    email: "alex.vane@electramember.com",
    address: "1028 Nebula Way, San Francisco, CA, 94103",
    grandTotal: 342.18,
    itemsCount: 1,
    items: [
      {
        name: "Sonic Aura ANC Headphones",
        quantity: 1,
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
      }
    ]
  };

  useEffect(() => {
    // --- GSAP Success Animations ---
    const ctx = gsap.context(() => {
      // 1. Draw SVG Checkmark
      gsap.fromTo(".checkmark-circle", 
        { strokeDashoffset: 160, strokeDasharray: 160 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(".checkmark-check",
        { strokeDashoffset: 80, strokeDasharray: 80 },
        { strokeDashoffset: 0, duration: 0.6, delay: 0.6, ease: "power2.out" }
      );

      // 2. Confetti svg burst
      const container = successContainerRef.current;
      if (container) {
        const colors = ["#00d2ff", "#0066ff", "#a855f7", "#ffffff", "#09a6f3"];
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement("div");
          particle.className = "confetti-particle";
          particle.style.position = "absolute";
          particle.style.width = `${Math.random() * 8 + 4}px`;
          particle.style.height = `${Math.random() * 8 + 4}px`;
          particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          particle.style.top = "50%";
          particle.style.left = "50%";
          particle.style.zIndex = 5;
          container.appendChild(particle);

          gsap.fromTo(particle,
            { x: 0, y: 0, scale: 0, opacity: 1 },
            {
              x: (Math.random() - 0.5) * 350,
              y: (Math.random() - 0.5) * 350 - 60,
              scale: Math.random() * 1.5 + 0.5,
              opacity: 0,
              rotation: Math.random() * 360,
              duration: Math.random() * 1.5 + 1.2,
              ease: "power3.out",
              onComplete: () => particle.remove()
            }
          );
        }
      }

      // 3. Slide reveals for summaries cards
      gsap.fromTo(".reveal-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }, successContainerRef);

    return () => ctx.revert();
  }, [orderDetails]);

  // Handle Printable Invoice triggers
  const handlePrintInvoice = () => {
    window.print();
  };

  // Copy Coupon Code logic
  const handleCopyCode = () => {
    navigator.clipboard.writeText("ELECTRACLUB20");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Recommendations accessories for cross-selling
  const confirmationAccessories = products.filter(
    (p) => p.category === "Audio" || p.category === "Charging"
  ).slice(0, 4);

  return (
    <div className="container py-4 text-start position-relative" style={{ minHeight: "90vh" }}>
      
      {/* Dynamic print-only stylesheet injections */}
      <style>{`
        @media print {
          nav, footer, .btn-print-actions, .cross-sell-section, .loyalty-card, .ambient-glows {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .glass-panel, .glass-card {
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            backdrop-filter: none !important;
          }
          .text-gradient, .text-gradient-purple {
            -webkit-text-fill-color: initial !important;
            background: none !important;
            color: #000000 !important;
          }
          .text-cyan {
            color: #0066ff !important;
          }
        }
      `}</style>

      {/* 2. SUCCESS CONFETTI CIRCLE HEADER */}
      <div ref={successContainerRef} className="row mb-5 justify-content-center text-center position-relative py-4">
        <div className="col-md-8 position-relative">
          <div className="d-inline-block position-relative mb-4" style={{ width: "90px", height: "90px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{ width: "90px", height: "90px" }}>
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="var(--accent-cyan)" strokeWidth="3.5" />
              <path className="checkmark-check" fill="none" stroke="var(--accent-cyan)" strokeWidth="4.5" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <span className="badge-tech mb-2 d-block mx-auto" style={{ width: "fit-content" }}>Order Placed Successfully</span>
          <h2 className="display-4 fw-bold text-gradient mb-2">Thank you for your order!</h2>
          <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "500px" }}>
            Your payment was securely verified. We sent a receipt invoice to <strong>{order.email}</strong>.
          </p>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        {/* LEFT COLUMN: RECEIPT DETAILS & TRACKING (col-md-7) */}
        <div className="col-lg-7 col-md-12 reveal-card">
          {/* Order Details Receipt Card */}
          <div className="glass-panel p-4 mb-4" style={{ borderRadius: "24px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary border-opacity-10">
              <div>
                <span className="text-secondary" style={{ fontSize: "0.8rem" }}>Order ID</span>
                <h5 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>{order.orderId}</h5>
              </div>
              <div className="text-end">
                <span className="text-secondary" style={{ fontSize: "0.8rem" }}>Date Purchased</span>
                <h6 className="fw-medium mb-0" style={{ color: "var(--text-primary)" }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h6>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="row mb-4 g-3">
              <div className="col-md-6">
                <span className="text-secondary d-block mb-1" style={{ fontSize: "0.8rem" }}>Shipping Address</span>
                <h6 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>{order.fullName}</h6>
                <p className="text-secondary mb-0" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>{order.address}</p>
              </div>
              <div className="col-md-6 text-md-end">
                <span className="text-secondary d-block mb-1" style={{ fontSize: "0.8rem" }}>Payment Method</span>
                <h6 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}><i className="bi bi-credit-card-2-front text-cyan me-1"></i> Credit Card</h6>
                <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>Secure Gateway Transaction</p>
              </div>
            </div>

            {/* Items Table List */}
            <div className="table-responsive mb-0">
              <table className="table border-secondary border-opacity-10 align-middle" style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                <thead>
                  <tr className="text-secondary border-bottom border-secondary border-opacity-25">
                    <th>Product details</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="border-bottom border-secondary border-opacity-10">
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.image} alt={item.name} className="rounded" style={{ width: "42px", height: "42px", objectFit: "cover" }} />
                          <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "220px", color: "var(--text-primary)" }}>{item.name}</h6>
                        </div>
                      </td>
                      <td className="text-center fw-semibold text-secondary-custom">{item.quantity}</td>
                      <td className="text-end fw-bold" style={{ color: "var(--text-primary)" }}>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="border-0">
                    <td colSpan="2" className="text-end text-secondary fw-semibold">Grand Total Paid</td>
                    <td className="text-end fw-bold text-cyan fs-5" style={{ color: "var(--accent-cyan)" }}>
                      ${order.grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DELIVERY TIMELINE & REFERRAL LOYALTY (col-md-5) */}
        <div className="col-lg-5 col-md-12 reveal-card">
          
          {/* Vertical shipment timeline tracking */}
          <div className="glass-panel p-4 mb-4" style={{ borderRadius: "24px" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text-primary)" }}><i className="bi bi-clock-history text-cyan me-2" style={{ color: "var(--accent-cyan)" }}></i> Order Tracking</h5>
            
            <div className="d-flex flex-column gap-4 text-start position-relative ps-3" style={{
              borderLeft: "2px solid var(--border-color)"
            }}>
              {[
                { title: "Order Confirmed", desc: "Payment accepted securely. Processing lines initialized.", date: "Today, 6:20 PM", active: true, done: true },
                { title: "Processing & Packaging", desc: "Matter components mapped and packaged at fulfillment warehouse.", date: "Today, 7:15 PM", active: true, done: true },
                { title: "In Transit (DHL Express)", desc: "Est. Departure from regional sorting airport.", date: "Est. Tomorrow, 10:00 AM", active: false, done: false },
                { title: "Delivered", desc: "Package arrives at shipping address mailbox.", date: "Est. Thursday, July 9", active: false, done: false }
              ].map((step, idx) => (
                <div key={idx} className="position-relative">
                  {/* Stepper node circle */}
                  <span className="position-absolute translate-middle start-0 rounded-circle d-flex align-items-center justify-content-center" style={{
                    left: "-25px",
                    top: "10px",
                    width: "14px",
                    height: "14px",
                    background: step.done ? "var(--accent-cyan)" : "var(--bg-color)",
                    border: `2px solid ${step.done ? "var(--accent-cyan)" : "var(--border-color)"}`,
                    boxShadow: step.done ? "0 0 10px rgba(0, 210, 255, 0.4)" : "none"
                  }} />
                  <h6 className="fw-bold mb-0" style={{ fontSize: "0.9rem", color: step.done ? "var(--text-primary)" : "var(--text-secondary)" }}>{step.title}</h6>
                  <p className="text-secondary mb-1" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>{step.desc}</p>
                  <small className="text-cyan" style={{ fontSize: "0.7rem", color: "var(--accent-cyan)" }}>{step.date}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Loyalty Coupon Referral Hook */}
          <div className="glass-panel p-4 mb-4 loyalty-card" style={{ borderRadius: "24px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
            <span className="badge bg-danger rounded-pill px-2.5 py-1 fw-bold mb-2" style={{ fontSize: "0.7rem", background: "var(--accent-purple) !important" }}>
              Electra Club Credit
            </span>
            <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>Unlock $20 Account Credit</h5>
            <p className="text-secondary" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
              Share the future of tech. Give friends $10 off, and get a **$20 store credit** code when they place their first order.
            </p>
            <div className="input-group">
              <input 
                type="text" 
                readOnly
                className="form-control bg-transparent border-secondary text-center fw-bold"
                value="ELECTRACLUB20"
                style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleCopyCode}
                style={{ background: "var(--accent-blue)", border: "none" }}
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action triggers row (Print & Shopping Redirect) */}
      <div className="row justify-content-center text-center mt-3 mb-5 btn-print-actions reveal-card">
        <div className="col-12 d-flex justify-content-center gap-3">
          <MagneticButton onClick={handlePrintInvoice}>
            <button className="btn-premium-outline px-4 py-2.5">
              <i className="bi bi-printer me-2"></i> Print Invoice
            </button>
          </MagneticButton>
          <MagneticButton onClick={() => navigate("landing")}>
            <button className="btn-premium px-4 py-2.5">
              Continue Shopping
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Related Cross-Sell recommendations */}
      <div className="row mt-5 pt-3 text-start cross-sell-section reveal-card">
        <div className="col-12">
          <h4 className="fw-bold mb-4 text-gradient-purple">Perfect Add-Ons for Your Tech</h4>
          <div className="row g-4">
            {confirmationAccessories.map((product) => (
              <div key={product.id} className="col-xl-3 col-lg-4 col-md-6">
                <ProductCard product={product} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
