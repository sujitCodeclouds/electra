import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import { AppContext } from "./context/AppContext";
import gsap from "gsap";

// --- Wrappers for URL Parameter Passing ---

function ProductListingPageWrapper({ navigate }) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const filterWishlist = searchParams.get("wishlist") === "true";

  return (
    <ProductListingPage 
      navigate={navigate} 
      category={category} 
      search={search} 
      filterWishlist={filterWishlist} 
    />
  );
}

function ProductDetailPageWrapper({ navigate }) {
  const { productId } = useParams();
  const parsedId = Number(productId);

  return (
    <ProductDetailPage 
      navigate={navigate} 
      productId={parsedId} 
    />
  );
}

function OrderConfirmationPageWrapper({ navigate }) {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  return (
    <OrderConfirmationPage 
      navigate={navigate} 
      orderDetails={orderDetails} 
    />
  );
}

// --- Main App Component ---

function App() {
  const { theme } = useContext(AppContext);
  const reactRouterNavigate = useNavigate();
  const location = useLocation();

  // Page Switch Fade-In on path changes
  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (mainEl) {
      gsap.fromTo(mainEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "transform" }
      );
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  // Sync theme attribute to HTML class
  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  // Legacy navigate function adapter to translate pages state names to routes path strings
  const navigate = (page, params = {}) => {
    let path = "/";
    let state = {};

    switch (page) {
      case "landing":
        path = "/";
        break;
      case "products":
        path = "/products";
        const queryParams = [];
        if (params.category) queryParams.push(`category=${encodeURIComponent(params.category)}`);
        if (params.search) queryParams.push(`search=${encodeURIComponent(params.search)}`);
        if (params.filterWishlist) queryParams.push(`wishlist=true`);
        if (queryParams.length > 0) {
          path += `?${queryParams.join("&")}`;
        }
        break;
      case "product-detail":
        path = `/product/${params.productId}`;
        break;
      case "cart":
        path = "/cart";
        break;
      case "checkout":
        path = "/checkout";
        break;
      case "confirmation":
        path = "/confirmation";
        state = { orderDetails: params.orderDetails };
        break;
      default:
        path = "/";
    }

    // Run GSAP fade out first, then switch location path
    const mainEl = document.querySelector("main");
    if (mainEl) {
      gsap.to(mainEl, {
        opacity: 0,
        y: 10,
        duration: 0.22,
        onComplete: () => {
          reactRouterNavigate(path, { state });
        }
      });
    } else {
      reactRouterNavigate(path, { state });
    }
  };

  // Convert current path back to mock currentPage strings to feed Navbar active badging checks
  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path === "/") return "landing";
    if (path.startsWith("/products")) return "products";
    if (path.startsWith("/product/")) return "product-detail";
    if (path === "/cart") return "cart";
    if (path === "/checkout") return "checkout";
    if (path === "/confirmation") return "confirmation";
    return "landing";
  };

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      {/* Decorative background glows */}
      <div 
        className="position-fixed" 
        style={{
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 102, 255, 0.05) 0%, rgba(0,0,0,0) 70%)",
          top: "-10vw",
          right: "-10vw",
          zIndex: -1,
          pointerEvents: "none"
        }}
      />
      <div 
        className="position-fixed" 
        style={{
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, rgba(0,0,0,0) 70%)",
          bottom: "-15vw",
          left: "-15vw",
          zIndex: -1,
          pointerEvents: "none"
        }}
      />

      {/* Sticky Global Navigation */}
      <Navbar navigate={navigate} currentPage={getCurrentPageName()} />

      {/* Main Content Viewport */}
      <main className="flex-grow-1" style={{ paddingTop: "80px", opacity: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage navigate={navigate} />} />
          <Route path="/products" element={<ProductListingPageWrapper navigate={navigate} />} />
          <Route path="/product/:productId" element={<ProductDetailPageWrapper navigate={navigate} />} />
          <Route path="/cart" element={<CartPage navigate={navigate} />} />
          <Route path="/checkout" element={<CheckoutPage navigate={navigate} />} />
          <Route path="/confirmation" element={<OrderConfirmationPageWrapper navigate={navigate} />} />
          <Route path="*" element={<LandingPage navigate={navigate} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
