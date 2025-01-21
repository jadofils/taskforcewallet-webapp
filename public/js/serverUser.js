document.addEventListener('DOMContentLoaded', (event) => {
  // Add event listener for form submission
  document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way

      const form = event.target;
      
      // Collect form data
      const newUser = {
          firstname: form.firstname.value.trim(),
          lastname: form.lastname.value.trim(),
          username: form.username.value.trim(),  // Assuming username is unique and not required for registration
          email: form.email.value.trim(),
          password: form.password.value.trim(),
      };

      // Validate that all fields are filled (basic check)
      if (!newUser.firstname || !newUser.lastname ||!newUser.username|| !newUser.email || !newUser.password) {
          alert('Please fill in all fields.');
          return;
      }

      // Make the POST request to the backend
      fetch(`https://taskforcewallet-webapp.onrender.com/api/v1/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Registration successful!');
              // Redirect to a different page or perform other actions
              // window.location.href = '/dashboard';  // Example redirect
          } else {
              alert('Registration failed: ' + data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while registering.');
      });
  });
});
