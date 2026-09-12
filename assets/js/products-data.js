/* =========================================================
   LubosMart — Product catalog (assets/js/products-data.js)

   Single source of truth for product data, used by
   shop.html (grid + filters) and product.html (detail page).
   Swap this for a real API call later — just keep populating
   window.LUBOSMART_PRODUCTS with the same shape.
   ========================================================= */

window.LUBOSMART_PRODUCTS = [
    {
        id: "classic-everyday-sneakers",
        name: "Classic Everyday Sneakers",
        category: "Fashion",
        price: 1299,
        rating: 5,
        tag: "FEATURED",
        initial: "S",
        images: ["assets/images/classic-everyday-sneakers.jpg"],
        description: "A clean, versatile sneaker built for everyday wear. Breathable canvas upper, a cushioned insole, and a durable rubber sole that goes from errands to a casual night out without missing a beat."
    },
    {
        id: "wireless-headphones",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 899,
        rating: 5,
        tag: "POPULAR",
        initial: "W",
        images: ["assets/images/wireless-headphones.jpg"],
        description: "Over-ear wireless headphones with rich bass, up to 20 hours of battery life, and a foldable design that's easy to toss in a bag. Bluetooth keeps the connection stable wherever you go."
    },
    {
        id: "minimal-leather-bag",
        name: "Minimal Leather Bag",
        category: "Fashion",
        price: 1499,
        rating: 4,
        tag: "NEW",
        initial: "M",
        images: ["assets/images/minimal-leather-bag.jpg"],
        description: "A minimalist leather bag with a structured shape, an adjustable strap, and just enough room for the essentials. Sourced from a local leatherworker and finished by hand."
    },
    {
        id: "smart-watch",
        name: "Smart Watch",
        category: "Electronics",
        price: 1999,
        rating: 5,
        tag: "FEATURED",
        initial: "S",
        images: ["assets/images/smart-watch.jpg"],
        description: "Track your steps, heart rate, and sleep with a lightweight smart watch that pairs easily with your phone. Water-resistant, with a battery that lasts days, not hours."
    },
    {
        id: "vitamin-c-glow-serum",
        name: "Vitamin C Glow Serum",
        category: "Beauty",
        price: 649,
        rating: 4,
        tag: "NEW",
        initial: "V",
        images: ["assets/images/vitamin-c-glow-serum.jpg"],
        description: "A lightweight brightening serum with Vitamin C to even out skin tone and add a healthy glow. Gentle enough for daily use, morning or night."
    },
    {
        id: "matte-lip-tint",
        name: "Matte Lip Tint",
        category: "Beauty",
        price: 299,
        rating: 5,
        tag: "POPULAR",
        initial: "L",
        images: ["assets/images/matte-lip-tint.jpg"],
        description: "A long-wearing, lightweight lip tint with a soft matte finish. Comfortable on the lips and built to last through a full day out."
    },
    {
        id: "scented-soy-candle",
        name: "Scented Soy Candle",
        category: "Home",
        price: 349,
        rating: 4,
        tag: "NEW",
        initial: "C",
        images: ["assets/images/scented-soy-candle.jpg"],
        description: "A hand-poured soy candle with a warm, home-y scent and a clean, even burn. Comes in a reusable ceramic jar you'll want to keep."
    },
    {
        id: "bamboo-storage-basket",
        name: "Bamboo Storage Basket",
        category: "Home",
        price: 599,
        rating: 4,
        tag: "FEATURED",
        initial: "B",
        images: ["assets/images/bamboo-storage-basket.jpg"],
        description: "A sturdy woven bamboo basket for tidying up shelves, closets, or countertops. Lightweight, breathable, and built to last."
    }
];