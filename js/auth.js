/* =========================================================
   LubosMart — Authentication (js/auth.js)

   Simple localStorage-based auth so the frontend can be
   demoed end to end without a backend. Swap the internals
   of these functions for real API calls later — the public
   functions (valoraLogin, valoraRegister, valoraLogout,
   requireValoraRole, getValoraSession) can keep the same
   signatures.
   ========================================================= */

(function () {
    "use strict";

    var USERS_KEY = "valora_users";
    var SESSION_KEY = "valora_session";

    function getUsers() {
        try {
            var raw = localStorage.getItem(USERS_KEY);
            var users = raw ? JSON.parse(raw) : [];
            return Array.isArray(users) ? users : [];
        } catch (err) {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    // Seed a couple of demo accounts on first load so the site
    // can be tried out immediately without registering first.
    function seedDemoUsers() {
        var users = getUsers();
        if (users.length > 0) return;

        saveUsers([
            {
                firstName: "Juana",
                lastName: "Dela Cruz",
                email: "buyer@lubosmart.ph",
                password: "password123",
                role: "buyer"
            },
            {
                firstName: "Mang",
                lastName: "Tomas",
                email: "seller@lubosmart.ph",
                password: "password123",
                role: "seller"
            }
        ]);
    }

    seedDemoUsers();

    function setSession(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }));
    }

    /* ---------------------------------------------------
       getValoraSession()
       Returns the logged-in session object, or null.
       --------------------------------------------------- */

    window.getValoraSession = function () {
        try {
            var raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            return null;
        }
    };

    /* ---------------------------------------------------
       valoraRegister({ firstName, lastName, email, password, role })
       Returns { ok, message?, role?, firstName? }
       --------------------------------------------------- */

    window.valoraRegister = function (data) {
        data = data || {};

        if (!data.firstName || !data.lastName || !data.email || !data.password) {
            return { ok: false, message: "Please fill in all fields." };
        }

        if (data.password.length < 6) {
            return { ok: false, message: "Password must be at least 6 characters." };
        }

        var users = getUsers();

        var emailExists = users.some(function (u) {
            return u.email.toLowerCase() === data.email.toLowerCase();
        });

        if (emailExists) {
            return { ok: false, message: "An account with that email already exists." };
        }

        var newUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: data.role === "seller" ? "seller" : "buyer"
        };

        users.push(newUser);
        saveUsers(users);
        setSession(newUser);

        return { ok: true, role: newUser.role, firstName: newUser.firstName };
    };

    /* ---------------------------------------------------
       valoraLogin(email, password)
       Returns { ok, message?, role?, firstName? }
       --------------------------------------------------- */

    window.valoraLogin = function (email, password) {
        var users = getUsers();

        var user = users.find(function (u) {
            return (
                u.email.toLowerCase() === String(email || "").toLowerCase() &&
                u.password === password
            );
        });

        if (!user) {
            return { ok: false, message: "Invalid email or password." };
        }

        setSession(user);

        return { ok: true, role: user.role, firstName: user.firstName };
    };

    /* ---------------------------------------------------
       valoraLogout()
       Clears the session and sends the user home.
       --------------------------------------------------- */

    window.valoraLogout = function () {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = "index.html";
    };

    /* ---------------------------------------------------
       requireValoraRole(role)
       Use on protected pages (e.g. seller-dashboard.html).
       Redirects to login if not signed in, or to the
       correct dashboard if signed in with the wrong role.
       Returns the session object on success.
       --------------------------------------------------- */

    window.requireValoraRole = function (role) {
        var session = window.getValoraSession();

        if (!session) {
            window.location.href = "login.html";
            return null;
        }

        if (session.role !== role) {
            window.location.href =
                session.role === "seller" ? "seller-dashboard.html" : "buyer-dashboard.html";
            return null;
        }

        return session;
    };

})();