// Select all nav links
const navLinks = document.querySelectorAll('.nav-link');

// Get the content container
const contentDiv = document.getElementById('content');

// Select the containers to hide
const tableContainer = document.getElementsByClassName('table-container');
const cardsContainer = document.getElementsByClassName('cards-container');
const canvasContainer = document.getElementsByClassName('canvas-container');

// Add event listeners to each link
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior

      

        // Get the ID of the clicked link
        const linkId = link.getAttribute('id');

        // Determine which HTML file to fetch
        let fileToFetch;
        if (linkId === 'user') {
            fileToFetch = 'user.html';
              // Hide all specified containers
        tableContainer.style.display = 'none';
        cardsContainer.style.display = 'none';
        canvasContainer.style.display = 'none';
        } else if (linkId === 'settings') {
            fileToFetch = 'settings';
        } else {
            contentDiv.innerHTML = '<p>Content not available.</p>';
            return;
        }

        // Fetch the HTML file and load it into the content div
        fetch(fileToFetch)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                // Show the fetched content
                contentDiv.innerHTML = html;
                contentDiv.style.display = 'block';
            })
            .catch(error => {
                console.error('Fetch error:', error);
                contentDiv.innerHTML = '<p>Failed to load content.</p>';
                contentDiv.style.display = 'block';
            });
    });
});