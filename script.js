// Show the login form
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.querySelector('.toggle-btn.active').classList.remove('active');
    document.querySelectorAll('.toggle-btn')[0].classList.add('active');
}

// Show the register form
function showRegister() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.querySelector('.toggle-btn.active').classList.remove('active');
    document.querySelectorAll('.toggle-btn')[1].classList.add('active');
}

// Handle Login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem(email)) {
        const userData = JSON.parse(localStorage.getItem(email));
        if (userData.password === password) {
            alert('Login successful!');
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('User does not exist.');
    }
}

// Handle Register form submission
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (!localStorage.getItem(email)) {
        const userData = {
            username: username,
            email: email,
            password: password
        };
        localStorage.setItem(email, JSON.stringify(userData));
        alert('Registration successful!');
        showLogin();
    } else {
        alert('Email already exists.');
    }
}
