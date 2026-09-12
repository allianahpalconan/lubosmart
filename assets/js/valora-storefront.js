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


    /* ---------------------------------------------------
       TOAST NOTIFICATION
       Small floating message used to prompt sign-in before
       adding to cart. Styles are injected once so this works
       on any page without needing extra CSS files.
    --------------------------------------------------- */

    window.showValoraToast = function (message, duration) {
        let toast = document.getElementById("valora-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "valora-toast";
            document.body.appendChild(toast);

            const style = document.createElement("style");
            style.textContent = `
                #valora-toast {
                    position: fixed;
                    bottom: 26px;
                    left: 50%;
                    transform: translateX(-50%) translateY(16px);
                    background: #2A0F3F;
                    color: #fff;
                    padding: 14px 22px;
                    border-radius: 10px;
                    font-family: 'Inter', sans-serif;
                    font-size: 13.5px;
                    font-weight: 600;
                    box-shadow: 0 14px 34px rgba(43,15,63,0.28);
                    z-index: 9999;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.25s ease, transform 0.25s ease;
                    text-align: center;
                    max-width: 90vw;
                }
                #valora-toast.show {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                    pointer-events: auto;
                }
                #valora-toast a {
                    color: #F5A623;
                    font-weight: 700;
                    text-decoration: underline;
                }
            `;
            document.head.appendChild(style);
        }

        toast.innerHTML = message;
        toast.classList.add("show");

        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, duration || 3200);
    }


    function wireAddToCartButtons() {
        // Delegated listener on the document so this keeps working even
        // when buttons are re-rendered dynamically (e.g. shop.html
        // re-rendering the grid on filter/search).
        document.addEventListener("click", function (event) {
            const button = event.target.closest("[data-add-to-cart]");
            if (!button) return;

            event.preventDefault();

            const session = window.getValoraSession && window.getValoraSession();

            if (!session) {
                window.showValoraToast('Please <a href="login.html">sign in</a> first to add items to your cart.');
                return;
            }

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