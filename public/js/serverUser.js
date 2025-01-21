document.addEventListener('DOMContentLoaded', (event) => {
    // Add event listener for form submission
    document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way
  
      const form = event.target;
  
      const newUser = {
        first_name: form.firstname.value.trim(),
        last_name: form.lastname.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value.trim(),
      };
  
      fetch('https://taskforcewallet-webapp.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Registration successful!');
          // Redirect or perform other actions
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
  