// Shared Product Catalog for the Electronics E-Commerce Web App
export const products = [
  // --- Category: Smart Home (1-7) ---
  {
    id: "sh-01",
    name: "Aether Nest Thermostat X",
    brand: "Aether",
    category: "Smart Home",
    price: 249.99,
    salePrice: 199.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 342,
    images: [
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"
    ],
    description: "Intelligent thermostat that adapts to your daily routine, optimizing home energy efficiency by up to 26% with local air-quality analytics.",
    specs: {
      "Display": "2.4-inch Curved OLED",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.2, Matter, Thread",
      "Compatibility": "Alexa, Google Home, Apple HomeKit",
      "Sensors": "Temperature, Humidity, Proximity, Ambient Light, VOC Air Quality"
    },
    features: [
      "Auto-Schedule learning algorithms",
      "Detailed air quality monitoring",
      "Matter standard integration for seamless cross-brand setup",
      "Recycled aluminum & premium glass finish"
    ],
    variants: [
      { name: "Color", options: ["Graphite", "Silver", "Champagne Gold"] }
    ],
    stock: 45,
    related: ["sh-02", "sh-04", "ch-03"]
  },
  {
    id: "sh-02",
    name: "Aether Portal Smart Hub & Speaker",
    brand: "Aether",
    category: "Smart Home",
    price: 179.99,
    salePrice: 179.99,
    onSale: false,
    rating: 4.6,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
    ],
    description: "The ultimate command center for your smart home, featuring an advanced sound system and visual status indicators.",
    specs: {
      "Speaker Drivers": "3-inch woofer, dual 0.8-inch tweeters",
      "Voice Control": "Built-in voice assistant, far-field 4-mic array",
      "Display": "Top touch interface with interactive RGB LED ring",
      "Smart Protocol": "Matter Controller, Zigbee 3.0, Thread Border Router"
    },
    features: [
      "High-fidelity directional audio with auto-room calibration",
      "Hardware mic mute switch for advanced privacy control",
      "Offline local processing for basic smart home routines",
      "Magnetic charging base"
    ],
    variants: [
      { name: "Color", options: ["Chalk White", "Charcoal Black"] }
    ],
    stock: 30,
    related: ["sh-01", "sh-03", "au-04"]
  },
  {
    id: "sh-03",
    name: "SyncLink Cam 4K Outdoor Security",
    brand: "SyncLink",
    category: "Smart Home",
    price: 199.99,
    salePrice: 149.99,
    onSale: true,
    rating: 4.7,
    reviewCount: 215,
    images: [
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
    ],
    description: "Ultra-sharp 4K security camera with onboard AI recognition, night vision spotlight, and magnetic tool-free installation.",
    specs: {
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Field of View": "160-degree diagonal wide-angle",
      "Battery Life": "Up to 6 months per charge (rechargeable)",
      "Weather Resistance": "IP67 certified waterproof"
    },
    features: [
      "No-subscription local AI detection (People, Vehicles, Animals)",
      "Color Night Vision with high-intensity 400lm spotlight",
      "Full duplex two-way audio with active noise cancellation",
      "End-to-end encrypted storage with optional Cloud Backup"
    ],
    variants: [
      { name: "Pack Size", options: ["1-Pack", "2-Pack", "4-Pack"] }
    ],
    stock: 55,
    related: ["sh-02", "sh-05", "ch-02"]
  },
  {
    id: "sh-04",
    name: "Aura Smart Bulb Starter Set (3 Bulbs)",
    brand: "Aura",
    category: "Smart Home",
    price: 89.99,
    salePrice: 89.99,
    onSale: false,
    rating: 4.5,
    reviewCount: 412,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&q=80"
    ],
    description: "Transform your living space with millions of vibrant colors and dynamic lighting scenes synced to music or gaming screens.",
    specs: {
      "Brightness": "1100 Lumens (equivalent to 75W)",
      "Colors": "16 Million Colors + Adjustable Tunable Whites",
      "Lifespan": "25,000 Hours",
      "Fitting": "E26 Medium Screw Base"
    },
    features: [
      "Adaptive Lighting presets to match natural daylight cycles",
      "No hub required – direct Wi-Fi and Bluetooth connection",
      "Rhythm Sync dynamically flashes to your favorite audio tracks",
      "Schedules and geofencing triggers"
    ],
    variants: [
      { name: "Fitting Type", options: ["E26 Screw", "GU10 Spotlight"] }
    ],
    stock: 120,
    related: ["sh-01", "sh-02", "sh-06"]
  },
  {
    id: "sh-05",
    name: "SyncLink Smart Door Lock Pro",
    brand: "SyncLink",
    category: "Smart Home",
    price: 279.99,
    salePrice: 279.99,
    onSale: false,
    rating: 4.8,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80"
    ],
    description: "Next-gen keyless smart lock with fast 3D fingerprint recognition, keypad, and Matter compatibility over Thread.",
    specs: {
      "Unlock Methods": "Fingerprint, PIN, App, NFC Key, Mechanical Key",
      "Fingerprint Capacity": "Up to 50 unique prints",
      "Battery Type": "Rechargeable Li-Ion pack (10-month life)",
      "Communication": "Bluetooth, Wi-Fi, Matter, Apple Home Key"
    },
    features: [
      "Fast 0.3-second 3D capacitive fingerprint scan",
      "Remote guest passcodes and entry tracking logs",
      "Auto-lock sensor automatically locks when door closes",
      "Premium solid metal construction with anti-drill lock cylinder"
    ],
    variants: [
      { name: "Finish", options: ["Satin Nickel", "Matte Black"] }
    ],
    stock: 18,
    related: ["sh-03", "sh-01", "sh-07"]
  },
  {
    id: "sh-06",
    name: "Nestor Smart Air Purifier 2S",
    brand: "Nestor",
    category: "Smart Home",
    price: 159.99,
    salePrice: 129.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80"
    ],
    description: "Compact, whisper-quiet air purifier featuring a true HEPA H13 filter and built-in laser particle sensor.",
    specs: {
      "Clean Air Delivery Rate (CADR)": "220 m³/h",
      "Effective Area": "Up to 350 sq ft",
      "Noise Level": "21dB (Sleep mode) to 52dB (Turbo mode)",
      "Filter Lifespan": "6 to 12 months"
    },
    features: [
      "True HEPA H13 removes 99.97% of mold, pollen, and dust",
      "Real-time PM2.5 tracking on digital OLED front display",
      "QuietNight mode turns off indicator lights and dials down fan speed",
      "Smart home integration with Alexa and Google Assistant"
    ],
    variants: [
      { name: "Size", options: ["Standard", "Large Room"] }
    ],
    stock: 40,
    related: ["sh-01", "sh-04", "sh-07"]
  },
  {
    id: "sh-07",
    name: "Nestor Smart Leak & Flood Detector",
    brand: "Nestor",
    category: "Smart Home",
    price: 49.99,
    salePrice: 39.99,
    onSale: true,
    rating: 4.4,
    reviewCount: 84,
    images: [
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80",
      "https://images.unsplash.com/photo-1595776613295-76cd190c4bab?w=800&q=80"
    ],
    description: "Protect your property from water damage. Instantly receive phone alerts and sound alarms when moisture is detected.",
    specs: {
      "Sensors": "Dual moisture pins on top & bottom, temperature monitor",
      "Alarm Volume": "85 dB siren built-in",
      "Battery": "2x AAA batteries (included, lasts up to 3 years)",
      "Connectivity": "Direct Wi-Fi connection, no hub required"
    },
    features: [
      "Top and bottom sensing contacts for maximum coverage",
      "Instant push notification, email, and siren alerts",
      "Built-in temperature alert logs freezing risks in pipes",
      "Super compact low-profile design fits under washing machines"
    ],
    variants: [
      { name: "Pack", options: ["1-Pack", "3-Pack"] }
    ],
    stock: 90,
    related: ["sh-01", "sh-06", "sh-05"]
  },

  // --- Category: Audio (8-14) ---
  {
    id: "au-01",
    name: "Sonic Aura ANC Headphones",
    brand: "Sonic",
    category: "Audio",
    price: 349.99,
    salePrice: 299.99,
    onSale: true,
    rating: 4.9,
    reviewCount: 1250,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
    ],
    description: "Master-crafted over-ear wireless headphones with industry-leading Active Noise Cancelling, spatial audio, and high-fidelity custom drivers.",
    specs: {
      "Drivers": "40mm custom bio-cellulose dynamic drivers",
      "Battery Life": "Up to 45 hours (ANC off), 35 hours (ANC on)",
      "Charging": "USB-C, quick charge (10 mins = 5 hours playback)",
      "Bluetooth": "Bluetooth 5.3 with multipoint support, LDAC, AAC, SBC"
    },
    features: [
      "Adaptive hybrid ANC automatically tunes out environmental noise",
      "Immersive spatial audio with dynamic head-tracking systems",
      "Touch control glass gesture panel on right ear cup",
      "Premium memory foam cushions with breathable mesh knit"
    ],
    variants: [
      { name: "Color", options: ["Space Graphite", "Alabaster White", "Ocean Blue"] }
    ],
    stock: 80,
    related: ["au-02", "au-04", "we-01"]
  },
  {
    id: "au-02",
    name: "Sonic Echoic Earbuds Pro",
    brand: "Sonic",
    category: "Audio",
    price: 199.99,
    salePrice: 199.99,
    onSale: false,
    rating: 4.7,
    reviewCount: 840,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&q=80"
    ],
    description: "Compact in-ear wireless buds with robust, punchy bass, smart sound adjustments, and clear call quality via 6 beamforming mics.",
    specs: {
      "Water Resistance": "IPX4 sweat & splash proof",
      "Battery Life": "8 hours per bud, 32 hours total with Qi-charging case",
      "Audio Codecs": "AAC, SBC, aptX Adaptive",
      "Drivers": "11mm composite dynamic drivers"
    },
    features: [
      "Custom EQ profile setup via mobile companion app",
      "HearThrough transparency mode with wind noise reduction",
      "Seamless dual-device connection with Multipoint",
      "Ultra-ergonomic fit with 4 sizes of ear tips"
    ],
    variants: [
      { name: "Color", options: ["Absolute Black", "Pure White"] }
    ],
    stock: 140,
    related: ["au-01", "au-05", "ch-01"]
  },
  {
    id: "au-03",
    name: "Aura SoundBar 500 Home Theatre",
    brand: "Aura",
    category: "Audio",
    price: 499.99,
    salePrice: 429.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 304,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
    ],
    description: "Cinema-grade 5.1 channel soundbar featuring Dolby Atmos, built-in dual subwoofers, and voice-assisted control options.",
    specs: {
      "Total Output Power": "350W",
      "Surround Formats": "Dolby Atmos, DTS:X, Dolby TrueHD",
      "Inputs": "eARC HDMI, Optical Input, AUX, Bluetooth 5.0",
      "Dimensions": "36 x 3.5 x 2.4 inches"
    },
    features: [
      "Virtual spatialization mimics vertical overhead audio streams",
      "Voice Enhance boost makes dialog crystal clear in movies",
      "Direct streaming over AirPlay 2, Spotify Connect, and Chromecast",
      "Brushed metal finish with custom fabric front grill"
    ],
    variants: [
      { name: "Subwoofer Option", options: ["Built-in Duals", "With External Wireless Sub (+ $150)"] }
    ],
    stock: 22,
    related: ["sh-02", "au-01", "sh-04"]
  },
  {
    id: "au-04",
    name: "Vibe Go Portable Bluetooth Speaker",
    brand: "Vibe",
    category: "Audio",
    price: 119.99,
    salePrice: 99.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
    ],
    description: "Take high-fidelity sound anywhere. Dustproof, waterproof, floats in water, and provides up to 20 hours of continuous music.",
    specs: {
      "Water Resistance": "IP67 dustproof and waterproof",
      "Battery Capacity": "5200 mAh, doubles as a portable power bank",
      "Bluetooth Range": "Up to 100 feet",
      "Drivers": "Dual passive radiators, 20W sound output"
    },
    features: [
      "Robust drop-tested silicone housing protects against falls",
      "PartySync lets you pair up to 100 Vibe speakers together",
      "USB-A output port to charge your phone on the go",
      "Includes premium carrying carabiner"
    ],
    variants: [
      { name: "Color", options: ["Midnight Blue", "Forest Green", "Fire Red"] }
    ],
    stock: 75,
    related: ["au-02", "ch-02", "we-03"]
  },
  {
    id: "au-05",
    name: "Sonic Wave Studio Monitors (Pair)",
    brand: "Sonic",
    category: "Audio",
    price: 299.99,
    salePrice: 299.99,
    onSale: false,
    rating: 4.7,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ],
    description: "Flat-response desktop speakers engineered for precise audio editing, music production, and critical listening sessions.",
    specs: {
      "Frequency Response": "48Hz - 22kHz",
      "Amplification": "Class D Bi-amplified, 80W RMS total",
      "Inputs": "Balanced XLR, TRS Phone, Unbalanced RCA",
      "Woofer Size": "4-inch fiberglass cone"
    },
    features: [
      "Ultra-flat response curve for transparent audio rendering",
      "Acoustic Room Tuning switches to correct low frequencies",
      "Front-facing bass reflex port for linear bass response",
      "Solid MDF wooden cabinets reduce resonance distortions"
    ],
    variants: [
      { name: "Cabinet Color", options: ["Studio Black", "Vintage Walnut"] }
    ],
    stock: 25,
    related: ["au-01", "ca-04", "ga-03"]
  },
  {
    id: "au-06",
    name: "Echoic Wireless Sports Headband",
    brand: "Echoic",
    category: "Audio",
    price: 59.99,
    salePrice: 49.99,
    onSale: true,
    rating: 4.2,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"
    ],
    description: "Comfortable, moisture-wicking athletic headband with ultra-thin integrated speakers, ideal for workouts and sleeping.",
    specs: {
      "Material": "88% Polyester, 12% Spandex blend",
      "Battery Life": "Up to 10 hours continuous use",
      "Charging Time": "1.5 hours via Micro-USB",
      "Speaker Thickness": "Just 4mm"
    },
    features: [
      "Sweat-absorbing, washable quick-dry athletic material",
      "Ultra-thin padded speakers won't hurt side sleepers",
      "Direct button control for volume and tracks on the side patch",
      "Elastic comfortable fit fits all head sizes"
    ],
    variants: [
      { name: "Size", options: ["Medium", "Large"] }
    ],
    stock: 110,
    related: ["we-02", "au-02", "we-03"]
  },
  {
    id: "au-07",
    name: "Sonic Stream USB Desktop Microphone",
    brand: "Sonic",
    category: "Audio",
    price: 149.99,
    salePrice: 129.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 228,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
    ],
    description: "Professional studio microphone with multi-polar patterns, dynamic level meter, and high-resolution digital audio interface.",
    specs: {
      "Polar Patterns": "Cardioid, Omnidirectional, Bidirectional, Stereo",
      "Sample Rate / Resolution": "96 kHz / 24-bit",
      "Frequency Response": "20Hz - 20kHz",
      "Connection": "USB-C to USB-C/A plug-and-play"
    },
    features: [
      "Zero-latency headphone jack with dedicated volume controller",
      "Tap-to-Mute capacitive button with visual LED status ring",
      "Built-in pop filter and vibration-absorbing desktop stand",
      "Custom EQ profile controls in Sonic Control desktop app"
    ],
    variants: [
      { name: "Color", options: ["Matte Black", "Platinum Silver", "Neon Pink"] }
    ],
    stock: 35,
    related: ["ga-03", "au-05", "ca-02"]
  },

  // --- Category: Wearables (15-21) ---
  {
    id: "we-01",
    name: "Pulse Watch Active GPS",
    brand: "Pulse",
    category: "Wearables",
    price: 299.99,
    salePrice: 249.99,
    onSale: true,
    rating: 4.7,
    reviewCount: 954,
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    description: "Premium smartwatch for active lifestyles. Featuring dual-band GPS, advanced cardiac mapping, and an always-on Sapphire crystal glass display.",
    specs: {
      "Display": "1.43-inch Always-on AMOLED (466x466)",
      "Battery Life": "Up to 14 days (Smart mode), 30 hours (Full GPS)",
      "Sensors": "Heart Rate, Pulse Ox, ECG, Barometer, Gyro, Compass",
      "Waterproofing": "5 ATM certified (up to 50 meters)"
    },
    features: [
      "Multiband dual GPS system for precision trail tracking",
      "Advanced sleep coach tracking with HRV analysis indices",
      "On-device storage for up to 500 songs (Spotify offline ready)",
      "Premium titanium bezel plate with silicone sweat-proof band"
    ],
    variants: [
      { name: "Size", options: ["42mm", "46mm"] },
      { name: "Strap", options: ["Silicone Sport", "Milanese Loop (+ $40)"] }
    ],
    stock: 50,
    related: ["we-02", "we-04", "au-02"]
  },
  {
    id: "we-02",
    name: "Pulse Ring Smart Tracker",
    brand: "Pulse",
    category: "Wearables",
    price: 249.99,
    salePrice: 249.99,
    onSale: false,
    rating: 4.5,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80"
    ],
    description: "Discreet wellness tracker in a lightweight titanium ring. Monitors temperature, activity, heart rate, and sleep quality around the clock.",
    specs: {
      "Material": "Ultra-light aerospace titanium alloy",
      "Weight": "4 to 6 grams depending on size",
      "Battery Life": "Up to 7 days per charge",
      "Waterproofing": "IP68 & 100m depth rating"
    },
    features: [
      "Ultra-low profile design without screens for minimal distraction",
      "Predictive sleep scoring and body recovery readiness guides",
      "Skin temperature tracking warns of early illness symptoms",
      "Includes compact USB-C magnetic wireless charging dock"
    ],
    variants: [
      { name: "Color", options: ["Polished Black", "Rose Gold", "Titanium Silver"] },
      { name: "Ring Size", options: ["Size 8", "Size 9", "Size 10", "Size 11"] }
    ],
    stock: 28,
    related: ["we-01", "we-03", "sh-01"]
  },
  {
    id: "we-03",
    name: "Chronos Band Fit Tracker",
    brand: "Chronos",
    category: "Wearables",
    price: 99.99,
    salePrice: 79.99,
    onSale: true,
    rating: 4.4,
    reviewCount: 420,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    description: "Sleek, lightweight fitness band tracking steps, active minutes, calories burned, and notifications on an OLED display.",
    specs: {
      "Display": "0.96-inch curved OLED touchscreen",
      "Battery Life": "Up to 10 days on single charge",
      "Sensors": "3-axis accelerometer, optical heart rate sensor",
      "Weight": "22 grams"
    },
    features: [
      "24/7 heart rate monitor with high/low pulse notifications",
      "Connected GPS – links to your phone to map runs/walks",
      "Smart wake alarm gently vibrates during light sleep cycles",
      "Interchangeable custom color bands"
    ],
    variants: [
      { name: "Strap Color", options: ["Carbon Black", "Coral Pink", "Slate Gray"] }
    ],
    stock: 95,
    related: ["we-01", "we-02", "ch-01"]
  },
  {
    id: "we-04",
    name: "Halo Smart Glasses Audio Lite",
    brand: "Halo",
    category: "Wearables",
    price: 199.99,
    salePrice: 199.99,
    onSale: false,
    rating: 4.3,
    reviewCount: 112,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80"
    ],
    description: "Classic eyewear design integrated with open-ear directional audio speakers, voice assistants, and anti-blue light lenses.",
    specs: {
      "Audio System": "Dual micro-speakers pointing directly to ears",
      "Lenses": "99% UV protection, blue light filtering, prescription ready",
      "Battery Life": "5 hours continuous audio streaming",
      "Weight": "48 grams"
    },
    features: [
      "Open-ear layout lets you hear ambient noise for safety",
      "Tap controls on temples to adjust tracks and answer calls",
      "Integrates with Siri and Google Assistant on your phone",
      "Sturdy TR90 sweatproof frame build"
    ],
    variants: [
      { name: "Frame Style", options: ["Wayfarer Black", "Round Tortoise"] }
    ],
    stock: 15,
    related: ["we-01", "au-02", "we-02"]
  },
  {
    id: "we-05",
    name: "Pulse Smart Watch Kids Edition",
    brand: "Pulse",
    category: "Wearables",
    price: 129.99,
    salePrice: 109.99,
    onSale: true,
    rating: 4.5,
    reviewCount: 78,
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80"
    ],
    description: "Parent-approved smartwatch with 4G LTE calling, live tracking, geo-fenced safe zones, and simple educational tasks.",
    specs: {
      "LTE Connection": "Built-in eSIM (requires monthly activation fee)",
      "Battery Life": "2 days smart standby mode",
      "Screen": "1.3-inch color LCD display",
      "GPS": "High-accuracy GPS, Wi-Fi, LBS triple locating"
    },
    features: [
      "Two-way voice and video calls with approved contacts only",
      "SOS panic button triggers instant coordinates to parents",
      "School mode disables games and notifications during classes",
      "Durable shock-absorbent silicone casing layout"
    ],
    variants: [
      { name: "Color", options: ["Aqua Blue", "Bubblegum Pink"] }
    ],
    stock: 32,
    related: ["we-01", "we-03", "sh-03"]
  },
  {
    id: "we-06",
    name: "Chronos Swim Pro Tracker",
    brand: "Chronos",
    category: "Wearables",
    price: 149.99,
    salePrice: 149.99,
    onSale: false,
    rating: 4.6,
    reviewCount: 92,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80"
    ],
    description: "Dedicated lap tracking band featuring SWOLF score tracking, stroke detection, and heart rate monitoring underwater.",
    specs: {
      "Water Resistance": "10 ATM certified (up to 100 meters)",
      "Display": "High contrast monochrome display visible under water",
      "Sensors": "6-axis high precision motion sensor, heart-rate optical",
      "Battery": "Up to 21 days backup"
    },
    features: [
      "Automatic stroke style identification (Freestyle, Breast, Back)",
      "Calculates SWOLF efficiency index for every lap session",
      "Vibration alerts for lap targets and pacing counts",
      "Extra long silicone strap fits over thick wetsuits"
    ],
    variants: [
      { name: "Color", options: ["Hydro Blue", "Stealth Grey"] }
    ],
    stock: 44,
    related: ["we-03", "we-01", "we-02"]
  },
  {
    id: "we-07",
    name: "Halo Smart Sleep Eye Mask",
    brand: "Halo",
    category: "Wearables",
    price: 79.99,
    salePrice: 69.99,
    onSale: true,
    rating: 4.3,
    reviewCount: 154,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80"
    ],
    description: "Ergonomic blackout mask equipped with active noise-cancelling sleeping sounds and soft EEG brainwave sensors.",
    specs: {
      "Material": "Ultra-soft silk and slow-rebound memory foam",
      "Battery Life": "Up to 12 hours audio play",
      "Connectivity": "Bluetooth 5.1 LE",
      "Weight": "85 grams"
    },
    features: [
      "Ergonomic 3D eye contour design blocks 100% of light without eye pressure",
      "Brainwave sensors adjust volume downward as you drift to sleep",
      "Smart alarm mimics sunrises through soft internal blue light panels",
      "Whisper-flat speakers are removable to machine wash the mask"
    ],
    variants: [
      { name: "Color", options: ["Nouveau Navy", "Muted Lavender"] }
    ],
    stock: 60,
    related: ["we-02", "au-06", "sh-06"]
  },

  // --- Category: Gaming (22-28) ---
  {
    id: "ga-01",
    name: "Apex Mechanical Keyboard Pro",
    brand: "Apex",
    category: "Gaming",
    price: 189.99,
    salePrice: 159.99,
    onSale: true,
    rating: 4.9,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=800&q=80"
    ],
    description: "Performance-tuned gaming keyboard with custom mechanical hot-swappable switches, per-key RGB backlighting, and a solid aluminum top case.",
    specs: {
      "Switch Type": "Apex Linear Red Switches (hot-swappable 3/5-pin)",
      "Form Factor": "Tenkeyless (TKL) compact layout",
      "Keycaps": "Double-shot PBT keycaps with translucent legends",
      "Connection": "USB-C detachable braided cable, 8000Hz polling rate"
    },
    features: [
      "Magnetic leatherette wrist rest with custom angle locks",
      "Tactile programmable volume roller and media buttons",
      "Sound-dampening dual silicon layers for satisfying clacks",
      "Compatible with Apex Engine customization hub software"
    ],
    variants: [
      { name: "Switches", options: ["Linear Red", "Tactile Brown", "Clicky Blue"] }
    ],
    stock: 40,
    related: ["ga-02", "ga-03", "ca-01"]
  },
  {
    id: "ga-02",
    name: "Apex Precision Gaming Mouse",
    brand: "Apex",
    category: "Gaming",
    price: 89.99,
    salePrice: 89.99,
    onSale: false,
    rating: 4.8,
    reviewCount: 689,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3290447001?w=800&q=80"
    ],
    description: "Ultra-lightweight gaming mouse weighing only 58g. Features high-accuracy optical tracking sensors and optical mouse clicks.",
    specs: {
      "Sensor": "Apex Focus 30K DPI Optical Sensor",
      "Weight": "58 grams (excluding cable)",
      "Battery Life": "Up to 90 hours on lag-free 2.4Ghz wireless",
      "Clicks Life": "Rated for 90 Million clicks"
    },
    features: [
      "Zero-latency wireless technology with included USB extender",
      "100% PTFE mouse feet glide smoothly across gaming mats",
      "6 fully programmable macros and dpi toggles on-board",
      "Ergonomic asymmetrical right-hand grip layout"
    ],
    variants: [
      { name: "Color", options: ["Matte Black", "White Frost"] }
    ],
    stock: 85,
    related: ["ga-01", "ga-03", "ca-05"]
  },
  {
    id: "ga-03",
    name: "Spectre Wireless Gaming Headset",
    brand: "Spectre",
    category: "Gaming",
    price: 159.99,
    salePrice: 129.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 420,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&q=80"
    ],
    description: "Immersive 7.1 surround sound gaming headset with retractable noise-cancelling microphone and dual-channel wireless connectivity.",
    specs: {
      "Sound Format": "7.1 Virtual Surround Sound, Tempest 3D Audio",
      "Battery Life": "Up to 40 hours wireless gameplay",
      "Microphone": "Retractable cardiod mic with active ambient cancellation",
      "Drivers": "50mm high density titanium-coated drivers"
    },
    features: [
      "Dual Wireless connects 2.4Ghz (console) and Bluetooth (phone) simultaneously",
      "Cooling-gel infused ear cups prevent heat build-up",
      "On-ear game/chat audio balancer wheel",
      "Robust steel headband core for durability"
    ],
    variants: [
      { name: "Compatibility", options: ["PC/PlayStation", "Xbox/PC"] }
    ],
    stock: 62,
    related: ["ga-01", "ga-02", "au-01"]
  },
  {
    id: "ga-04",
    name: "Zenith Curved Gaming Monitor 34\"",
    brand: "Zenith",
    category: "Gaming",
    price: 549.99,
    salePrice: 479.99,
    onSale: true,
    rating: 4.7,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&q=80"
    ],
    description: "34-inch ultrawide curved monitor with 165Hz refresh rate, 1ms response time, and HDR400 for stunning gaming landscapes.",
    specs: {
      "Panel Size & Curve": "34-inch UWQHD (3440 x 1440) / 1500R Curve",
      "Refresh Rate & Response": "165Hz / 1ms MPRT",
      "Sync Technology": "AMD FreeSync Premium, G-Sync Compatible",
      "Ports": "2x HDMI 2.0, 2x DisplayPort 1.4, USB Hub"
    },
    features: [
      "21:9 Ultrawide screen increases field of view by 30%",
      "Vibrant display with 95% DCI-P3 cinematic color spectrum coverage",
      "Height, tilt, and swivel adjustable base stand with custom styling",
      "Ambient RGB halo glow backlighting matches display average colors"
    ],
    variants: [
      { name: "Panel Type", options: ["VA Curved", "IPS Flat (+ $120)"] }
    ],
    stock: 12,
    related: ["ga-01", "ca-01", "ca-04"]
  },
  {
    id: "ga-05",
    name: "Apex Ergonomic Gaming Chair Pro",
    brand: "Apex",
    category: "Gaming",
    price: 349.99,
    salePrice: 349.99,
    onSale: false,
    rating: 4.5,
    reviewCount: 184,
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
    ],
    description: "Ergonomically sculpted gaming seat with lumbar arch support, 4D adjustable armrests, and breathable hybrid leatherette material.",
    specs: {
      "Frame Material": "Reinforced carbon steel alloy",
      "Recline Angle": "90 to 155 degrees locking",
      "Gas Lift Class": "Class 4 heavy-duty cylinder",
      "Weight Capacity": "Up to 300 lbs"
    },
    features: [
      "Memory foam neck pillow and cooling gel lumbar support pillow included",
      "Multi-tilt mechanism allows locked tilting angles",
      "Breathable faux leather doesn't stick during long marathon gaming loops",
      "Whisper-glide PU casters roll smoothly across hard floors and carpets"
    ],
    variants: [
      { name: "Accent Color", options: ["Stealth Black", "Electric Blue", "Cyberpunk Yellow"] }
    ],
    stock: 10,
    related: ["ga-01", "ga-04", "ga-06"]
  },
  {
    id: "ga-06",
    name: "Spectre Mobile Controller Grip",
    brand: "Spectre",
    category: "Gaming",
    price: 99.99,
    salePrice: 89.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 114,
    images: [
      "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=800&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3290447001?w=800&q=80"
    ],
    description: "Transforms your iOS or Android phone into a high-end mobile console with responsive analog sticks and tactile trigger inputs.",
    specs: {
      "Connection": "Direct USB-C / Lightning port for zero-latency input",
      "Power": "Pass-through charging phone socket, no battery to recharge",
      "Compatible Phones": "From 4.7-inch up to 6.9-inch length",
      "Headphone Jack": "3.5mm headphone socket built-in"
    },
    features: [
      "Console-grade thumbsticks with click buttons (L3/R3)",
      "Dedicated screenshot capture key and game hub launcher button",
      "Collapsible pocket-sized design for commuting convenience",
      "Tactile responsive D-pad layout for fighting games"
    ],
    variants: [
      { name: "Connector Type", options: ["USB-C", "Lightning"] }
    ],
    stock: 50,
    related: ["ga-03", "mo-01", "ch-02"]
  },
  {
    id: "ga-07",
    name: "Zenith RGB Desk Pad XL",
    brand: "Zenith",
    category: "Gaming",
    price: 39.99,
    salePrice: 34.99,
    onSale: true,
    rating: 4.4,
    reviewCount: 302,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"
    ],
    description: "Massive micro-woven fabric desk mat with integrated RGB fiber optic lighting tubes lining the outer stitching edge.",
    specs: {
      "Dimensions": "35.4 x 15.7 x 0.16 inches (900 x 400 x 4mm)",
      "Surface Material": "Ultra-smooth micro-textured fabric",
      "Power Connection": "Detachable Micro-USB cable",
      "Modes": "12 built-in lighting presets (colors & breathing cycles)"
    },
    features: [
      "Anti-slip natural rubber bottom holds desk pad securely in place",
      "Water-repellent coating makes spilled liquid wipe clean easily",
      "Flat tactile button on power brick changes colors on-the-fly",
      "Spacious size easily accommodates mechanical keyboards, mice, and accessories"
    ],
    variants: [
      { name: "Stitch Theme", options: ["Cyber Grid", "Minimalist White"] }
    ],
    stock: 140,
    related: ["ga-01", "ga-02", "ca-01"]
  },

  // --- Category: Mobile Accessories (29-34) ---
  {
    id: "mo-01",
    name: "Flexi MagSafe Carbon Case",
    brand: "Flexi",
    category: "Mobile Accessories",
    price: 49.99,
    salePrice: 39.99,
    onSale: true,
    rating: 4.7,
    reviewCount: 382,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"
    ],
    description: "Genuine aramid carbon fiber case with embedded strong MagSafe magnets, giving slim 1mm drop protection.",
    specs: {
      "Material": "1500D Aramid Carbon Fiber",
      "Thickness": "1.05 mm ultra-thin",
      "Magnet Strength": "1200g holding capacity (compatible with MagSafe accessory lines)",
      "Weight": "18 grams"
    },
    features: [
      "Military-grade scratch resistant and oil repellent coating",
      "Precision CNC cutouts for easy access to ports and buttons",
      "Raised lip borders around camera lenses to prevent scratch contacts",
      "Unique tactile carbon texture improves grip hold"
    ],
    variants: [
      { name: "Device Model", options: ["iPhone 15 Pro", "iPhone 15 Pro Max", "Galaxy S24 Ultra"] }
    ],
    stock: 200,
    related: ["mo-02", "ch-01", "ch-04"]
  },
  {
    id: "mo-02",
    name: "Shield 3D Screen Protector Glass",
    brand: "Shield",
    category: "Mobile Accessories",
    price: 24.99,
    salePrice: 24.99,
    onSale: false,
    rating: 4.5,
    reviewCount: 940,
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"
    ],
    description: "9H hardness tempered glass screen protector with an easy-installation alignment frame, blocking oil fingerprints.",
    specs: {
      "Hardness Class": "9H Tempered Glass",
      "Edge Shape": "3D Curved Bevel edges",
      "Clarity Rating": "99.9% transparency rating",
      "Coating": "Hydrophobic & Oleophobic anti-smudge layer"
    },
    features: [
      "Auto-alignment tray guarantees bubbles-free perfect installation",
      "High touch-sensitivity registers every swipe & fingerprint unlock",
      "Shatter-proof membrane holds glass shards together if broken",
      "Fully compatible with most phone case brands"
    ],
    variants: [
      { name: "Device Model", options: ["iPhone 15 Pro", "iPhone 15 Pro Max", "Galaxy S24 Ultra"] }
    ],
    stock: 350,
    related: ["mo-01", "mo-03", "ch-01"]
  },
  {
    id: "mo-03",
    name: "Grip MagSafe Ring Kickstand",
    brand: "Grip",
    category: "Mobile Accessories",
    price: 29.99,
    salePrice: 24.99,
    onSale: true,
    rating: 4.4,
    reviewCount: 215,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
    ],
    description: "Strong magnetic phone grip that snaps to the back of your MagSafe phone, folding out into an adjustable kickstand.",
    specs: {
      "Material": "Zinc alloy, neodymium magnets",
      "Rotation": "360-degree rotating grip ring",
      "Max Kickstand Angle": "125 degrees",
      "Thickness": "Just 4.5mm when folded flat"
    },
    features: [
      "Premium magnetic hold supports up to 4 times the weight of your phone",
      "Enables secure one-handed holding during photography sessions",
      "Adjusts to portrait or landscape orientations easily",
      "Does not block wireless chargers when detached"
    ],
    variants: [
      { name: "Color", options: ["Gunmetal Grey", "Rose Quartz", "Silver Chrome"] }
    ],
    stock: 180,
    related: ["mo-01", "ch-01", "mo-03"]
  },
  {
    id: "mo-04",
    name: "Grip Smartphone Gimbal Stabilizer",
    brand: "Grip",
    category: "Mobile Accessories",
    price: 139.99,
    salePrice: 119.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 140,
    images: [
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
    ],
    description: "3-axis handheld phone stabilizer with active object tracking, built-in extension rod, and companion video editing app.",
    specs: {
      "Stabilization": "3-Axis motor correction",
      "Battery Life": "Up to 8 hours active use",
      "Extension Rod Length": "8.5 inches maximum",
      "Weight Capacity": "Payloads up to 280g"
    },
    features: [
      "SmartTrack AI locks onto faces and targets automatically",
      "Foldable travel-friendly design fits in pockets easily",
      "Side wheel controls zoom, pan speed, and focus levels",
      "Includes mini tripod attachment and storage pouch"
    ],
    variants: [
      { name: "Kit Bundle", options: ["Standard", "Creator Kit (Includes Fill Light) (+ $30)"] }
    ],
    stock: 45,
    related: ["mo-01", "ch-02", "we-01"]
  },
  {
    id: "mo-05",
    name: "Flexi Waterproof Phone Pouch",
    brand: "Flexi",
    category: "Mobile Accessories",
    price: 19.99,
    salePrice: 19.99,
    onSale: false,
    rating: 4.3,
    reviewCount: 228,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80"
    ],
    description: "IPX8 certified underwater phone case with clear touch-through windows, perfect for swimming, beach, and rafting.",
    specs: {
      "Waterproofing Class": "IPX8 certified up to 30 meters depth",
      "Material": "Thermoplastic Polyurethane (TPU)",
      "Lanyard Length": "18.5 inches adjustable neck strap",
      "Max Device Size": "Fits screens up to 7.0 inches diagonal"
    },
    features: [
      "Scratch-resistant TPU allows crystal clear photo taking underwater",
      "Highly responsive touch screen functionality registers swipes easily",
      "Dual snap-lock seals with secure closure indicators",
      "Built-in air cushion makes the pouch float in water"
    ],
    variants: [
      { name: "Color", options: ["Neon Lime", "Midnight Black", "Clear Blue"] }
    ],
    stock: 300,
    related: ["mo-01", "mo-04", "au-04"]
  },

  // --- Category: Charging (35-40) ---
  {
    id: "ch-01",
    name: "Volt 3-in-1 MagSafe Charging Stand",
    brand: "Volt",
    category: "Charging",
    price: 129.99,
    salePrice: 109.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 520,
    images: [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
    ],
    description: "Frosted-glass desktop charging hub that delivers fast wireless power to your phone, smartwatch, and earbuds simultaneously.",
    specs: {
      "Input": "30W USB-C PD Adapter (included)",
      "Wireless Output": "15W Phone MagSafe, 5W Watch Charging, 5W Buds charging",
      "Materials": "Aircraft-grade aluminum, tempered glass plate",
      "Compatibility": "iPhone 12-15 Series, Apple Watch Series 1-9, Qi-enabled earbuds"
    },
    features: [
      "Official MagSafe module provides fast 15W charging alignment",
      "Charges phone in both landscape (StandBy mode) and portrait",
      "Weighted anti-slip base allows one-handed phone detachment",
      "Subtle ambient base glow toggled with touch buttons"
    ],
    variants: [
      { name: "Finish", options: ["Piano Black", "Alabaster White"] }
    ],
    stock: 75,
    related: ["mo-01", "mo-03", "ch-03"]
  },
  {
    id: "ch-02",
    name: "GaNForce 100W Travel Charger",
    brand: "GaNForce",
    category: "Charging",
    price: 79.99,
    salePrice: 59.99,
    onSale: true,
    rating: 4.9,
    reviewCount: 412,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80"
    ],
    description: "Compact multi-port GaN power brick capable of charging a MacBook Pro, phone, and tablet all at the same time.",
    specs: {
      "Technology": "Gallium Nitride (GaN III) Technology",
      "Ports": "3x USB-C (Power Delivery 3.0), 1x USB-A (QuickCharge 4+)",
      "Max Power Output": "100W Total (Smart Power Allocation)",
      "Plugs": "Foldable US pins, includes EU/UK travel adapters"
    },
    features: [
      "35% smaller than standard silicon 96W laptop chargers",
      "Over-temperature and over-voltage protection controllers",
      "Intelligent power distribution allocates watts dynamically",
      "Includes a premium 6ft 100W e-marked braided USB-C cable"
    ],
    variants: [
      { name: "Color", options: ["Carbon Black", "Polar White"] }
    ],
    stock: 120,
    related: ["ch-01", "ch-04", "ca-03"]
  },
  {
    id: "ch-03",
    name: "Juice Magnetic Power Bank 10K",
    brand: "Juice",
    category: "Charging",
    price: 59.99,
    salePrice: 49.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 290,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80"
    ],
    description: "10,000mAh magnetic portable charger with built-in metal ring kickstand and convenient digital battery indicator display screen.",
    specs: {
      "Capacity": "10,000 mAh / 37Wh",
      "Wireless Output": "7.5W / 10W / 15W Max Qi charging",
      "Wired Output/Input": "USB-C PD 20W input & output",
      "Screen Type": "Mini LED display showing exact charge percentage"
    },
    features: [
      "Snaps directly to MagSafe cases or phones for wire-free portability",
      "Pass-through charging enables charging your phone while recharging the bank",
      "Built-in fold-out metal kickstand supports phone viewing angles",
      "Super compact layout slips easily inside jeans pockets"
    ],
    variants: [
      { name: "Color", options: ["Matte Gray", "Sage Green", "Iris Purple"] }
    ],
    stock: 98,
    related: ["mo-01", "ch-01", "mo-03"]
  },
  {
    id: "ch-04",
    name: "Volt Braided USB-C Cable (6.6ft)",
    brand: "Volt",
    category: "Charging",
    price: 19.99,
    salePrice: 19.99,
    onSale: false,
    rating: 4.7,
    reviewCount: 810,
    images: [
      "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80"
    ],
    description: "Highly durable double-braided nylon charging cable supporting 240W Power Delivery and high-speed data transfers.",
    specs: {
      "Max Power Capacity": "240W (48V/5A) Power Delivery 3.1",
      "Data Transfer Rate": "480 Mbps USB 2.0 specs",
      "Length": "6.6 feet (2 meters)",
      "Materials": "Anodized aluminum housings, double-braided nylon sheath"
    },
    features: [
      "Lab-tested to withstand over 30,000 bends and twists",
      "Integrated E-Marker chip protects battery health charging loops",
      "Includes structured leather organizing cable strap",
      "Reinforced stress relief points at connectors prevent fraying"
    ],
    variants: [
      { name: "Length", options: ["3.3ft", "6.6ft", "10ft"] }
    ],
    stock: 500,
    related: ["ch-02", "ch-01", "ca-03"]
  },
  {
    id: "ch-05",
    name: "Juice Solar Portable Power Station",
    brand: "Juice",
    category: "Charging",
    price: 299.99,
    salePrice: 249.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 45,
    images: [
      "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=800&q=80",
      "https://images.unsplash.com/photo-1585338111557-140029083d9e?w=800&q=80"
    ],
    description: "High-capacity 300W portable power generator with AC outlets, USB-C ports, and optional solar panel charging input, ideal for camping.",
    specs: {
      "Battery Capacity": "296Wh (80,000mAh at 3.7V)",
      "Output Ports": "2x 110V AC Outlets, 2x USB-C (60W PD), 2x USB-A, 1x 12V Car outlet",
      "Recharge Time": "4 hours via wall outlet or 6 hours via solar (100W panel input)",
      "Weight": "7.5 lbs with carrying handle"
    },
    features: [
      "Pure sine wave AC inverter protects sensitive electronics (laptops, audio gears)",
      "Built-in bright LED light panel with SOS flashing modes",
      "LCD info display tracks wattage input/output and remaining battery level",
      "Silent cooling fan system keeps internals working safely"
    ],
    variants: [
      { name: "Panel Bundle", options: ["Without Solar Panel", "With 100W Folding Solar Panel (+ $150)"] }
    ],
    stock: 15,
    related: ["ch-02", "ch-03", "au-04"]
  },

  // --- Category: Computer Accessories (41-46) ---
  {
    id: "ca-01",
    name: "KeyFlow Wireless Mechanical Keyboard",
    brand: "KeyFlow",
    category: "Computer Accessories",
    price: 149.99,
    salePrice: 129.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 389,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"
    ],
    description: "Premium, ultra-low profile wireless keyboard with clicky tactile mechanical switches, tailored for productive office workflows.",
    specs: {
      "Switch Type": "Gateron Low-Profile Brown (pre-lubed)",
      "Layout": "75% compact format (84 keys)",
      "Connectivity": "Bluetooth 5.1 (up to 3 devices), 2.4Ghz wireless, USB-C",
      "Battery Life": "Up to 150 hours (backlight off) rechargeable"
    },
    features: [
      "Premium anodized aluminum frame structure with low wrist-strain tilt",
      "Smart backlighting automatically turns on when hands approach keys",
      "Hot-swap keys easily swap layouts between macOS and Windows keys",
      "Whisper quiet tactile clicks won't disrupt coworkers"
    ],
    variants: [
      { name: "Color", options: ["Space Gray", "Silver Birch"] }
    ],
    stock: 45,
    related: ["ca-02", "ca-03", "ga-01"]
  },
  {
    id: "ca-02",
    name: "Optix Ultra-Clear 4K Webcam",
    brand: "Optix",
    category: "Computer Accessories",
    price: 119.99,
    salePrice: 99.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 220,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
    ],
    description: "4K ultra-high-definition webcam with advanced auto-focus tracking, dual noise-reducing microphones, and a physical privacy slider.",
    specs: {
      "Resolution / FPS": "4K Ultra HD at 30fps / 1080p at 60fps",
      "Lens Type": "All-glass wide angle lens, adjustable FOV (65/78/90 degrees)",
      "Auto Focus": "AI tracking auto-focus & exposure balance",
      "Connection": "USB-C plug-and-play with detachable 5ft cable"
    },
    features: [
      "High Dynamic Range (HDR) ensures clear lighting even in back-lit rooms",
      "Physical built-in privacy shield blocks camera lens with one slide",
      "Dual integrated omnidirectional microphones pick up clean voice",
      "Fully compatible with Zoom, Teams, Skype, and OBS Stream studio tools"
    ],
    variants: [
      { name: "Mounting Style", options: ["Standard Monitor Clip", "With Mini Tripod Bundle (+ $15)"] }
    ],
    stock: 70,
    related: ["ca-03", "au-07", "ca-04"]
  },
  {
    id: "ca-03",
    name: "LinkHub 8-in-1 USB-C Dock",
    brand: "LinkHub",
    category: "Computer Accessories",
    price: 89.99,
    salePrice: 79.99,
    onSale: true,
    rating: 4.7,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80",
      "https://images.unsplash.com/photo-1622445262465-2481c8573290?w=800&q=80"
    ],
    description: "Premium aluminum hub that expands one USB-C port into HDMI 4K, ethernet, SD card slots, and USB power sockets.",
    specs: {
      "Output Interfaces": "1x HDMI 4K 60Hz, 1x Gigabit Ethernet, 2x USB-A 3.2, 1x USB-C Data, SD/MicroSD Card slots, 1x USB-C PD input",
      "Power Delivery In": "Supports up to 100W PD input, 85W safe charging to laptop",
      "Material": "Anodized aircraft aluminum chassis",
      "Data Transfer Rate": "Up to 10 Gbps speeds via USB 3.2 ports"
    },
    features: [
      "Precision-milled aluminum chassis dissipates heat efficiently",
      "Supports 4K 60Hz output for silky-smooth screen mirror extensions",
      "Gigabit Ethernet delivers stable wired internet connections for video loops",
      "Extremely lightweight pocket-sized adapter layout"
    ],
    variants: [
      { name: "Chassis Color", options: ["Space Gray", "Carbon Black"] }
    ],
    stock: 110,
    related: ["ch-02", "ca-01", "ca-05"]
  },
  {
    id: "ca-04",
    name: "Optix Dual Arm Desk Monitor Mount",
    brand: "Optix",
    category: "Computer Accessories",
    price: 109.99,
    salePrice: 89.99,
    onSale: true,
    rating: 4.5,
    reviewCount: 178,
    images: [
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80",
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&q=80"
    ],
    description: "Heavy-duty dual monitor gas-spring arm mount that clamps to desks, allowing full tilt, swivel, and height adjustments.",
    specs: {
      "Supported Screens": "Fits two monitors from 17\" to 32\" size",
      "Weight Capacity": "Holds up to 19.8 lbs per arm",
      "VESA Standard compatibility": "75x75mm and 100x100mm mounting holes",
      "Mounting options": "Desk Edge C-clamp or Grommet hole mount"
    },
    features: [
      "Smooth gas spring counterbalances screen weights for effortless adjustment",
      "Integrates hidden routing clips to manage cable clutter along arms",
      "Rotates 360-degrees, allowing horizontal or vertical screen displays",
      "Premium steel and heavy-alloy construction"
    ],
    variants: [
      { name: "Finish", options: ["Matte Black", "White Gloss"] }
    ],
    stock: 35,
    related: ["ga-04", "ca-01", "ca-03"]
  },
  {
    id: "ca-05",
    name: "KeyFlow Ergonomic Wireless Mouse",
    brand: "KeyFlow",
    category: "Computer Accessories",
    price: 79.99,
    salePrice: 79.99,
    onSale: false,
    rating: 4.6,
    reviewCount: 342,
    images: [
      "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=800&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80"
    ],
    description: "Sculpted vertical mouse designed to reduce muscle strain, featuring customizable hotkeys and a smooth scroll wheel.",
    specs: {
      "Ergonomic Angle": "57-degree vertical tilt for natural handshake grip",
      "DPI Sensor": "High-accuracy adjustable tracking sensor (400 to 4000 DPI)",
      "Battery": "Rechargeable Li-Po (500 mAh, lasts up to 4 months per charge)",
      "Connectivity": "Bluetooth + USB wireless receiver"
    },
    features: [
      "Natural handshake posture reduces wrist pressure and forearm strain",
      "Smart-speed scroll wheel shifts automatically from click-to-click to fast scroll",
      "Dual thumb buttons customizable for back/forward web browsing loops",
      "Comfortable textured rubber thumb rest zone layout"
    ],
    variants: [
      { name: "Hand Orientation", options: ["Right-Handed", "Left-Handed"] }
    ],
    stock: 55,
    related: ["ca-01", "ca-03", "ga-02"]
  },

  // --- Category: Lifestyle Tech (47-52) ---
  {
    id: "li-01",
    name: "Nebula 4K Pocket Projector",
    brand: "Nebula",
    category: "Lifestyle Tech",
    price: 699.99,
    salePrice: 599.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 198,
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80"
    ],
    description: "Compact smart projector that casts bright 150-inch cinematic displays. Equipped with built-in Android TV streaming and stereo speakers.",
    specs: {
      "Resolution / Brightness": "4K UHD Output, 800 ANSI Lumens",
      "Display Technology": "DLP display engine with HDR10 processing",
      "Projection Screen Size": "From 40 inches to 150 inches screen diagonal",
      "Battery": "15,000mAh built-in battery (lasts up to 2.5 hours video play)"
    },
    features: [
      "Auto keystone correction and fast auto-focus adjustments in 1 second",
      "Built-in streaming apps (YouTube, Netflix, Prime Video, Disney+)",
      "Doubles as a standalone premium 10W Bluetooth stereo speaker",
      "HDMI, USB, and wireless AirPlay/Chromecast screencasting inputs"
    ],
    variants: [
      { name: "Stand Option", options: ["Standard Base", "With Adjustable Travel Tripod (+ $49)"] }
    ],
    stock: 15,
    related: ["au-03", "sh-02", "ch-05"]
  },
  {
    id: "li-02",
    name: "Aero Smart Camera Drone",
    brand: "Aero",
    category: "Lifestyle Tech",
    price: 499.99,
    salePrice: 499.99,
    onSale: false,
    rating: 4.7,
    reviewCount: 143,
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80"
    ],
    description: "Lightweight folding drone featuring 4K video capturing, 3-axis gimbal stabilizing, and automated smart return flight paths.",
    specs: {
      "Weight": "249 grams (no FAA license required in many zones)",
      "Flight Time": "Up to 31 minutes per battery pack",
      "Max Range": "6.2 miles HD Video transmission distance",
      "Video Quality": "4K video at 30fps / 12MP photo sensor"
    },
    features: [
      "3-axis mechanical gimbal stabilization guarantees smooth cinematic shots",
      "Smart Flight GPS tracking automatically triggers return to home when battery gets low",
      "One-click cinematic presets (QuickShot, Helix, Rocket, Boomerang loops)",
      "Wind resistance up to Level 5 (24 mph winds)"
    ],
    variants: [
      { name: "Fly More Combo", options: ["Standard Single Battery", "Fly More Combo (Includes 3 Batteries, Charging Hub, Bag) (+ $120)"] }
    ],
    stock: 20,
    related: ["li-01", "mo-04", "ch-05"]
  },
  {
    id: "li-03",
    name: "H2O Smart Drink Reminder Bottle",
    brand: "H2O",
    category: "Lifestyle Tech",
    price: 59.99,
    salePrice: 49.99,
    onSale: true,
    rating: 4.4,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    description: "Double-walled vacuum insulated bottle that tracks hydration levels, alerts you to drink, and sanitizes water with a built-in UV-C lid.",
    specs: {
      "Capacity": "20 oz (600 ml)",
      "Materials": "Food-grade stainless steel, BPA-free plastic lid",
      "Sanitizing Cycle": "UV-C light kills 99.9% of bacteria in 60 seconds",
      "Battery Life": "Up to 30 days per charge (micro-USB)"
    },
    features: [
      "LED base ring glows to remind you when it's time to drink water",
      "Deep UV-C LED self-cleans bottle interiors and purifies water",
      "Keeps water ice-cold for 24 hours or hot for 12 hours",
      "Syncs daily drinking logs with Apple Health and Google Fit apps"
    ],
    variants: [
      { name: "Color", options: ["Aqua Blue", "Stone Grey", "Orchid Purple"] }
    ],
    stock: 90,
    related: ["we-01", "we-03", "sh-06"]
  },
  {
    id: "li-04",
    name: "Aero Self-Heating Smart Mug 2",
    brand: "Aero",
    category: "Lifestyle Tech",
    price: 129.99,
    salePrice: 129.99,
    onSale: false,
    rating: 4.5,
    reviewCount: 154,
    images: [
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    description: "Keep your coffee or tea at the perfect drinking temperature from the first sip to the last. Controlled via companion app.",
    specs: {
      "Capacity": "10 oz / 14 oz sizes",
      "Temperature Range": "120°F - 145°F (50°C - 62.5°C)",
      "Battery Life": "Up to 80 minutes continuous heat, or all day on coaster",
      "Materials": "Stainless steel core, durable scratch-resistant ceramic coating"
    },
    features: [
      "Maintains your precise preferred beverage drinking temperature",
      "Enters sleep mode automatically when empty or after 2 hours of inactivity",
      "Includes a sleek plug-in desktop heating coaster plate",
      "IPX7 certified waterproof enables hand washing safely"
    ],
    variants: [
      { name: "Size", options: ["10 oz", "14 oz (+ $20)"] },
      { name: "Color", options: ["Black Noir", "Alabaster White", "Rose Quartz"] }
    ],
    stock: 65,
    related: ["li-03", "sh-01", "ca-01"]
  },
  {
    id: "li-05",
    name: "Nebula Digital Smart Photo Frame",
    brand: "Nebula",
    category: "Lifestyle Tech",
    price: 149.99,
    salePrice: 119.99,
    onSale: true,
    rating: 4.6,
    reviewCount: 184,
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80"
    ],
    description: "10.1-inch high-resolution digital photo frame that lets you instantly share memories from anywhere using Wi-Fi.",
    specs: {
      "Display": "10.1-inch IPS Touchscreen display (1280x800 resolution)",
      "Storage": "32GB on-board (holds over 20,000 photos)",
      "Connectivity": "Wi-Fi (2.4Ghz), FrameLink App (iOS/Android)",
      "Orientation": "Auto-rotates for landscape or portrait placement"
    },
    features: [
      "Instant photo and short video sharing from multiple family members' smartphones",
      "Add captions and custom messages directly to photos",
      "Smart sleep sensor shuts down display automatically when room is dark",
      "Can mount on walls or sit stand-alone on tables"
    ],
    variants: [
      { name: "Frame Material", options: ["Modern Charcoal Glass", "Classic Walnut Wood (+ $20)"] }
    ],
    stock: 48,
    related: ["li-01", "sh-02", "sh-04"]
  },
  {
    id: "li-06",
    name: "H2O Smart Garden Hydroponic Set",
    brand: "H2O",
    category: "Lifestyle Tech",
    price: 189.99,
    salePrice: 159.99,
    onSale: true,
    rating: 4.8,
    reviewCount: 104,
    images: [
      "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=800&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
    ],
    description: "Grow fresh herbs and vegetables indoors all year round. Self-watering system with dynamic LED grow lights.",
    specs: {
      "Capacity": "Up to 6 herb pods simultaneously",
      "Light System": "24W full spectrum LED Grow Lights with automated timer",
      "Water Tank Size": "2.5 Liters water capacity with pump",
      "Material": "Eco-friendly ABS plastic, aluminum grow post"
    },
    features: [
      "High-efficiency LED grow lights mimic natural sunlight cycles for fast growth",
      "Self-watering system alerts you when water levels or nutrients get low",
      "Grow rod height adjusts up to 12 inches as plants grow tall",
      "Includes non-GMO starter seed kit (Basil, Parsley, Dill, Mint)"
    ],
    variants: [
      { name: "Seed Kit Choice", options: ["Fresh Herbs Starter", "Salad Greens Pack"] }
    ],
    stock: 22,
    related: ["sh-01", "sh-04", "li-03"]
  }
];
