// Select all nav links
const navLinks = document.querySelectorAll('.nav-link');

// Get the content container
const contentDiv = document.getElementById('content');

// Add event listeners to each link
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior

        // Clear the content div
        contentDiv.innerHTML = '';

        // Get the ID of the clicked link
        const linkId = link.getAttribute('id');

        // Render content dynamically based on the link ID
        if (linkId === 'user') {
            contentDiv.innerHTML = `
                <h2>User Profile</h2>
                <p>Welcome to the user section. Here you can manage your profile and view user data.</p>
            `;
        } else if (linkId === 'settings') {
            contentDiv.innerHTML = `
                <h2>Settings</h2>
                <p>Manage your preferences, update your account settings, and configure options here.</p>
            `;
        } else {
            contentDiv.innerHTML = `
                <h2>Unknown Section</h2>
                <p>The section you clicked does not exist.</p>
            `;
        }
    });
});
