import React, { useState } from "react";

export default function Footer({ navigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="pt-5 pb-4 mt-auto" style={{
      borderTop: "1px solid var(--footer-border)",
      background: "var(--footer-bg)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)"
    }}>
      <div className="container">
        {/* Footer Top */}
        <div className="row justify-content-between g-4 mb-5">
          {/* Brand & Description */}
          <div className="col-lg-4 col-md-6">
            <h3 className="fw-bold mb-3" style={{
              fontFamily: "'Red Hat Text', sans-serif",
              letterSpacing: "-0.04em"
            }}>
              ELECTRA<span style={{ color: "var(--accent-cyan)" }}>.</span>
            </h3>
            <p className="text-secondary mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
              Engineered for the future. Designing next-generation electronics, wearables, and smart home solutions to elevate your daily digital interactions.
            </p>
            <div className="d-flex gap-3">
              {["twitter-x", "instagram", "youtube", "github"].map((social) => (
                <a key={social} href={`https://${social}.com`} target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center rounded-circle border text-secondary" style={{
                  width: "40px",
                  height: "40px",
                  borderColor: "var(--border-color)",
                  transition: "all 0.3s ease"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-cyan)";
                  e.currentTarget.style.color = "var(--accent-cyan)";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}>
                  <i className={`bi bi-${social === "twitter-x" ? "twitter-x" : social} fs-5`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="fw-semibold mb-3 text-uppercase tracking-wider" style={{ fontSize: "0.85rem", letterSpacing: "0.1em" }}>Products</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.9rem" }}>
              {["Smart Home", "Audio", "Wearables", "Gaming"].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate("products", { category: item }); }} className="text-secondary hover-text-primary" style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="fw-semibold mb-3 text-uppercase tracking-wider" style={{ fontSize: "0.85rem", letterSpacing: "0.1em" }}>Support</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.9rem" }}>
              {["Order Status", "Shipping Details", "Returns & Policy", "Help Center"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-secondary" style={{ color: "var(--text-secondary)" }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-semibold mb-3 text-uppercase tracking-wider" style={{ fontSize: "0.85rem", letterSpacing: "0.1em" }}>Newsletter</h5>
            <p className="text-secondary mb-3" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Subscribe to unlock product launches, exclusive previews, and member-only credits.
            </p>
            <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">
              <div className="input-group">
                <input
                  type="email"
                  required
                  className="form-control bg-transparent border-secondary"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                    borderRadius: "8px 0 0 8px",
                    fontSize: "0.9rem"
                  }}
                />
                <button className="btn btn-primary px-3" type="submit" style={{
                  background: "var(--accent-blue)",
                  border: "none",
                  borderRadius: "0 8px 8px 0"
                }}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
              {subscribed && (
                <small className="text-success mt-1 d-flex align-items-center gap-1">
                  <i className="bi bi-check-circle-fill"></i> Subscribed successfully!
                </small>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3" style={{
          borderColor: "var(--border-color) !important"
        }}>
          <p className="text-secondary mb-0" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            &copy; {new Date().getFullYear()} ELECTRA Inc. All rights reserved. Designed for active e-commerce CRO.
          </p>
        </div>
      </div>
    </footer>
  );
}
