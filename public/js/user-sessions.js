// Function to fetch session data
async function getSessionData() {
    try {
        const response = await fetch('https://taskforcewallet-webapp.onrender.com/api/users/user-sessions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',  // Ensures cookies/session data is sent with the request
        });

        const data = await response.json();

        if (response.ok) {
            // Display session data
            const { id, firstname, lastname, email } = data.sessions.user;  // Assuming 'user' object is in session
            console.log('data',id, firstname, lastname, email)
            document.getElementById('username').innerText = `${firstname} ${lastname}`;
            document.getElementById('userId').innerText = `ID: ${id}`;
            document.getElementById('userEmail').innerText = `Email: ${email}`;
        } else {
            // Handle case where session doesn't exist or no user is logged in
            document.getElementById('session-info').innerText = 'No active session found.';
        }
    } catch (error) {
        console.error('Error fetching session data:', error);
    }
}

// Call the function when the page loads
window.onload = function() {
    getSessionData();
};