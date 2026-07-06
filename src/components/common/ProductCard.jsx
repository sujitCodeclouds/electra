import React, { useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import gsap from "gsap";

export default function ProductCard({ product, navigate, onQuickView }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(AppContext);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.onSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleFlyToCart = (e) => {
    e.stopPropagation();

    const cartBtn = document.querySelector(".bi-bag-fill");
    const imgEl = imageRef.current;
    
    if (!imgEl || !cartBtn) {
      addToCart(product, 1);
      return;
    }

    const imgRect = imgEl.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    const flyingClone = document.createElement("img");
    flyingClone.src = product.images[0];
    flyingClone.className = "flying-product";
    flyingClone.style.top = `${imgRect.top}px`;
    flyingClone.style.left = `${imgRect.left}px`;
    flyingClone.style.width = `${imgRect.width}px`;
    flyingClone.style.height = `${imgRect.height}px`;
    flyingClone.style.borderRadius = "12px";
    
    document.body.appendChild(flyingClone);

    gsap.to(flyingClone, {
      top: cartRect.top + 5,
      left: cartRect.left + 5,
      width: 15,
      height: 15,
      opacity: 0.1,
      borderRadius: "50%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        flyingClone.remove();
        addToCart(product, 1);

        const cartBadge = document.querySelector(".bi-bag-fill").parentElement;
        if (cartBadge) {
          gsap.fromTo(cartBadge, 
            { scale: 1 }, 
            { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" }
          );
        }
      }
    });
  };

  return (
    <div 
      ref={cardRef}
      className="glass-card h-100 d-flex flex-column position-relative"
      onClick={() => navigate("product-detail", { productId: product.id })}
      style={{ cursor: "pointer", border: "1px solid var(--border-color)" }}
    >
      {/* Badge container */}
      <div className="position-absolute top-3 start-3 d-flex flex-column gap-1" style={{ zIndex: 5 }}>
        {product.onSale && (
          <span className="badge bg-danger rounded-pill px-2 py-1 fw-bold" style={{ fontSize: "0.75rem" }}>
            -{discountPercent}%
          </span>
        )}
        <span className="badge bg-dark bg-opacity-75 rounded-pill px-2 py-1 d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
          <i className="bi bi-star-fill text-warning"></i> {product.rating}
        </span>
      </div>

      {/* Action Row at Top Right */}
      <div className="position-absolute top-3 end-3 d-flex flex-column gap-2" style={{ zIndex: 5 }}>
        {/* Wishlist Button */}
        <button 
          className="btn rounded-circle border-0 d-flex align-items-center justify-content-center wishlist-btn-hover"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          style={{
            width: "36px",
            height: "36px",
            background: isWishlisted ? "rgba(220, 53, 69, 0.15)" : "rgba(255,255,255,0.15)",
            color: isWishlisted ? "#dc3545" : "var(--text-primary)",
            backdropFilter: "blur(5px)",
            transition: "all 0.2s ease"
          }}
        >
          <i className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>

      {/* Image Wrap */}
      <div className="overflow-hidden rounded-3 mb-3 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 position-relative group" style={{ height: "220px" }}>
        <img 
          ref={imageRef}
          src={product.images[0]} 
          alt={product.name} 
          className="img-fluid h-100 w-100 object-fit-cover transition-transform"
          style={{ 
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        />

        {/* Quick View Button Hover Overlay */}
        {onQuickView && (
          <div className="quick-view-btn-wrap">
            <button
              className="btn btn-sm btn-dark bg-opacity-75 rounded-pill px-3 py-1.5 border-1 border-secondary text-white d-flex align-items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                fontSize: "0.75rem",
                backdropFilter: "blur(5px)"
              }}
            >
              <i className="bi bi-eye"></i> Quick View
            </button>
          </div>
        )}
      </div>

      {/* Details info */}
      <div className="mt-auto d-flex flex-column flex-grow-1">
        <small className="text-secondary text-uppercase fw-semibold tracking-wider mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
          {product.brand}
        </small>
        <h5 className="fw-semibold text-truncate mb-2" style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>
          {product.name}
        </h5>
        
        {/* Prices */}
        <div className="d-flex align-items-baseline gap-2 mb-3">
          {product.onSale ? (
            <>
              <span className="fs-5 fw-bold text-cyan" style={{ color: "var(--accent-cyan)" }}>
                ${product.salePrice.toFixed(2)}
              </span>
              <span className="text-decoration-line-through text-secondary" style={{ fontSize: "0.85rem" }}>
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="fs-5 fw-bold text-primary-custom" style={{ color: "var(--text-primary)" }}>
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quick Add To Cart Button */}
        <button 
          className="btn btn-sm w-100 d-flex align-items-center justify-content-center gap-2 py-2 mt-auto"
          onClick={handleFlyToCart}
          style={{
            borderRadius: "30px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            fontWeight: 500,
            fontSize: "0.85rem",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-blue)";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <i className="bi bi-bag-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  );
}
