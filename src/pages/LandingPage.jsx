import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/common/ProductCard";
import MagneticButton from "../components/common/MagneticButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import gsap from "gsap";
import applelogo from "../assets/logo-1_large_large_d8ffbf72-3a60-4643-9fec-2112f3a5831a_160x160.png";
import samsunglogo from "../assets/logo-2_large_large_6377487a-b613-4c0a-9cea-6b623e077ffc_160x160.png";
import microsoftlogo from "../assets/logo-3_large_large_a8b73c28-25e3-458e-95bb-e18decc75fab_160x160.png";
import lglogo from "../assets/logo-4_large_large_7770fb87-d0bd-4d10-bdb3-a46cbf35d767_160x160.png";
import sonylogo from "../assets/logo-5_large_large_2de526e6-2e88-4b63-84e7-ffeb6a24b9d6_160x160.png";
import htclogo from "../assets/logo-6_large_large_1f5136cb-e113-4410-b8ca-e5fd5afd3853_160x160.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ navigate }) {
  const { products, addToCart } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("All");

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedQVVariant, setSelectedQVVariant] = useState({});

  const heroRef = useRef(null);
  const trustRef = useRef(null);
  const categoriesRef = useRef(null);
  const bestSellersRef = useRef(null);
  const showcaseRef = useRef(null);
  const whyUsRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Filter products for Best Sellers
  const getFilteredProducts = () => {
    const sellers = products.filter((p) => p.rating >= 4.7);
    if (activeTab === "All") return sellers.slice(0, 8);
    return sellers.filter((p) => p.category === activeTab).slice(0, 8);
  };

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
        gsap.fromTo(
          modalBox,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" },
        );
      }
    }, 50);
  };

  const handleAddToCartQV = () => {
    if (!quickViewProduct) return;
    addToCart(quickViewProduct, 1, selectedQVVariant);
    setQuickViewProduct(null);
  };

  // GSAP animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal Animations
      gsap.fromTo(
        ".hero-animate-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.2 },
      );

      gsap.fromTo(
        ".hero-animate-fade",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.6, ease: "power2.out" },
      );

      // 2. Trust Bar Scroll Reveal
      gsap.fromTo(
        trustRef.current.querySelectorAll(".trust-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 3. Featured Categories cards Reveal
      gsap.fromTo(
        categoriesRef.current.querySelectorAll(".category-card"),
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 4. Smart Home Showcase split scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 70%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".showcase-img",
        { opacity: 0, scale: 0.9, x: -50 },
        { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" },
      ).fromTo(
        ".showcase-spec-item",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.6",
      );

      // 5. Why Choose Us cards stagger
      gsap.fromTo(
        whyUsRef.current.querySelectorAll(".why-us-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyUsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, heroRef); // Limit context scope to avoid selecting other page elements

    return () => ctx.revert();
  }, []);

  // Animate product card listings on tab change
  useEffect(() => {
    gsap.fromTo(
      ".best-seller-grid-item",
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      },
    );
  }, [activeTab]);

  return (
    <div ref={heroRef} className="landing-page">
      {/* 1. HERO SECTION */}
      <section
        className="hero-section position-relative overflow-hidden py-5 d-flex align-items-center"
        style={{ minHeight: "92vh" }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            {/* Hero Details Text */}
            <div className="col-lg-6 text-start">
              <span className="badge-tech mb-3 hero-animate-fade">
                Flagship 2026 Release
              </span>
              <h1
                className="display-3 fw-bold mb-3 hero-animate-title"
                style={{ fontFamily: "'Red Hat Text', sans-serif" }}
              >
                Future Electronics, <br />
                <span className="text-gradient">Redefined.</span>
              </h1>
              <p
                className="lead text-secondary mb-4 hero-animate-title"
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.7",
                  color: "var(--text-secondary)",
                }}
              >
                Experience premium engineering inspired by minimalist aesthetics
                and high-performance design. Explore smart home innovations,
                next-gen wearables, and cinema-grade audio equipment.
              </p>
              <div className="d-flex flex-wrap gap-3 hero-animate-fade">
                <MagneticButton onClick={() => navigate("products")}>
                  <button className="btn-premium">Shop The Catalog</button>
                </MagneticButton>
                <MagneticButton
                  onClick={() =>
                    navigate("products", { category: "Smart Home" })
                  }
                >
                  <button className="btn-premium-outline">
                    Explore Smart Home
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Hero Media Showcase Slider */}
            <div className="col-lg-6 hero-animate-fade">
              <div className="glass-panel p-3" style={{ borderRadius: "24px" }}>
                <Swiper
                  modules={[Pagination, Autoplay, Navigation]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  spaceBetween={30}
                  slidesPerView={1}
                  className="rounded-4"
                >
                  <SwiperSlide>
                    <div className="position-relative text-center py-4">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                        alt="Sonic Headphones"
                        className="img-fluid rounded-4 object-fit-cover"
                        style={{ height: "360px", width: "100%" }}
                      />
                      <div className="absolute-bottom-caption p-3 mt-3">
                        <h4 className="fw-bold mb-1">Sonic Aura ANC</h4>
                        <p className="text-secondary mb-0">
                          Immersive Audio. Ambient Silencing.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="position-relative text-center py-4">
                      <img
                        src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80"
                        alt="Pulse Watch"
                        className="img-fluid rounded-4 object-fit-cover"
                        style={{ height: "360px", width: "100%" }}
                      />
                      <div className="absolute-bottom-caption p-3 mt-3">
                        <h4 className="fw-bold mb-1">Pulse Watch Active GPS</h4>
                        <p className="text-secondary mb-0">
                          Sapphire Crystal. Titanium Finish.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="position-relative text-center py-4">
                      <img
                        src="https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80"
                        alt="Nest Thermostat"
                        className="img-fluid rounded-4 object-fit-cover"
                        style={{ height: "360px", width: "100%" }}
                      />
                      <div className="absolute-bottom-caption p-3 mt-3">
                        <h4 className="fw-bold mb-1">
                          Aether Nest Thermostat X
                        </h4>
                        <p className="text-secondary mb-0">
                          Matter Integration. Adaptive Energy Saver.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section
        ref={trustRef}
        className="py-5"
        style={{ background: "rgba(11, 15, 25, 0.2)" }}
      >
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              {
                icon: "bi-truck",
                title: "Free Express Shipping",
                desc: "For all orders above $150",
              },
              {
                icon: "bi-shield-check",
                title: "2-Year Hardware Warranty",
                desc: "No questions asked replacements",
              },
              {
                icon: "bi-arrow-left-right",
                title: "30-Day Premium Returns",
                desc: "Hassle-free shipping labels provided",
              },
              {
                icon: "bi-cpu",
                title: "Matter Standard Setup",
                desc: "Zero setup time smart connections",
              },
            ].map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6 trust-item">
                <div
                  className="d-flex align-items-start gap-3 p-3 glass-panel h-100"
                  style={{ borderStyle: "dashed" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 p-3"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    <i className={`bi ${item.icon} fs-4`}></i>
                  </div>
                  <div>
                    <h6
                      className="fw-semibold mb-1"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {item.title}
                    </h6>
                    <p
                      className="text-secondary mb-0"
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section ref={categoriesRef} className="py-5 my-3">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-tech mb-2">Curated Experience</span>
            <h2 className="display-5 fw-bold text-gradient">
              Explore Flagship Categories
            </h2>
            <p
              className="text-secondary mx-auto"
              style={{ maxWidth: "550px", color: "var(--text-secondary)" }}
            >
              Find products precisely designed to enhance every aspect of your
              daily digital workspace.
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                title: "Smart Home Tech",
                img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
                count: 7,
                cat: "Smart Home",
              },
              {
                title: "Hifi Audio",
                img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
                count: 7,
                cat: "Audio",
              },
              {
                title: "Smart Wearables",
                img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
                count: 7,
                cat: "Wearables",
              },
              {
                title: "Gaming Gear",
                img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
                count: 7,
                cat: "Gaming",
              },
            ].map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6 category-card">
                <div
                  className="glass-panel overflow-hidden position-relative hover-lift p-0"
                  onClick={() => navigate("products", { category: item.cat })}
                  style={{ height: "300px", cursor: "pointer" }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: "brightness(0.7)" }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-4"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(11,15,25,0.95), rgba(11,15,25,0))",
                    }}
                  >
                    <h4 className="fw-bold mb-1 text-white">{item.title}</h4>
                    <span
                      className="text-cyan fw-medium"
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--accent-cyan)",
                      }}
                    >
                      {item.count} Products &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS GRID SECTION */}
      <section
        ref={bestSellersRef}
        className="py-5"
        style={{ background: "rgba(11, 15, 25, 0.15)" }}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="badge-tech mb-2">CRO Verified Sellers</span>
              <h2 className="display-5 fw-bold text-gradient">
                Best Selling Electronics
              </h2>
            </div>
            {/* Filter Navigation Tabs */}
            <div className="d-flex flex-wrap gap-2">
              {["All", "Smart Home", "Audio", "Wearables", "Gaming"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`btn rounded-pill px-4 py-2 text-sm fw-medium transition-all ${
                      activeTab === tab
                        ? "btn-primary bg-primary border-transparent"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      fontSize: "0.85rem",
                      border:
                        activeTab === tab
                          ? "none"
                          : "1px solid var(--border-color)",
                      background:
                        activeTab === tab
                          ? "var(--accent-blue)"
                          : "transparent",
                      color: "var(--text-primary)",
                    }}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Dynamic Grid */}
          <div className="row g-4">
            {getFilteredProducts().map((product) => (
              <div
                key={product.id}
                className="col-xl-3 col-lg-4 col-md-6 best-seller-grid-item"
              >
                <ProductCard
                  product={product}
                  navigate={navigate}
                  onQuickView={openQuickView}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <MagneticButton onClick={() => navigate("products")}>
              <button className="btn-premium">Browse All Products</button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 5. SMART HOME SHOWCASE SECTION */}
      <section ref={showcaseRef} className="py-5 my-5 overflow-hidden">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Image Column */}
            <div className="col-lg-6 text-center showcase-img">
              <div
                className="position-relative d-inline-block p-4 glass-panel"
                style={{ borderRadius: "30px" }}
              >
                {/* Visual Ambient Glow Behind */}
                <div
                  className="position-absolute translate-middle-x start-50 top-50"
                  style={{
                    width: "120%",
                    height: "120%",
                    zIndex: -1,
                    background:
                      "radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, rgba(0,0,0,0) 60%)",
                    pointerEvents: "none",
                  }}
                ></div>
                <img
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
                  alt="Flagship Smart Speaker Portal Hub"
                  className="img-fluid rounded-4 object-fit-cover shadow-lg"
                  style={{
                    maxHeight: "450px",
                    width: "100%",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </div>

            {/* Details ScrollTrigger expansion column */}
            <div className="col-lg-6 text-start">
              <span className="badge-tech mb-3">Unified Ecosystem</span>
              <h2 className="display-4 fw-bold mb-4 text-gradient-purple">
                Aether Smart Home Ecosystem
              </h2>
              <p
                className="text-secondary mb-5"
                style={{ fontSize: "1.05rem", lineHeight: "1.7" }}
              >
                Transform your everyday environment. Our Matter-enabled hardware
                syncs seamlessly, allowing automated local routines, energy
                monitoring, and advanced soundscapes, without external cloud
                dependencies.
              </p>

              <div className="d-flex flex-column gap-4">
                {[
                  {
                    title: "Matter 1.3 Certified",
                    desc: "Sets up in seconds with QR scan and works natively with Apple Home, Alexa, and Google Assistant.",
                  },
                  {
                    title: "Off-Grid Local Processing",
                    desc: "All core security routines run locally inside the Aether Hub. Your data never leaves your router.",
                  },
                  {
                    title: "Adaptive Sound Calibration",
                    desc: "Internal microphones analyze room acoustics 100 times per second to align sound frequencies.",
                  },
                  {
                    title: "Clean Recycled Finishes",
                    desc: "Anodized recycled aluminum panels with premium Gorilla Glass front controls.",
                  },
                ].map((spec, idx) => (
                  <div key={idx} className="showcase-spec-item d-flex gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        color: "var(--accent-blue)",
                      }}
                    >
                      <i className="bi bi-patch-check-fill fs-5"></i>
                    </div>
                    <div>
                      <h5
                        className="fw-semibold mb-1"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {spec.title}
                      </h5>
                      <p
                        className="text-secondary mb-0"
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {spec.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section
        ref={whyUsRef}
        className="py-5"
        style={{ background: "rgba(11, 15, 25, 0.25)" }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-tech mb-2">Quality First</span>
            <h2 className="display-5 fw-bold text-gradient">
              Why Electra Stands Out
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: "550px" }}>
              We build premium electronics that balance extreme reliability,
              environmental design, and beautiful, minimalist form factors.
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "bi-gem",
                title: "Premium Materials Only",
                desc: "Aerospace titanium alloys, scratch-resistant sapphire crystal glass, and braided cords. No cheap injection plastics.",
              },
              {
                icon: "bi-recycle",
                title: "Carbon Neutral Vision",
                desc: "All our packaging is 100% plastic-free, and we offset our carbon footprint from raw materials to final shipping.",
              },
              {
                icon: "bi-chat-heart",
                title: "24/7 Premium Concierge",
                desc: "No call queues. Connect to a hardware engineer in seconds. We help solve Matter, connectivity, or mounting issues.",
              },
            ].map((card, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 why-us-card">
                <div className="glass-card h-100 p-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 p-3 mb-4"
                    style={{
                      width: "56px",
                      height: "56px",
                      color: "var(--accent-blue)",
                    }}
                  >
                    <i className={`bi ${card.icon} fs-3`}></i>
                  </div>
                  <h4 className="fw-bold mb-2">{card.title}</h4>
                  <p
                    className="text-secondary mb-0"
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section ref={testimonialsRef} className="py-5 my-4">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-tech mb-2">User Feedback</span>
            <h2 className="display-5 fw-bold text-gradient">
              Loved By Tech Creators
            </h2>
          </div>
          <div
            className="glass-panel p-4 p-md-5 review-slider"
            style={{ borderRadius: "24px" }}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {[
                {
                  name: "Marcus Vane",
                  role: "Acoustic Engineer",
                  quote:
                    "The soundstage on the Sonic Aura headphones is incredibly flat and transparent. It matches monitors that cost twice as much. The build quality feels like a luxury car.",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
                },
                {
                  name: "Elena Rostova",
                  role: "Smart Home Critic",
                  quote:
                    "Matter integration is finally solved. Snapped the Aether Hub to my network and all my sensors immediately registered. Off-line processing speed is a game-changer.",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
                },
                {
                  name: "Kenji Sato",
                  role: "Industrial Designer",
                  quote:
                    "Electra proves you don't need compromises. The aramid case and titanium watches are gorgeous. The subtle design details like magnetic connectors are pure class.",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
                },
                {
                  name: "Sarah Jenkins",
                  role: "Fitness & Lifestyle Vlogger",
                  quote:
                    "The Pulse Ring tracks my sleep HRV with absolute precision and lasts a whole week on one charge. I've completely replaced my bulky trackers.",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
                },
              ].map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="d-flex flex-column h-100 p-3 justify-content-between">
                    <div>
                      <div className="d-flex gap-1 text-warning mb-3">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                      <p
                        className="fst-italic text-secondary mb-4"
                        style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                      >
                        "{t.quote}"
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="rounded-circle"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6
                          className="fw-semibold mb-0"
                          style={{ fontSize: "0.95rem" }}
                        >
                          {t.name}
                        </h6>
                        <small
                          className="text-secondary"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {t.role}
                        </small>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 8. BRAND LOGO SCROLLER */}
      <section
        className="py-4"
        style={{
          background: "rgba(11, 15, 25, 0.15)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            {[
              {
                name: "Apple",
                src: applelogo,
                height: "60px",
              },
              {
                name: "Sony",
                src: sonylogo,
                height: "60px",
              },
              {
                name: "Samsung",
                src: samsunglogo,
                height: "60px",
              },
              {
                name: "microsoft",
                src: microsoftlogo,
                height: "60px",
              },
              {
                name: "htc",
                src: htclogo,
                height: "60px",
              },
              {
                name: "lg",
                src: lglogo,
                height: "60px",
              },
            ].map((brand, idx) => (
              <div
                key={idx}
                className="col-4 col-md-2 d-flex justify-content-center align-items-center"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  style={{
                    height: brand.height,
                    maxWidth: "100%",
                    objectFit: "contain",
                    transition: "filter 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CLOSING CALL TO ACTION SECTION */}
      <section className="py-6 position-relative text-center my-4 overflow-hidden">
        {/* Glow Effects */}
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            width: "80%",
            height: "80%",
            zIndex: -1,
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(0,0,0,0) 65%)",
            pointerEvents: "none",
          }}
        ></div>

        <div className="container py-4">
          <div
            className="glass-panel p-5 mx-auto"
            style={{ maxWidth: "900px", borderRadius: "32px" }}
          >
            <span className="badge-tech mb-3">Elevate Your Everyday</span>
            <h2
              className="display-4 fw-bold mb-3"
              style={{ fontFamily: "'Red Hat Text', sans-serif" }}
            >
              Ready to Step into the{" "}
              <span className="text-gradient">Future?</span>
            </h2>
            <p
              className="text-secondary mx-auto mb-4"
              style={{ maxWidth: "600px", fontSize: "1.1rem" }}
            >
              Explore the entire catalog today. Free shipping on your first
              order and a direct 30-day money-back guarantee.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <MagneticButton onClick={() => navigate("products")}>
                <button className="btn-premium px-5 py-3">
                  Explore All Products
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
      {/* --- QUICK VIEW DETAILS MODAL --- */}
      {quickViewProduct && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{
            background: "rgba(0,0,0,0.7)",
            zIndex: 1050,
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="qv-modal-box glass-panel p-4 p-md-5 w-100"
            style={{
              maxWidth: "800px",
              borderRadius: "24px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-color)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small className="badge-tech mb-2 d-inline-block">
                  {quickViewProduct.brand}
                </small>
                <h3
                  className="fw-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {quickViewProduct.name}
                </h3>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning">
                    <i className="bi bi-star-fill"></i>{" "}
                    {quickViewProduct.rating}
                  </span>
                  <span
                    className="text-secondary"
                    style={{ fontSize: "0.85rem" }}
                  >
                    ({quickViewProduct.reviewCount} Reviews)
                  </span>
                </div>
              </div>
              <button
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                onClick={() => setQuickViewProduct(null)}
                style={{
                  width: "32px",
                  height: "32px",
                  padding: 0,
                  color: "var(--text-primary)",
                  borderColor: "var(--border-color)",
                }}
                aria-label="Close dialog"
              >
                <i className="bi bi-x-lg" style={{ fontSize: "0.85rem" }}></i>
              </button>
            </div>

            <div className="row g-4 mt-1">
              {/* Product Gallery (left) */}
              <div className="col-md-5 text-center">
                <div
                  className="rounded-3 bg-dark bg-opacity-25 p-3 d-flex align-items-center justify-content-center"
                  style={{ height: "240px" }}
                >
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
                        <h4
                          className="fw-bold text-cyan mb-0"
                          style={{ color: "var(--accent-cyan)" }}
                        >
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

                  <p
                    className="text-secondary"
                    style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
                  >
                    {quickViewProduct.description}
                  </p>

                  {/* Dynamic Variants Selectors */}
                  {quickViewProduct.variants?.map((v) => (
                    <div key={v.name} className="mb-3">
                      <span
                        className="text-secondary text-uppercase fw-semibold mb-1 d-block"
                        style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                      >
                        Select {v.name}
                      </span>
                      <div className="d-flex gap-2">
                        {v.options.map((opt) => (
                          <button
                            key={opt}
                            className={`btn btn-sm rounded-pill px-3 py-1.5 ${
                              selectedQVVariant[v.name] === opt
                                ? "btn-primary bg-primary text-white border-transparent"
                                : "btn-outline-secondary"
                            }`}
                            onClick={() =>
                              setSelectedQVVariant({
                                ...selectedQVVariant,
                                [v.name]: opt,
                              })
                            }
                            style={{
                              fontSize: "0.8rem",
                              background:
                                selectedQVVariant[v.name] === opt
                                  ? "var(--accent-blue)"
                                  : "transparent",
                              border:
                                selectedQVVariant[v.name] === opt
                                  ? "none"
                                  : "1px solid var(--border-color)",
                              color: "var(--text-primary)",
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="pt-3 border-top d-flex align-items-center gap-3"
                  style={{ borderColor: "var(--border-color) !important" }}
                >
                  <button
                    className="btn btn-premium flex-grow-1 py-2.5"
                    onClick={handleAddToCartQV}
                    disabled={quickViewProduct.stock <= 0}
                  >
                    {quickViewProduct.stock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>
                  <button
                    className="btn btn-premium-outline py-2.5"
                    onClick={() => {
                      setQuickViewProduct(null);
                      navigate("product-detail", {
                        productId: quickViewProduct.id,
                      });
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary py-2.5 px-3 rounded-pill"
                    onClick={() => setQuickViewProduct(null)}
                    style={{
                      color: "var(--text-primary)",
                      borderColor: "var(--border-color)",
                    }}
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
