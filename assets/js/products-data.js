/* =========================================================
   LubosMart — Shared Product Data
   Single source of truth for products, used by both shop.html
   (grid + filters) and product.html (detail page + gallery).

   To add more photos to a product, just add more file paths to
   its "images" array — the first one is used as the shop grid
   thumbnail, and the detail page will show all of them.
   ========================================================= */

window.LUBOSMART_PRODUCTS = [
    {
        id: "classic-everyday-sneakers",
        name: "Classic Everyday Sneakers",
        category: "Fashion",
        price: 1299,
        rating: 5,
        tag: "FEATURED",
        initial: "F",
        description: "Clean, comfortable everyday sneakers that go with almost anything in your closet. Lightweight build made for all-day wear.",
        images: [
            "assets/images/classic-everyday-sneakers.jpg"
            // add more, e.g. "assets/images/classic-everyday-sneakers-2.jpg"
        ]
    },
    {
        id: "denim-jacket",
        name: "Denim Jacket",
        category: "Fashion",
        price: 1799,
        rating: 4,
        tag: "NEW",
        initial: "F",
        description: "A timeless denim jacket with a relaxed fit — layers well over almost any outfit.",
        images: [
            "assets/images/denim-jacket.jpg"
        ]
    },
    {
        id: "everyday-tote-bag",
        name: "Everyday Tote Bag",
        category: "Fashion",
        price: 899,
        rating: 4,
        tag: "POPULAR",
        initial: "F",
        description: "A roomy tote built for daily errands, work, or weekend trips to the market.",
        images: [
            "assets/images/everyday-tote-bag.jpg"
        ]
    },
    {
        id: "minimal-leather-bag",
        name: "Minimal Leather Bag",
        category: "Fashion",
        price: 1499,
        rating: 4,
        tag: "NEW",
        initial: "A",
        description: "A minimalist leather bag with clean lines, sized perfectly for daily essentials.",
        images: [
            "assets/images/minimal-leather-bag.jpg"
        ]
    },
    {
        id: "wireless-headphones",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 899,
        rating: 5,
        tag: "POPULAR",
        initial: "E",
        description: "Comfortable over-ear wireless headphones with long battery life and crisp sound.",
        images: [
            "assets/images/wireless-headphones.jpg"
        ]
    },
    {
        id: "smart-watch",
        name: "Smart Watch",
        category: "Electronics",
        price: 1999,
        rating: 5,
        tag: "FEATURED",
        initial: "E",
        description: "Track your day, workouts, and notifications from your wrist with a bright, always-readable display.",
        images: [
            "assets/images/smart-watch.jpg"
        ]
    },
    {
        id: "portable-power-bank",
        name: "Portable Power Bank",
        category: "Electronics",
        price: 599,
        rating: 4,
        tag: "NEW",
        initial: "E",
        description: "Keep your devices charged on the go with this compact, high-capacity power bank.",
        images: [
            "assets/images/portable-power-bank.jpg"
        ]
    },
    {
        id: "bluetooth-speaker",
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1099,
        rating: 5,
        tag: "POPULAR",
        initial: "E",
        description: "A compact speaker with surprisingly big sound — great for the house or on the go.",
        images: [
            "assets/images/bluetooth-speaker.jpg"
        ]
    },
    {
        id: "vitamin-c-serum",
        name: "Vitamin C Serum",
        category: "Beauty",
        price: 449,
        rating: 5,
        tag: "POPULAR",
        initial: "B",
        description: "A brightening daily serum formulated to even out skin tone and add a healthy glow.",
        images: [
            "assets/images/vitamin-c-serum.jpg"
        ]
    },
    {
        id: "matte-lipstick-set",
        name: "Matte Lipstick Set",
        category: "Beauty",
        price: 599,
        rating: 4,
        tag: "NEW",
        initial: "B",
        description: "A curated set of long-wearing matte shades for everyday looks.",
        images: [
            "assets/images/matte-lipstick-set.jpg"
        ]
    },
    {
        id: "ceramic-table-lamp",
        name: "Ceramic Table Lamp",
        category: "Home",
        price: 999,
        rating: 4,
        tag: "FEATURED",
        initial: "H",
        description: "A warm, soft-glow table lamp with a handcrafted ceramic base.",
        images: [
            "assets/images/ceramic-table-lamp.jpg"
        ]
    },
    {
        id: "cozy-throw-blanket",
        name: "Cozy Throw Blanket",
        category: "Home",
        price: 749,
        rating: 5,
        tag: "POPULAR",
        initial: "H",
        description: "A soft, oversized throw blanket that's perfect for movie nights and cool evenings.",
        images: [
            "assets/images/cozy-throw-blanket.jpg"
        ]
    }
];