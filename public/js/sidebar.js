// Select all nav links
const navLinks = document.querySelectorAll('.nav-link');

// Get the content container
const contentDiv = document.getElementById('content');

// Select the containers to hide
const tableContainers = document.getElementsByClassName('table-container');
const cardsContainers = document.getElementsByClassName('cards-container');
const canvasContainers = document.getElementsByClassName('container');

// Add event listeners to each link
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior

        // Get the ID of the clicked link
        const linkId = link.getAttribute('id');

        // Determine which HTML file to fetch
        let fileToFetch;
        if (linkId === 'user') {
            fileToFetch = '../dashboard/sidebarForms/user.html';
        } else  if (linkId === 'account') {
            fileToFetch = '../dashboard/sidebarForms/accounts.html';
        } 
        else if (linkId === 'settings') {
            fileToFetch = '../dashboard/sidebarForms/settings.html';
        }
        else if (linkId === 'budget') {
            fileToFetch = '../dashboard/sidebarForms/budgets.html';
        }
        else if (linkId === 'transaction') {
            fileToFetch = '../dashboard/sidebarForms/transactions.html';
        }
        else if (linkId === 'category') {
            fileToFetch = '../dashboard/sidebarForms/category.html';
        }
        else if (linkId === 'report') {
            fileToFetch = '../dashboard/sidebarForms/report.html';
        }
        else if (linkId === 'interest') {
            fileToFetch = '../dashboard/sidebarForms/interest.html';
        }
        else if (linkId === 'loan') {
            fileToFetch = '../dashboard/sidebarForms/loan.html';
        }
        else if (linkId === 'balance') {
            fileToFetch = '../dashboard/sidebarForms/balance.html';
        }
        else if (linkId === 'withdraw') {
            fileToFetch = '../dashboard/sidebarForms/withdraw.html';
        }
        else if (linkId === 'forgetpassword') {
            fileToFetch = '../dashboard/sidebarForms/forgetpassword.html';
        }

        else {
            contentDiv.innerHTML = '<p>Content not available.</p>';
            return;
        }

        // Hide all specified containers
        [...tableContainers, ...cardsContainers, ...canvasContainers].forEach(container => {
            container.style.display = 'none';
        });

        // Fetch the HTML file and load it into the content div
        fetch(fileToFetch)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
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
