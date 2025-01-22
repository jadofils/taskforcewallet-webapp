
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  const email = form.querySelector('#email').value.trim();
  const password = form.querySelector('#password').value.trim();

  // Validate the email and password fields
  if (!email || !password) {
      alert('Both fields are required.');
      return;
  }

  // Construct login data
  const loginData = { email, password };

  const submitButton = form.querySelector('button');

  try {
      // Show loading spinner on the button
      submitButton.innerHTML = `<div class="spinner"></div> Login`;
      submitButton.disabled = true; // Disable button to prevent multiple clicks
      submitButton.style.backgroundColor = '#ff7200'; // Set background color to #ff7200

      // Send the login request
      const response = await fetch('https://taskforcewallet-webapp.onrender.com/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
          // Successful login
          alert(data.message); // "Login successful"
          
          // Store token and user details in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          // Reset the form fields
          form.reset();

          // Redirect to your dashboard or another page
          window.location.href = '/dashboard';  // Adjust the URL as needed
      } else {
          // Failed login (e.g., user not found, invalid credentials)
          alert(data.message); // Display error message from backend (e.g., "User not found")
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
  } finally {
      // Hide the spinner and re-enable the button after the process is complete
      submitButton.innerHTML = 'Login';  // Reset the button text
      submitButton.disabled = false; // Re-enable the button
      submitButton.style.backgroundColor = ''; // Reset background color
  }
});