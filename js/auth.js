/* =========================================================
   LubosMart — Valora Auth
   Lightweight local authentication used across every page.
   Stores registered users + the active session in localStorage
   so sign in / sign up / sign out stays in sync site-wide.
   ========================================================= */

(function () {

    const USERS_KEY = "valora_users";
    const SESSION_KEY = "valora_session";


    function readUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function writeUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function normalizeEmail(email) {
        return (email || "").trim().toLowerCase();
    }


    /* ---------------------------------------------------
       REGISTER
       Creates a new account and immediately signs them in.
    --------------------------------------------------- */

    window.valoraRegister = function ({ firstName, lastName, email, password, role }) {

        email = normalizeEmail(email);

        if (!firstName || !lastName || !email || !password || !role) {
            return { ok: false, message: "Please fill in every field." };
        }

        const users = readUsers();

        if (users.some(u => u.email === email)) {
            return { ok: false, message: "An account with that email already exists." };
        }

        users.push({ firstName, lastName, email, password, role });
        writeUsers(users);

        localStorage.setItem(SESSION_KEY, JSON.stringify({
            email, firstName, lastName, role
        }));

        return { ok: true, role };
    };


    /* ---------------------------------------------------
       LOGIN
    --------------------------------------------------- */

    window.valoraLogin = function (email, password) {

        email = normalizeEmail(email);

        const users = readUsers();

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { ok: false, message: "Invalid email or password." };
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }));

        return { ok: true, role: user.role };
    };


    /* ---------------------------------------------------
       SESSION HELPERS
    --------------------------------------------------- */

    window.getValoraSession = function () {
        try {
            return JSON.parse(localStorage.getItem(SESSION_KEY));
        } catch (e) {
            return null;
        }
    };

    window.valoraLogout = function () {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = "index.html";
    };


    /* ---------------------------------------------------
       PAGE GUARD
       Call on any page that requires a signed-in user of a
       given role. Redirects to login if the check fails.
    --------------------------------------------------- */

    window.requireValoraRole = function (role) {

        const session = window.getValoraSession();

        if (!session || session.role !== role) {
            window.location.href = "login.html";
            return null;
        }

        return session;
    };


    /* ---------------------------------------------------
       SEED TEST ACCOUNTS
       Creates a fixed buyer and seller account the first time
       the site loads (any page), so testing/checking always
       has ready-to-use credentials — even after clearing
       localStorage or opening the site on another computer.

       These are only added if they don't already exist, so
       re-running this never overwrites real accounts made
       through register.html.
    --------------------------------------------------- */

    function seedTestAccounts() {

        const users = readUsers();

        const testAccounts = [
            {
                firstName: "Juan",
                lastName: "Buyer",
                email: "buyer@lubosmart.com",
                password: "buyer123",
                role: "buyer"
            },
            {
                firstName: "Maria",
                lastName: "Seller",
                email: "seller@lubosmart.com",
                password: "seller123",
                role: "seller"
            }
        ];

        let changed = false;

        testAccounts.forEach(account => {
            const exists = users.some(u => u.email === account.email);
            if (!exists) {
                users.push(account);
                changed = true;
            }
        });

        if (changed) {
            writeUsers(users);
        }
    }

    seedTestAccounts();

})();