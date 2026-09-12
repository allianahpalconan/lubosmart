/* =========================================================
   LubosMart — Storefront helpers (assets/js/valora-storefront.js)

   Shared across every storefront page: cart storage in
   localStorage, the cart badge in the nav, the "Sign in" /
   "Hi, {name}" link swap, and the delegated add-to-cart
   button handler used by index.html, shop.html and
   product.html.
   ========================================================= */

(function () {
    "use strict";

    var CART_KEY = "valora_cart";

    /* ---------------------------------------------------
       CART STORAGE
       --------------------------------------------------- */

    window.getValoraCart = function () {
        try {
            var raw = localStorage.getItem(CART_KEY);
            var cart = raw ? JSON.parse(raw) : [];
            return Array.isArray(cart) ? cart : [];
        } catch (err) {
            return [];
        }
    };

    function saveValoraCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    window.valoraClearCart = function () {
        saveValoraCart([]);
    };

    // Exposed so pages like product.html (which have their own
    // quantity selector) can add a specific quantity at once.
    // Returns true if the item was added, false if it was blocked
    // (e.g. because the shopper isn't signed in yet).
    window.valoraAddToCart = function (name, price, qty) {
        var session = typeof window.getValoraSession === "function"
            ? window.getValoraSession()
            : null;

        if (!session) {
            showSignInRequiredModal();
            return false;
        }

        qty = Number(qty) || 1;

        var cart = window.getValoraCart();
        var existing = cart.find(function (item) {
            return item.name === name;
        });

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name: name, price: price, qty: qty });
        }

        saveValoraCart(cart);
        updateCartBadge();
        return true;
    };

    /* ---------------------------------------------------
       SIGN-IN REQUIRED MODAL
       Injected on demand so it works on any page, even ones
       that don't already define this markup/CSS themselves.
       --------------------------------------------------- */

    function injectSignInModal() {
        if (document.getElementById("valoraSignInModal")) return;

        var style = document.createElement("style");
        style.textContent =
            ".valora-modal-overlay{display:none;position:fixed;inset:0;background:rgba(43,15,63,0.55);" +
            "align-items:center;justify-content:center;z-index:3000;padding:20px;}" +
            ".valora-modal-overlay.active{display:flex;}" +
            ".valora-modal-box{background:#FFFFFF;border-radius:16px;padding:34px 30px 26px;max-width:380px;" +
            "width:100%;text-align:center;box-shadow:0 20px 50px rgba(43,15,63,0.20);font-family:'Inter',sans-serif;}" +
            ".valora-modal-icon{width:54px;height:54px;margin:0 auto 16px;border-radius:50%;background:#F1E9FA;" +
            "color:#3B1656;display:flex;align-items:center;justify-content:center;font-size:24px;}" +
            ".valora-modal-title{font-family:'Baloo 2','Inter',sans-serif;font-size:18px;color:#2A0F3F;margin-bottom:8px;}" +
            ".valora-modal-message{font-size:13px;color:#746C80;margin-bottom:24px;line-height:1.5;}" +
            ".valora-modal-actions{display:flex;gap:10px;}" +
            ".valora-modal-btn{flex:1;padding:12px;border:none;border-radius:8px;font-size:13px;font-weight:700;" +
            "cursor:pointer;transition:0.2s;font-family:'Inter',sans-serif;}" +
            ".valora-modal-btn-primary{background:#F5A623;color:#2A0F3F;}" +
            ".valora-modal-btn-primary:hover{background:#DB8E10;}" +
            ".valora-modal-btn-secondary{background:#F1E9FA;color:#2A0F3F;}" +
            ".valora-modal-btn-secondary:hover{background:#E3D4F2;}";
        document.head.appendChild(style);

        var overlay = document.createElement("div");
        overlay.id = "valoraSignInModal";
        overlay.className = "valora-modal-overlay";
        overlay.innerHTML =
            '<div class="valora-modal-box">' +
            '<div class="valora-modal-icon">🔒</div>' +
            '<div class="valora-modal-title">Sign in required</div>' +
            '<div class="valora-modal-message">Please sign in before adding items to your cart.</div>' +
            '<div class="valora-modal-actions">' +
            '<button class="valora-modal-btn valora-modal-btn-secondary" id="valoraModalCancel">Cancel</button>' +
            '<button class="valora-modal-btn valora-modal-btn-primary" id="valoraModalSignIn">Sign in</button>' +
            "</div></div>";

        document.body.appendChild(overlay);

        document.getElementById("valoraModalCancel").addEventListener("click", function () {
            overlay.classList.remove("active");
        });

        document.getElementById("valoraModalSignIn").addEventListener("click", function () {
            window.location.href = "login.html";
        });

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) overlay.classList.remove("active");
        });
    }

    function showSignInRequiredModal() {
        injectSignInModal();
        document.getElementById("valoraSignInModal").classList.add("active");
    }

    /* ---------------------------------------------------
       CART BADGE (nav icon)
       --------------------------------------------------- */

    function updateCartBadge() {
        var badge = document.getElementById("cartCount");
        if (!badge) return;

        var cart = window.getValoraCart();
        var count = cart.reduce(function (sum, item) {
            return sum + item.qty;
        }, 0);

        badge.textContent = count;
        badge.style.display = count > 0 ? "inline-flex" : "none";
    }

    /* ---------------------------------------------------
       AUTH LINK (nav "Sign in" -> "Hi, {name}")
       --------------------------------------------------- */

    function updateAuthLink() {
        var authLink = document.getElementById("authLink");
        if (!authLink) return;

        var session = typeof window.getValoraSession === "function"
            ? window.getValoraSession()
            : null;

        if (session) {
            authLink.textContent = "Hi, " + session.firstName;
            authLink.href = session.role === "seller"
                ? "seller-dashboard.html"
                : "buyer-dashboard.html";
        } else {
            authLink.textContent = "Sign in";
            authLink.href = "login.html";
        }
    }

    /* ---------------------------------------------------
       ADD TO CART — delegated click handler
       Works for any button anywhere on the page with:
       data-add-to-cart data-name="..." data-price="..."
       (optionally data-qty="...", default 1)
       --------------------------------------------------- */

    document.addEventListener("click", function (event) {
        var button = event.target.closest("[data-add-to-cart]");
        if (!button) return;

        var name = button.getAttribute("data-name");
        var price = button.getAttribute("data-price");
        var qty = Number(button.getAttribute("data-qty")) || 1;

        if (!name || !price) return;

        var added = window.valoraAddToCart(name, price, qty);
        if (!added) return;

        var original = button.innerHTML;
        var originalDisabled = button.disabled;

        button.innerHTML = "✓ Added";
        button.disabled = true;

        setTimeout(function () {
            button.innerHTML = original;
            button.disabled = originalDisabled;
        }, 1100);
    });

    /* ---------------------------------------------------
       INIT
       --------------------------------------------------- */

    document.addEventListener("DOMContentLoaded", function () {
        updateCartBadge();
        updateAuthLink();
    });

})();