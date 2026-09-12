/* =========================================================
   LubosMart — Storefront behavior
   Shared across every page: keeps the nav's sign-in link and
   cart badge in sync, and wires up "Add to Cart" buttons.
   ========================================================= */

(function () {

    const CART_KEY = "valora_cart";


    function readCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function writeCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge();
    }

    window.valoraAddToCart = function (name, price) {
        const cart = readCart();
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        writeCart(cart);
        return cart;
    };

    window.getValoraCart = readCart;

    window.valoraClearCart = function () {
        writeCart([]);
    };


    function cartCount() {
        return readCart().reduce((sum, item) => sum + item.qty, 0);
    }


    function updateCartBadge() {
        const badge = document.getElementById("cartCount");
        if (!badge) return;

        const count = cartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? "inline-flex" : "none";
    }


    function updateAuthLink() {
        const session = window.getValoraSession && window.getValoraSession();
        const link = document.getElementById("authLink");

        if (!link) return;

        if (session) {
            link.textContent = "Hi, " + session.firstName;
            link.href = session.role === "seller"
                ? "seller-dashboard.html"
                : "buyer-dashboard.html";
        } else {
            link.textContent = "Sign in";
            link.href = "login.html";
        }
    }


    function wireAddToCartButtons() {
        // Delegated listener on the document so this keeps working even
        // when buttons are re-rendered dynamically (e.g. shop.html
        // re-rendering the grid on filter/search).
        document.addEventListener("click", function (event) {
            const button = event.target.closest("[data-add-to-cart]");
            if (!button) return;

            event.preventDefault();

            const name = button.getAttribute("data-name") || "Product";
            const price = button.getAttribute("data-price") || "";

            window.valoraAddToCart(name, price);

            const originalText = button.innerHTML;
            button.innerHTML = "✓ Added";

            setTimeout(() => {
                button.innerHTML = originalText;
            }, 1200);
        });
    }


    document.addEventListener("DOMContentLoaded", function () {
        updateAuthLink();
        updateCartBadge();
        wireAddToCartButtons();
    });

})();
