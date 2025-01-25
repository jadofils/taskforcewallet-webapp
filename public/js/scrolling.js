document.addEventListener("DOMContentLoaded", function () {
  // Auth Section Logic
  const authSection = document.getElementById("auth-section");
  const registerForm = document.getElementById("register");
  const loginForm = document.getElementById("login");
  const navLinks = document.querySelectorAll(".nav-links a");
  const switchFormLinks = document.querySelectorAll(".switch-form");

  // Function to show a specific form
  function showAuthForm(formId) {
    // Hide both forms
    registerForm.style.display = "none";
    loginForm.style.display = "none";

    // Show the selected form
    if (formId === "register") {
      registerForm.style.display = "block";
    } else if (formId === "login") {
      loginForm.style.display = "block";
    }

    // Show the auth section
    authSection.classList.add("visible");
  }

  // Handle navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#register" || href === "#login") {
        e.preventDefault();
        showAuthForm(href.substring(1)); // Remove the '#' to get the form ID
        authSection.scrollIntoView({ behavior: "smooth" });
      } else if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Handle form switching links
  switchFormLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const formToShow = this.getAttribute("data-form");
      showAuthForm(formToShow);
    });
  });

  // Close auth section when clicking outside
  document.addEventListener("click", function (e) {
    if (e.target === authSection) {
      authSection.classList.remove("visible");
      registerForm.style.display = "none";
      loginForm.style.display = "none";
    }
  });

  // Mobile Menu Logic
  const menuIcon = document.querySelector(".menu-icon");
  const navLinksContainer = document.querySelector(".nav-links");

  // Toggle mobile menu
  menuIcon.addEventListener("click", function () {
    navLinksContainer.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!menuIcon.contains(e.target) && !navLinksContainer.contains(e.target)) {
      navLinksContainer.classList.remove("active");
    }
  });

  // Close mobile menu when a link is clicked
  const navLinksList = document.querySelectorAll(".nav-links a");
  navLinksList.forEach((link) => {
    link.addEventListener("click", function () {
      navLinksContainer.classList.remove("active");
    });
  });
});
