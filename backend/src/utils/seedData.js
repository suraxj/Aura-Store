import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Wishlist from '../models/Wishlist.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Clearing existing database collections...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Wishlist.deleteMany({});

    console.log('[Seed] Creating demo users...');
    const adminUser = await User.create({
      name: 'Aura Admin',
      email: 'admin@aura.com',
      password: 'password123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      addresses: [{
        fullName: 'Aura HQ Admin',
        phone: '9876543210',
        houseNo: 'Suite 500, Innovation Tower',
        street: 'Cyber City Expressway',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100',
        country: 'India',
        addressType: 'Work',
        isDefault: true
      }]
    });

    const demoUser = await User.create({
      name: 'John Doe',
      email: 'user@aura.com',
      password: 'password123',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      addresses: [{
        fullName: 'John Doe',
        phone: '9123456789',
        houseNo: 'Flat 402, Sunshine Apartments',
        street: 'MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India',
        addressType: 'Home',
        isDefault: true
      }]
    });

    console.log('[Seed] Creating categories...');
    const categoriesData = [
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Next-gen smart devices, audio gear, and cutting-edge laptops.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        subCategories: ['Headphones', 'Smartwatches', 'Laptops', 'Audio']
      },
      {
        name: 'Fashion & Apparel',
        slug: 'fashion',
        description: 'Modern luxury streetwear, designer jackets, and urban fits.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
        subCategories: ['Jackets', 'Sneakers', 'Streetwear', 'Accessories']
      },
      {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Minimalist interior décor, smart home ambient lighting & comfort.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
        subCategories: ['Lighting', 'Furniture', 'Decor', 'Kitchen']
      },
      {
        name: 'Fitness & Gear',
        slug: 'fitness',
        description: 'High-performance athletic gear, recovery tools, and tech accessories.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
        subCategories: ['Smart Trainers', 'Yoga & Mat', 'Wearables']
      }
    ];

    const insertedCategories = await Category.insertMany(categoriesData);
    const categoryMap = {};
    insertedCategories.forEach(c => { categoryMap[c.slug] = c._id; });

    console.log('[Seed] Creating products...');
    const productsData = [
      {
        name: 'Aura SoundX Wireless Noise-Canceling Headphones',
        slug: 'aura-soundx-wireless-noise-canceling-headphones',
        description: 'Experience studio-grade high-fidelity audio with active noise cancellation, custom 40mm beryllium drivers, and 40-hour ultra battery life.',
        shortDescription: 'Studio-grade ANC wireless headphones with 40h battery life.',
        price: 14999,
        discountPrice: 11999,
        category: categoryMap['electronics'],
        subCategory: 'Headphones',
        brand: 'Aura Sound',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 25,
        sku: 'AUR-HD-001',
        specifications: [
          { key: 'Driver Unit', value: '40mm Beryllium' },
          { key: 'Connectivity', value: 'Bluetooth 5.3 / 3.5mm Aux' },
          { key: 'Battery Life', value: 'Up to 40 Hours' },
          { key: 'Weight', value: '250g' }
        ],
        features: ['Active Noise Cancellation', 'Multipoint Connection', 'Fast Charging (10 min = 5 hrs)'],
        rating: 4.8,
        numReviews: 34,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Chronos Ultra OLED Smartwatch Pro',
        slug: 'chronos-ultra-oled-smartwatch-pro',
        description: 'Aerospace-grade titanium alloy chassis featuring crisp 1.95-inch AMOLED display, dual-frequency GPS, and continuous health tracking.',
        shortDescription: 'Titanium smartwatch with AMOLED display and dual-frequency GPS.',
        price: 24999,
        discountPrice: 19999,
        category: categoryMap['electronics'],
        subCategory: 'Smartwatches',
        brand: 'Chronos',
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 18,
        sku: 'CHR-SW-002',
        specifications: [
          { key: 'Display', value: '1.95" AMOLED 1000 nits' },
          { key: 'Case Material', value: 'Grade 5 Titanium' },
          { key: 'Water Resistance', value: '10 ATM (100m)' }
        ],
        features: ['ECG Heart Monitor', 'SpO2 Sensor', '7-Day Battery Life'],
        rating: 4.9,
        numReviews: 52,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Vortex Mechanical Gaming Keyboard RGB',
        slug: 'vortex-mechanical-gaming-keyboard-rgb',
        description: 'Custom hot-swappable mechanical switches, per-key RGB illumination, aircraft-grade aluminum top plate, and sound-dampening gasket mount.',
        shortDescription: 'Gasket-mounted mechanical RGB keyboard with hot-swappable switches.',
        price: 8999,
        discountPrice: 6999,
        category: categoryMap['electronics'],
        subCategory: 'Audio',
        brand: 'Vortex Tech',
        images: [
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 30,
        sku: 'VOR-KB-003',
        specifications: [
          { key: 'Switch Type', value: 'Linear Custom Switches' },
          { key: 'Backlight', value: '16.8 Million Color RGB' },
          { key: 'Polling Rate', value: '8000Hz' }
        ],
        features: ['Hot-Swappable PCB', 'PBT Double-Shot Keycaps', 'Detachable Type-C Cable'],
        rating: 4.7,
        numReviews: 28,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Nomad Urban Leather Bomber Jacket',
        slug: 'nomad-urban-leather-bomber-jacket',
        description: 'Handcrafted full-grain lambskin leather bomber jacket with silky satin lining, ribbed knit cuffs, and YKK heavy-duty zippers.',
        shortDescription: 'Premium handcrafted lambskin leather bomber jacket.',
        price: 12999,
        discountPrice: 8999,
        category: categoryMap['fashion'],
        subCategory: 'Jackets',
        brand: 'Nomad Luxe',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 12,
        sku: 'NOM-JK-004',
        specifications: [
          { key: 'Material', value: '100% Full-Grain Lambskin' },
          { key: 'Fit', value: 'Tailored Urban Fit' },
          { key: 'Closure', value: 'YKK Brass Zipper' }
        ],
        features: ['Interior Secret Pocket', 'Ribbed Elastic Trim', 'Weather Resistant Finish'],
        rating: 4.6,
        numReviews: 19,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Aether Cloud Step Lightweight Sneakers',
        slug: 'aether-cloud-step-lightweight-sneakers',
        description: 'Engineered breathable knit upper combined with responsive nitrogen-infused foam sole for supreme all-day stride cushioning.',
        shortDescription: 'Ultra-lightweight breathable knit sneakers with energy foam.',
        price: 5999,
        discountPrice: 4499,
        category: categoryMap['fashion'],
        subCategory: 'Sneakers',
        brand: 'Aether Athletics',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 45,
        sku: 'AETH-SN-005',
        specifications: [
          { key: 'Upper Material', value: '3D Weave FlyKnit' },
          { key: 'Midsole', value: 'Nitrogen MicroFoam' },
          { key: 'Weight', value: '190g per shoe' }
        ],
        features: ['Ortholite Ergonomic Insole', 'Anti-Slip Rubber Tread', 'Machine Washable'],
        rating: 4.8,
        numReviews: 61,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Lumina Minimalist Smart Desk Lamp',
        slug: 'lumina-minimalist-smart-desk-lamp',
        description: 'Sleek matte anodized aluminum desk lamp with stepless color temperature adjustment (2700K - 6500K) and built-in 15W Qi wireless charger.',
        shortDescription: 'Smart LED desk lamp with touch slider & 15W wireless charging base.',
        price: 4999,
        discountPrice: 3499,
        category: categoryMap['home-living'],
        subCategory: 'Lighting',
        brand: 'Lumina Home',
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 35,
        sku: 'LUM-LP-006',
        specifications: [
          { key: 'Power Output', value: '12W LED + 15W Wireless Charge' },
          { key: 'Brightness', value: '900 Lumens Peak' },
          { key: 'Color Temp Range', value: '2700K - 6500K' }
        ],
        features: ['Touch Sensitivity Bar', 'Auto-Dimming Ambient Sensor', 'App Controlled'],
        rating: 4.5,
        numReviews: 22,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Velvet Soft Ergonomic Task Chair',
        slug: 'velvet-soft-ergonomic-task-chair',
        description: 'Plush velvet upholstery with memory foam cushioning, lumbar support curve, and silent smooth 360-degree caster wheels.',
        shortDescription: 'Luxury ergonomic velvet desk chair with lumbar support.',
        price: 15999,
        discountPrice: 12999,
        category: categoryMap['home-living'],
        subCategory: 'Furniture',
        brand: 'Lumina Home',
        images: [
          'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 8,
        sku: 'LUM-CH-007',
        specifications: [
          { key: 'Max Capacity', value: '150 kg' },
          { key: 'Base Material', value: 'Polished Chrome Steel' }
        ],
        features: ['Height Adjustable', 'Tilt Recline Control', 'High Density Foam'],
        rating: 4.7,
        numReviews: 15,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Zenith Pro Smart Fitness Massage Gun',
        slug: 'zenith-pro-smart-fitness-massage-gun',
        description: 'QuietGlide brushless motor delivering 3200 RPM deep tissue percussion therapy with 6 specialized ergonomic massage head attachments.',
        shortDescription: 'Deep tissue percussive massage gun with brushless silent motor.',
        price: 7999,
        discountPrice: 4999,
        category: categoryMap['fitness'],
        subCategory: 'Wearables',
        brand: 'Zenith Fit',
        images: [
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 20,
        sku: 'ZEN-MG-008',
        specifications: [
          { key: 'Speed Levels', value: '30 Adjustable Speeds' },
          { key: 'Battery', value: '2600mAh Li-ion (6 hrs)' }
        ],
        features: ['Touchscreen Speed Display', 'Under 45dB Whisper Quiet', 'Hard Carrying Case Included'],
        rating: 4.8,
        numReviews: 43,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Axiom Quantum Portable Projector',
        slug: 'axiom-quantum-portable-projector',
        description: 'Compact 1080p LED projector with auto keystone correction, Wi-Fi casting, and 200-inch max display for cinematic home entertainment.',
        shortDescription: 'Portable 1080p smart projector with Wi-Fi casting.',
        price: 17999,
        discountPrice: 14999,
        category: categoryMap['electronics'],
        subCategory: 'Audio',
        brand: 'Axiom',
        images: [
          'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 24,
        sku: 'AXI-PR-009',
        specifications: [
          { key: 'Resolution', value: '1080p Full HD' },
          { key: 'Brightness', value: '2200 ANSI Lumens' },
          { key: 'Wireless', value: 'Wi-Fi / Bluetooth' }
        ],
        features: ['Smart Casting', 'Bluetooth Speaker', 'Auto Keystone'],
        rating: 4.6,
        numReviews: 27,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Nova Tech Minimal Laptop Backpack',
        slug: 'nova-tech-minimal-laptop-backpack',
        description: 'Water-resistant laptop backpack with RFID-protected pocket, ergonomic air-flow straps, and padded 16-inch laptop compartment.',
        shortDescription: 'Slim water-resistant laptop backpack with RFID protection.',
        price: 2999,
        discountPrice: 2199,
        category: categoryMap['fashion'],
        subCategory: 'Accessories',
        brand: 'Nova Tech',
        images: [
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 40,
        sku: 'NOVA-BP-010',
        specifications: [
          { key: 'Capacity', value: '22L' },
          { key: 'Laptop Size', value: 'Up to 16 inch' },
          { key: 'Material', value: 'Ripstop Nylon' }
        ],
        features: ['RFID Safe Pocket', 'USB Charging Port', 'Anti-Theft Zipper'],
        rating: 4.7,
        numReviews: 14,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Serene Aroma Smart Diffuser',
        slug: 'serene-aroma-smart-diffuser',
        description: 'Ultrasonic aroma diffuser with app scheduling, color mood lighting, and 8-hour continuous mist for calm home environments.',
        shortDescription: 'App-controlled ultrasonic aroma diffuser with mood lighting.',
        price: 2599,
        discountPrice: 1999,
        category: categoryMap['home-living'],
        subCategory: 'Decor',
        brand: 'Serene Living',
        images: [
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 28,
        sku: 'SER-DF-011',
        specifications: [
          { key: 'Run Time', value: '8 hours' },
          { key: 'Water Tank', value: '300ml' },
          { key: 'App Support', value: 'iOS / Android' }
        ],
        features: ['Aroma Timer', 'Color Mood LED', 'Whisper Quiet Operation'],
        rating: 4.5,
        numReviews: 9,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'PulseFit Performance Resistance Bands Set',
        slug: 'pulsefit-performance-resistance-bands-set',
        description: 'Set of five graduated resistance bands for strength training, mobility, and recovery with carry pouch and exercise guide.',
        shortDescription: '5-level resistance bands set for home workouts and rehab.',
        price: 2499,
        discountPrice: 1799,
        category: categoryMap['fitness'],
        subCategory: 'Yoga & Mat',
        brand: 'PulseFit',
        images: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 32,
        sku: 'PUL-RB-012',
        specifications: [
          { key: 'Includes', value: '5 resistance bands + carry pouch' },
          { key: 'Resistance Range', value: '5-50 lbs' },
          { key: 'Material', value: 'Eco-friendly Latex' }
        ],
        features: ['Portable Carry Pouch', 'Workout Guide Included', 'Durable Tear-resistant Material'],
        rating: 4.6,
        numReviews: 21,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Aurora Nano Smart Earbuds',
        slug: 'aurora-nano-smart-earbuds',
        description: 'True wireless earbuds with adaptive noise cancellation, intuitive touch controls, and 28-hour combined playback.',
        shortDescription: 'Adaptive noise cancelling true wireless earbuds.',
        price: 8999,
        discountPrice: 6999,
        category: categoryMap['electronics'],
        subCategory: 'Audio',
        brand: 'Aurora Audio',
        images: [
          'https://images.unsplash.com/photo-1517359005562-216c34d74d55?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 34,
        sku: 'AUR-EB-013',
        specifications: [
          { key: 'Battery Life', value: '7 hrs per bud' },
          { key: 'Charging Case', value: '21 hrs additional' }
        ],
        features: ['Adaptive ANC', 'IPX5 Sweat Resistant', 'Fast Pair'],
        rating: 4.6,
        numReviews: 37,
        isFeatured: false,
        isBestSeller: true
      },
      {
        name: 'Vertex Wireless Charging Dock',
        slug: 'vertex-wireless-charging-dock',
        description: 'Qi-certified charging dock for phone, earbuds, and smartwatch with intelligent power distribution and low-temperature control.',
        shortDescription: 'Qi charging dock for multiple devices.',
        price: 4999,
        discountPrice: 3699,
        category: categoryMap['electronics'],
        subCategory: 'Accessories',
        brand: 'Vertex',
        images: [
          'https://images.unsplash.com/photo-1510557880182-3f8ed2d2c97e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 42,
        sku: 'VTX-DC-014',
        specifications: [
          { key: 'Output', value: '15W + 10W + 5W' },
          { key: 'Compatibility', value: 'Qi-enabled phones and wearables' }
        ],
        features: ['Smart Device Detection', 'LED Status Ring', 'Anti-slip Base'],
        rating: 4.4,
        numReviews: 22,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Orion 4K Streaming Stick',
        slug: 'orion-4k-streaming-stick',
        description: 'Plug-and-play streaming stick with 4K HDR, voice search, and dual-band Wi-Fi for instant cinema-quality viewing.',
        shortDescription: '4K HDR streaming stick with voice control.',
        price: 6499,
        discountPrice: 5299,
        category: categoryMap['electronics'],
        subCategory: 'Audio',
        brand: 'Orion',
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541534401786-1adfa14e60fc?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 28,
        sku: 'ORI-SS-015',
        specifications: [
          { key: 'Resolution', value: '4K UHD' },
          { key: 'Voice Assistant', value: 'Integrated Alexa' }
        ],
        features: ['Fast App Launch', 'Dual-band Wi-Fi', 'HDMI Extension'],
        rating: 4.5,
        numReviews: 39,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Nova Touchscreen E-Reader',
        slug: 'nova-touchscreen-e-reader',
        description: 'Waterproof 8-inch e-reader with warm/cool light, 32GB storage, and adjustable text settings for all-day reading comfort.',
        shortDescription: 'Waterproof touchscreen e-reader with adjustable lighting.',
        price: 11999,
        discountPrice: 9999,
        category: categoryMap['electronics'],
        subCategory: 'Laptops',
        brand: 'Nova Tech',
        images: [
          'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 16,
        sku: 'NVA-ER-016',
        specifications: [
          { key: 'Storage', value: '32GB' },
          { key: 'Battery', value: '6 weeks standby' }
        ],
        features: ['Anti-glare Display', 'Bluetooth Audio', 'IPX8 Waterproof'],
        rating: 4.7,
        numReviews: 26,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Prism LED Gaming Monitor',
        slug: 'prism-led-gaming-monitor',
        description: '27-inch QHD gaming monitor with 165Hz refresh, 1ms response, and G-Sync compatible adaptive sync.',
        shortDescription: '27" QHD gaming monitor with 165Hz refresh rate.',
        price: 27999,
        discountPrice: 23999,
        category: categoryMap['electronics'],
        subCategory: 'Audio',
        brand: 'Prism Tech',
        images: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 15,
        sku: 'PRM-MN-017',
        specifications: [
          { key: 'Refresh Rate', value: '165Hz' },
          { key: 'Response Time', value: '1ms GTG' }
        ],
        features: ['HDR400', 'Low Blue Light', 'Height Adjustable Stand'],
        rating: 4.6,
        numReviews: 19,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Quantum Wi-Fi 6 Router',
        slug: 'quantum-wi-fi-6-router',
        description: 'Tri-band Wi-Fi 6 router with mesh-ready coverage and advanced parental controls for uninterrupted home networking.',
        shortDescription: 'Tri-band Wi-Fi 6 router with mesh support.',
        price: 15999,
        discountPrice: 12999,
        category: categoryMap['electronics'],
        subCategory: 'Accessories',
        brand: 'Quantum Net',
        images: [
          'https://images.unsplash.com/photo-1512406805801-0f7f6a6ade3b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 24,
        sku: 'QTM-RR-018',
        specifications: [
          { key: 'Bandwidth', value: 'Up to 5400 Mbps' },
          { key: 'Ports', value: '4 Gigabit LAN' }
        ],
        features: ['Mesh Expansion', 'Guest Network', 'App Management'],
        rating: 4.5,
        numReviews: 33,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'EchoGlass AR Smart Glasses',
        slug: 'echoglass-ar-smart-glasses',
        description: 'Lightweight AR glasses with voice assistant, notifications on the go, and dual transparent displays for navigation information.',
        shortDescription: 'Voice-enabled augmented reality smart glasses.',
        price: 34999,
        discountPrice: 29999,
        category: categoryMap['electronics'],
        subCategory: 'Accessories',
        brand: 'EchoGlass',
        images: [
          'https://images.unsplash.com/photo-1551836022-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1514333453238-b7d25f44ca94?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 10,
        sku: 'EGL-AR-019',
        specifications: [
          { key: 'Display', value: 'Dual 1280x720' },
          { key: 'Battery', value: '8 hrs usage' }
        ],
        features: ['Voice Assistant', 'Gesture Controls', 'Lightweight Frame'],
        rating: 4.4,
        numReviews: 15,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Terra Pulse Power Bank',
        slug: 'terra-pulse-power-bank',
        description: '15,000mAh slim power bank with dual USB-C output, LED digital display, and fast charge support.',
        shortDescription: 'Dual-output 15,000mAh fast charging power bank.',
        price: 3599,
        discountPrice: 2799,
        category: categoryMap['electronics'],
        subCategory: 'Accessories',
        brand: 'Terra Power',
        images: [
          'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1510557880182-3f8ed2d2c97e?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 46,
        sku: 'TER-PB-020',
        specifications: [
          { key: 'Capacity', value: '15,000mAh' },
          { key: 'Output', value: '2x USB-C 20W' }
        ],
        features: ['LED Digital Display', 'Pass-through Charging', 'Portable Design'],
        rating: 4.3,
        numReviews: 28,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Cipher Secure Bluetooth Lock',
        slug: 'cipher-secure-bluetooth-lock',
        description: 'Weatherproof smart padlock with Bluetooth unlocking, tamper alert, and shared access manager.',
        shortDescription: 'Bluetooth-enabled smart padlock with tamper alerts.',
        price: 4999,
        discountPrice: 3999,
        category: categoryMap['electronics'],
        subCategory: 'Accessories',
        brand: 'Cipher Security',
        images: [
          'https://images.unsplash.com/photo-1516834474-48a0d4f80cff?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 18,
        sku: 'CYP-BL-021',
        specifications: [
          { key: 'Material', value: 'Hardened Steel' },
          { key: 'Battery', value: '12 months' }
        ],
        features: ['Bluetooth Unlock', 'Tamper Alert', 'Shared Access'],
        rating: 4.5,
        numReviews: 21,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Solaris Solar Laptop Case',
        slug: 'solaris-solar-laptop-case',
        description: 'Eco-friendly laptop sleeve with built-in solar charging panel and water-resistant exterior.',
        shortDescription: 'Solar charging laptop sleeve with protective exterior.',
        price: 4599,
        discountPrice: 3599,
        category: categoryMap['electronics'],
        subCategory: 'Accessories',
        brand: 'Solaris',
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1510557880182-3f8ed2d2c97e?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 22,
        sku: 'SOL-LC-022',
        specifications: [
          { key: 'Panel Output', value: '5W Solar' },
          { key: 'Fits', value: 'Up to 15-inch laptop' }
        ],
        features: ['Water-resistant', 'Solar Boost', 'Padded Protection'],
        rating: 4.2,
        numReviews: 12,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Aria Satin Bomber Jacket',
        slug: 'aria-satin-bomber-jacket',
        description: 'Lightweight satin bomber jacket with contrast ribbing, interior pockets, and seasonal color palette.',
        shortDescription: 'Lightweight satin bomber jacket with modern fit.',
        price: 6999,
        discountPrice: 5299,
        category: categoryMap['fashion'],
        subCategory: 'Jackets',
        brand: 'Aria Wear',
        images: [
          'https://images.unsplash.com/photo-1519741498924-4afd5d84c6ff?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 26,
        sku: 'ARI-BJ-023',
        specifications: [
          { key: 'Material', value: 'Satin Polyester' },
          { key: 'Fit', value: 'Regular' }
        ],
        features: ['Interior Pocket', 'Elastic Cuffs', 'Zip Front'],
        rating: 4.3,
        numReviews: 30,
        isFeatured: false,
        isBestSeller: true
      },
      {
        name: 'Zenith Leather Chelsea Boots',
        slug: 'zenith-leather-chelsea-boots',
        description: 'Premium Chelsea boots in soft calf leather with elastic side gores and a cushioned insole for all-day comfort.',
        shortDescription: 'Classic leather Chelsea boots with comfort lining.',
        price: 10999,
        discountPrice: 8999,
        category: categoryMap['fashion'],
        subCategory: 'Sneakers',
        brand: 'Zenith Footwear',
        images: [
          'https://images.unsplash.com/photo-1519741498924-4afd5d84c6ff?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 15,
        sku: 'ZEN-CB-024',
        specifications: [
          { key: 'Upper', value: 'Calf Leather' },
          { key: 'Sole', value: 'Rubber' }
        ],
        features: ['Elastic Side Panels', 'Leather Lining', 'Cushioned Insole'],
        rating: 4.7,
        numReviews: 18,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Mirage Denim Utility Shirt',
        slug: 'mirage-denim-utility-shirt',
        description: 'Structured denim shirt with multiple pockets, contrast stitching, and button-down design.',
        shortDescription: 'Utility denim shirt with modern detailing.',
        price: 3999,
        discountPrice: 2999,
        category: categoryMap['fashion'],
        subCategory: 'Streetwear',
        brand: 'Mirage Apparel',
        images: [
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 30,
        sku: 'MIR-US-025',
        specifications: [
          { key: 'Fabric', value: 'Denim Cotton Blend' },
          { key: 'Fit', value: 'Relaxed' }
        ],
        features: ['Chest Pockets', 'Button Closure', 'Durable Weave'],
        rating: 4.4,
        numReviews: 25,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Ember Knit Crewneck Sweater',
        slug: 'ember-knit-crewneck-sweater',
        description: 'Soft knit crewneck with ribbed hem, breathable fibers, and lightweight warmth for layering.',
        shortDescription: 'Breathable knit crewneck sweater for layering.',
        price: 4599,
        discountPrice: 3499,
        category: categoryMap['fashion'],
        subCategory: 'Streetwear',
        brand: 'Ember Clothing',
        images: [
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 38,
        sku: 'EMB-SW-026',
        specifications: [
          { key: 'Material', value: 'Acrylic Blend' },
          { key: 'Care', value: 'Machine Washable' }
        ],
        features: ['Ribbed Hem', 'Soft Texture', 'Lightweight Warmth'],
        rating: 4.5,
        numReviews: 32,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Celeste Silk Palazzo Pants',
        slug: 'celeste-silk-palazzo-pants',
        description: 'Flowing silk-blend palazzo pants with elastic waist and elegant drape for upscale lounge styling.',
        shortDescription: 'Flowing silk-blend palazzo pants with elastic waist.',
        price: 7999,
        discountPrice: 5999,
        category: categoryMap['fashion'],
        subCategory: 'Streetwear',
        brand: 'Celeste Luxe',
        images: [
          'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 20,
        sku: 'CEL-PP-027',
        specifications: [
          { key: 'Fabric', value: 'Silk Blend' },
          { key: 'Waist', value: 'Elastic Drawstring' }
        ],
        features: ['Flowing Silhouette', 'Soft Touch', 'Elegant Drape'],
        rating: 4.6,
        numReviews: 14,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'Novus Luggage Tote Bag',
        slug: 'novus-luggage-tote-bag',
        description: 'Stylish tote bag with laptop compartment, detachable shoulder strap, and RFID-protected inner pocket.',
        shortDescription: 'Structured tote bag with laptop sleeve and RFID protection.',
        price: 4999,
        discountPrice: 3699,
        category: categoryMap['fashion'],
        subCategory: 'Accessories',
        brand: 'Novus',
        images: [
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 44,
        sku: 'NOV-TB-028',
        specifications: [
          { key: 'Capacity', value: '18L' },
          { key: 'Compartments', value: '5' }
        ],
        features: ['RFID Pocket', 'Detachable Strap', 'Laptop Sleeve'],
        rating: 4.4,
        numReviews: 27,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Vela Sport Compression Shorts',
        slug: 'vela-sport-compression-shorts',
        description: 'High-performance compression shorts with moisture-wicking fabric and flatlock seams for training sessions.',
        shortDescription: 'Moisture-wicking compression shorts for workouts.',
        price: 2299,
        discountPrice: 1799,
        category: categoryMap['fashion'],
        subCategory: 'Streetwear',
        brand: 'Vela Active',
        images: [
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 36,
        sku: 'VEL-CS-029',
        specifications: [
          { key: 'Fabric', value: 'Spandex Blend' },
          { key: 'Features', value: 'Moisture Wicking' }
        ],
        features: ['Breathable', '4-way Stretch', 'Flatlock Seams'],
        rating: 4.5,
        numReviews: 23,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Eden Floral Print Kimono',
        slug: 'eden-floral-print-kimono',
        description: 'Lightweight printed kimono with open front, relaxed fit, and bohemian-inspired floral pattern.',
        shortDescription: 'Bohemian floral kimono with relaxed fit.',
        price: 3199,
        discountPrice: 2499,
        category: categoryMap['fashion'],
        subCategory: 'Streetwear',
        brand: 'Eden Attire',
        images: [
          'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 29,
        sku: 'EDN-KM-030',
        specifications: [
          { key: 'Length', value: 'Mid' },
          { key: 'Material', value: 'Polyester Blend' }
        ],
        features: ['Open Front', 'Lightweight', 'Soft Fabric'],
        rating: 4.6,
        numReviews: 20,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Solace Cashmere Beanie',
        slug: 'solace-cashmere-beanie',
        description: 'Soft cashmere blend beanie with ribbed knit and thermal insulation for cold-weather comfort.',
        shortDescription: 'Soft cashmere blend beanie with thermal knit.',
        price: 2399,
        discountPrice: 1799,
        category: categoryMap['fashion'],
        subCategory: 'Accessories',
        brand: 'Solace',
        images: [
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 52,
        sku: 'SOL-BE-031',
        specifications: [
          { key: 'Material', value: 'Cashmere Blend' },
          { key: 'Care', value: 'Hand Wash' }
        ],
        features: ['Ribbed Knit', 'Thermal Warmth', 'Luxury Softness'],
        rating: 4.7,
        numReviews: 33,
        isFeatured: false,
        isBestSeller: true
      },
      {
        name: 'Meridian Leather Crossbody Bag',
        slug: 'meridian-leather-crossbody-bag',
        description: 'Compact leather crossbody bag with adjustable strap, zippered compartments, and polished hardware.',
        shortDescription: 'Leather crossbody bag with adjustable strap.',
        price: 5799,
        discountPrice: 4499,
        category: categoryMap['fashion'],
        subCategory: 'Accessories',
        brand: 'Meridian',
        images: [
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 26,
        sku: 'MER-CB-032',
        specifications: [
          { key: 'Material', value: 'Genuine Leather' },
          { key: 'Size', value: '22 x 15 x 7 cm' }
        ],
        features: ['Adjustable Strap', 'Multiple Compartments', 'Premium Hardware'],
        rating: 4.4,
        numReviews: 16,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Aura Frost Smart Fridge Lamp',
        slug: 'aura-frost-smart-fridge-lamp',
        description: 'Smart fridge lamp with motion sensor, touch brightness control, and USB-C charging for a neat counter display.',
        shortDescription: 'Smart fridge lamp with motion sensor and USB-C charging.',
        price: 2499,
        discountPrice: 1899,
        category: categoryMap['home-living'],
        subCategory: 'Lighting',
        brand: 'Aura Home',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 33,
        sku: 'AUR-FL-033',
        specifications: [
          { key: 'Power', value: '5W LED' },
          { key: 'Control', value: 'Touch & Motion' }
        ],
        features: ['Motion Activated', 'Adjustable Brightness', 'USB-C Powered'],
        rating: 4.4,
        numReviews: 18,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Willow Ceramic Planter Set',
        slug: 'willow-ceramic-planter-set',
        description: 'Set of three minimalist ceramic planters with drain trays ideal for indoor plants and desktop greens.',
        shortDescription: 'Minimalist ceramic planter set with trays.',
        price: 2999,
        discountPrice: 2399,
        category: categoryMap['home-living'],
        subCategory: 'Decor',
        brand: 'Willow Living',
        images: [
          'https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 41,
        sku: 'WIL-PL-034',
        specifications: [
          { key: 'Includes', value: '3 planters + trays' },
          { key: 'Material', value: 'Glazed Ceramic' }
        ],
        features: ['Matte Finish', 'Drain Tray Included', 'Modern Design'],
        rating: 4.6,
        numReviews: 24,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Canyon Woven Storage Basket',
        slug: 'canyon-woven-storage-basket',
        description: 'Handwoven storage basket set with reinforced handles for organizing blankets, toys, and everyday essentials.',
        shortDescription: 'Handwoven storage baskets with reinforced handles.',
        price: 2599,
        discountPrice: 1999,
        category: categoryMap['home-living'],
        subCategory: 'Furniture',
        brand: 'Canyon Cabin',
        images: [
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 39,
        sku: 'CNY-BS-035',
        specifications: [
          { key: 'Material', value: 'Woven Seagrass' },
          { key: 'Size', value: 'Medium' }
        ],
        features: ['Reinforced Handles', 'Natural Finish', 'Set of 2'],
        rating: 4.3,
        numReviews: 17,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Ember Scented Candle Trio',
        slug: 'ember-scented-candle-trio',
        description: 'Luxury scented candle gift set with three calming aromas and burn-safe glass containers.',
        shortDescription: 'Luxury candle trio with calming fragrances.',
        price: 2199,
        discountPrice: 1699,
        category: categoryMap['home-living'],
        subCategory: 'Decor',
        brand: 'Ember Home',
        images: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 44,
        sku: 'EMB-CD-036',
        specifications: [
          { key: 'Burn Time', value: '20 hrs each' },
          { key: 'Scents', value: 'Lavender, Amber, Cedar' }
        ],
        features: ['Premium Soy Wax', 'Glass Jar', 'Gift Ready'],
        rating: 4.5,
        numReviews: 29,
        isFeatured: false,
        isBestSeller: true
      },
      {
        name: 'Haven Modular TV Console',
        slug: 'haven-modular-tv-console',
        description: 'Modular TV console with adjustable shelving, cable management, and matte ash finish.',
        shortDescription: 'Modular TV console with adjustable shelving.',
        price: 17999,
        discountPrice: 14999,
        category: categoryMap['home-living'],
        subCategory: 'Furniture',
        brand: 'Haven Interiors',
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 12,
        sku: 'HAV-TV-037',
        specifications: [
          { key: 'Width', value: '180 cm' },
          { key: 'Finish', value: 'Matte Ash' }
        ],
        features: ['Cable Management', 'Adjustable Shelves', 'Soft-close Drawers'],
        rating: 4.4,
        numReviews: 16,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Sonata Soundbar Shelf',
        slug: 'sonata-soundbar-shelf',
        description: 'Floating soundbar shelf with hidden mount bracket and cushioned support to protect your audio device.',
        shortDescription: 'Floating soundbar shelf with hidden mounting hardware.',
        price: 3299,
        discountPrice: 2599,
        category: categoryMap['home-living'],
        subCategory: 'Decor',
        brand: 'Sonata Home',
        images: [
          'https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 31,
        sku: 'SON-SH-038',
        specifications: [
          { key: 'Material', value: 'Powder-coated Steel' },
          { key: 'Load Capacity', value: '12 kg' }
        ],
        features: ['Hidden Mount', 'Cable Hole', 'Protective Cushioning'],
        rating: 4.2,
        numReviews: 14,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Breeze Cordless Floor Fan',
        slug: 'breeze-cordless-floor-fan',
        description: 'Rechargeable floor fan with three speeds, remote control, and quiet circulation for small rooms.',
        shortDescription: 'Rechargeable cordless floor fan with remote control.',
        price: 4499,
        discountPrice: 3499,
        category: categoryMap['home-living'],
        subCategory: 'Lighting',
        brand: 'Breeze Home',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 27,
        sku: 'BRZ-FN-039',
        specifications: [
          { key: 'Run Time', value: '10 hrs' },
          { key: 'Speed Levels', value: '3' }
        ],
        features: ['Cordless Design', 'Remote Control', 'Whisper Quiet'],
        rating: 4.3,
        numReviews: 20,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Lumen Motion Sensor Night Light',
        slug: 'lumen-motion-sensor-night-light',
        description: 'Plug-in night light with motion sensor, soft glow, and energy-saving auto-off feature.',
        shortDescription: 'Motion-sensor night light with soft glow.',
        price: 1199,
        discountPrice: 899,
        category: categoryMap['home-living'],
        subCategory: 'Lighting',
        brand: 'Lumen Life',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 60,
        sku: 'LUM-NL-040',
        specifications: [
          { key: 'Sensor Range', value: '3 meters' },
          { key: 'Power', value: '0.5W LED' }
        ],
        features: ['Auto On/Off', 'Soft Warm Light', 'Energy Saving'],
        rating: 4.6,
        numReviews: 39,
        isFeatured: false,
        isBestSeller: true
      },
      {
        name: 'Pearl Cloud Memory Pillow',
        slug: 'pearl-cloud-memory-pillow',
        description: 'Ergonomic memory foam pillow with cooling gel layer and removable bamboo cover for a restful sleep.',
        shortDescription: 'Cooling memory foam pillow with bamboo cover.',
        price: 3699,
        discountPrice: 2799,
        category: categoryMap['home-living'],
        subCategory: 'Furniture',
        brand: 'Pearl Home',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 44,
        sku: 'PER-MP-041',
        specifications: [
          { key: 'Material', value: 'Memory Foam + Gel' },
          { key: 'Cover', value: 'Bamboo Fiber' }
        ],
        features: ['Cooling Gel', 'Ergonomic Support', 'Removable Cover'],
        rating: 4.5,
        numReviews: 31,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'PulseZone Heart Rate Armband',
        slug: 'pulsezone-heart-rate-armband',
        description: 'Bluetooth heart rate armband with real-time tracking, sweatproof material, and mobile app sync for training sessions.',
        shortDescription: 'Bluetooth heart rate armband with real-time tracking.',
        price: 5499,
        discountPrice: 4299,
        category: categoryMap['fitness'],
        subCategory: 'Wearables',
        brand: 'PulseZone',
        images: [
          'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 30,
        sku: 'PLZ-HA-042',
        specifications: [
          { key: 'Connectivity', value: 'Bluetooth 5.0' },
          { key: 'Battery', value: '10 hrs' }
        ],
        features: ['Sweatproof', 'Real-time Sync', 'Adjustable Strap'],
        rating: 4.4,
        numReviews: 18,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'FlexCore Adjustable Dumbbells',
        slug: 'flexcore-adjustable-dumbbells',
        description: 'Adjustable dumbbells with selectable weight plates and compact storage tray for convenient home workouts.',
        shortDescription: 'Adjustable dumbbells with compact storage tray.',
        price: 12999,
        discountPrice: 10999,
        category: categoryMap['fitness'],
        subCategory: 'Fitness',
        brand: 'FlexCore',
        images: [
          'https://images.unsplash.com/photo-1594737625785-9dfb0d44d7d8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 14,
        sku: 'FLX-DB-043',
        specifications: [
          { key: 'Weight Range', value: '5-25 kg' },
          { key: 'Material', value: 'Steel + ABS' }
        ],
        features: ['Quick Adjust', 'Compact Tray', 'Anti-slip Grip'],
        rating: 4.7,
        numReviews: 22,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'GlideStride Indoor Cycling Mat',
        slug: 'glidestride-indoor-cycling-mat',
        description: 'High-grip indoor cycling mat with sweat-resistant top layer and noise-dampening foam.',
        shortDescription: 'Sweatproof indoor cycling mat with noise damping.',
        price: 3199,
        discountPrice: 2499,
        category: categoryMap['fitness'],
        subCategory: 'Yoga & Mat',
        brand: 'GlideStride',
        images: [
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 25,
        sku: 'GLD-MT-044',
        specifications: [
          { key: 'Length', value: '180 cm' },
          { key: 'Thickness', value: '6 mm' }
        ],
        features: ['Sweat Resistant', 'Noise Dampening', 'Grip Surface'],
        rating: 4.5,
        numReviews: 16,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Zenith Pro Resistance Loop Set',
        slug: 'zenith-pro-resistance-loop-set',
        description: 'Set of five resistance loops with graduated tension levels and travel pouch for strength training anywhere.',
        shortDescription: '5-level resistance loop set with travel pouch.',
        price: 2499,
        discountPrice: 1999,
        category: categoryMap['fitness'],
        subCategory: 'Yoga & Mat',
        brand: 'Zenith Fit',
        images: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 40,
        sku: 'ZEN-RL-045',
        specifications: [
          { key: 'Tension Levels', value: '5 Levels' },
          { key: 'Includes', value: 'Carry Pouch' }
        ],
        features: ['Portable', 'Latex Free', 'Travel Ready'],
        rating: 4.6,
        numReviews: 29,
        isFeatured: false,
        isBestSeller: true
      },
      {
        name: 'AeroFit Speed Agility Ladder',
        slug: 'aerofit-speed-agility-ladder',
        description: 'Agility ladder with adjustable rungs and carry bag for speed, coordination, and footwork drills.',
        shortDescription: 'Adjustable agility ladder with carry bag.',
        price: 1999,
        discountPrice: 1599,
        category: categoryMap['fitness'],
        subCategory: 'Fitness',
        brand: 'AeroFit',
        images: [
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1594737625785-9dfb0d44d7d8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 48,
        sku: 'AER-AL-046',
        specifications: [
          { key: 'Length', value: '5 m' },
          { key: 'Rungs', value: '12 Adjustable' }
        ],
        features: ['Adjustable Rungs', 'Carry Bag', 'Non-slip Design'],
        rating: 4.5,
        numReviews: 34,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'CoreMotion Balance Trainer',
        slug: 'coremotion-balance-trainer',
        description: 'Balance trainer with textured dome surface and pump for core stability, rehab, and balance exercises.',
        shortDescription: 'Textured balance trainer for core stability.',
        price: 2599,
        discountPrice: 1999,
        category: categoryMap['fitness'],
        subCategory: 'Yoga & Mat',
        brand: 'CoreMotion',
        images: [
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 32,
        sku: 'CRM-BT-047',
        specifications: [
          { key: 'Diameter', value: '65 cm' },
          { key: 'Includes', value: 'Air Pump' }
        ],
        features: ['Textured Surface', 'Air Pump Included', 'Non-slip Base'],
        rating: 4.4,
        numReviews: 21,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'Summit Hydration Backpack',
        slug: 'summit-hydration-backpack',
        description: 'Hydration backpack with 2L water reservoir, ventilation straps, and reflective safety detailing for outdoor workouts.',
        shortDescription: '2L hydration backpack with reflective trim.',
        price: 4999,
        discountPrice: 3999,
        category: categoryMap['fitness'],
        subCategory: 'Accessories',
        brand: 'Summit Gear',
        images: [
          'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1594737625785-9dfb0d44d7d8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 23,
        sku: 'SUM-HB-048',
        specifications: [
          { key: 'Capacity', value: '2L Reservoir' },
          { key: 'Material', value: 'Ripstop Nylon' }
        ],
        features: ['Reflective Trim', 'Adjustable Straps', 'Hydration Tube'],
        rating: 4.6,
        numReviews: 29,
        isFeatured: true,
        isBestSeller: false
      },
      {
        name: 'Titan Grip Workout Gloves',
        slug: 'titan-grip-workout-gloves',
        description: 'Durable workout gloves with padded palm, breathable mesh back, and adjustable wrist support.',
        shortDescription: 'Padded workout gloves with wrist support.',
        price: 2199,
        discountPrice: 1699,
        category: categoryMap['fitness'],
        subCategory: 'Accessories',
        brand: 'Titan Gear',
        images: [
          'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1594737625785-9dfb0d44d7d8?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 38,
        sku: 'TTG-WG-049',
        specifications: [
          { key: 'Palm Padding', value: 'Gel Cushioned' },
          { key: 'Closure', value: 'Velcro Strap' }
        ],
        features: ['Breathable Mesh', 'Anti-slip Palm', 'Adjustable Fit'],
        rating: 4.5,
        numReviews: 19,
        isFeatured: false,
        isBestSeller: false
      },
      {
        name: 'VibeFit Massage Foam Roller',
        slug: 'vibefit-massage-foam-roller',
        description: 'Textured foam roller with vibration mode for deep muscle release, recovery, and mobility training.',
        shortDescription: 'Vibrating foam roller for muscle recovery.',
        price: 4399,
        discountPrice: 3399,
        category: categoryMap['fitness'],
        subCategory: 'Fitness',
        brand: 'VibeFit',
        images: [
          'https://images.unsplash.com/photo-1594737625785-9dfb0d44d7d8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 21,
        sku: 'VBF-FR-050',
        specifications: [
          { key: 'Length', value: '33 cm' },
          { key: 'Modes', value: '3 Vibration Speeds' }
        ],
        features: ['Vibration Recovery', 'Textured Surface', 'Rechargeable Battery'],
        rating: 4.6,
        numReviews: 27,
        isFeatured: true,
        isBestSeller: true
      },
      {
        name: 'SprintPro Stopwatch Timer',
        slug: 'sprintpro-stopwatch-timer',
        description: 'Multi-function sports stopwatch with lap timing, memory recall, and water-resistant casing.',
        shortDescription: 'Water-resistant stopwatch with lap memory.',
        price: 1799,
        discountPrice: 1399,
        category: categoryMap['fitness'],
        subCategory: 'Wearables',
        brand: 'SprintPro',
        images: [
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
        ],
        stock: 47,
        sku: 'SPR-ST-051',
        specifications: [
          { key: 'Memory', value: '100 Laps' },
          { key: 'Water Resistance', value: 'IPX4' }
        ],
        features: ['Lap Recall', 'Countdown Timer', 'Water Resistant'],
        rating: 4.4,
        numReviews: 13,
        isFeatured: false,
        isBestSeller: false
      }
    ];

    await Product.insertMany(productsData);

    console.log('[Seed] Creating demo coupons...');
    await Coupon.create([
      {
        code: 'AURA20',
        discountType: 'percentage',
        discountValue: 20,
        minimumOrderValue: 1000,
        maximumDiscount: 2000,
        expiryDate: new Date('2030-12-31'),
        usageLimit: 500,
        isActive: true
      },
      {
        code: 'WELCOME100',
        discountType: 'fixed',
        discountValue: 500,
        minimumOrderValue: 2000,
        expiryDate: new Date('2030-12-31'),
        usageLimit: 1000,
        isActive: true
      }
    ]);

    console.log('[Seed] Database seeded successfully!');
    console.log('--------------------------------------------------');
    console.log('Demo Credentials:');
    console.log('Admin Email: admin@aura.com | Password: password123');
    console.log('User Email:  user@aura.com  | Password: password123');
    console.log('Coupons:     AURA20 (20% off), WELCOME100 (₹500 off)');
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('[Seed Error]', error);
  }
};

// Execute if called directly from CLI
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  connectDB().then(() => {
    seedDatabase().then(() => process.exit(0));
  });
}
