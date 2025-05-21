//console.log('test auth.js');

document.addEventListener('DOMContentLoaded', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        const errorElement = document.getElementById('login-error');
        const loginSuccessElement = document.getElementById('login-success');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessage = '';

            if (!emailRegex.test(emailInput.value)) {
                errorMessage = 'Please enter a valid email address';
            } else if (passwordInput.value.length < 8) {
                errorMessage = 'Password must be at least 8 characters long';
            }

            if (errorMessage) {
                errorElement.textContent = errorMessage;
            } else {
                errorElement.textContent = '';
                loginSuccessElement.textContent = 'Login successful!';
                //le mot de passe est dans l'URL (ce n'est pas bien dans un environnement de production)
                //loginForm.submit();
            }
        });
    }

    if (registerForm) {
        const emailInput = registerForm.querySelector('input[type="email"]');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const errorElement = document.getElementById('register-error');
        const registerSuccessElement = document.getElementById('register-success');

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessage = '';

            if (!emailRegex.test(emailInput.value)) {
                errorMessage = 'Please enter a valid email address';
            } else if (passwordInput.value.length < 8) {
                errorMessage = 'Password must be at least 8 characters long.';
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                errorMessage = 'Passwords do not match';
            }

            if (errorMessage) {
                errorElement.textContent = errorMessage;
            } else {
                errorElement.textContent = '';
                registerSuccessElement.textContent = 'Account created successfully!';
                setTimeout(() => { // attend 1 secondes avant de rediriger vers la page de login
                    window.location.href = 'login.html';
                }, 1000);
            }
        });
    }
});
