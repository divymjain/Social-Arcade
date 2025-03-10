document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message"); 

   
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();
            alert(result.message);
            if (result.success) {
                window.location.href = "/";
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value; 
            const password = document.getElementById("password").value;
            const errorMessage = document.getElementById("error-message");

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), 
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = result.redirect;
            } else {
                errorMessage.innerText = result.message;
                errorMessage.style.display = "block"; 
            }
        });
    }
});
