document.addEventListener('DOMContentLoaded', function() {
    const authSection = document.getElementById('auth-section');
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    const navLinks = document.querySelectorAll('.nav-links a');
    const switchFormLinks = document.querySelectorAll('.switch-form');

    // Function to show auth section and specific form
    function showAuthForm(formId) {
        // Show auth section
        authSection.classList.add('visible');
        
        // Hide both forms first
        registerForm.classList.remove('active');
        loginForm.classList.remove('active');
        
        // Show selected form
        document.getElementById(formId).classList.add('active');
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#register' || href === '#login') {
                e.preventDefault();
                showAuthForm(href.substring(1));
                
                // Smooth scroll to auth section
                authSection.scrollIntoView({ behavior: 'smooth' });
            } else if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Handle form switching
    switchFormLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const formToShow = this.getAttribute('data-form');
            showAuthForm(formToShow);
        });
    });

    // Close auth section when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target === authSection) {
            authSection.classList.remove('visible');
        }
    });
});