// =========================
// UNIQUE SALONS ADMIN LOGIN
// =========================

const loginForm =
    document.getElementById("adminLoginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value.trim();

    const loginMessage =
        document.getElementById("loginMessage");


    // Admin credentials
    const correctUsername = "admin";
    const correctPassword = "1234";


    // Check login
    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        // Save login status
        sessionStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        // Open admin panel
        window.location.href = "admin.html";

    } else {

        loginMessage.innerHTML =
            "❌ Incorrect username or password.";

    }

});