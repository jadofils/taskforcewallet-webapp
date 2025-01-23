document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('#email').value.trim();
  const password = form.querySelector('#password').value.trim();

  if (!email || !password) {
    alert('Both fields are required.');
    return;
  }

  const loginData = { email, password };
  const submitButton = form.querySelector('button');
  
  try {
    submitButton.innerHTML = `<div class="spinner"></div> Login`;
    submitButton.disabled = true; 
    submitButton.style.backgroundColor = '#ff7200';

    const remote = "https://taskforcewallet-webapp.onrender.com";
    const local = "https://taskforcewallet-webapp.onrender.com";
    const response = await fetch(`${remote}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login successful");
      form.reset();
    
      if (response.ok) {
        alert("Token Verification")
        window.location.href = '/admin-page';  // Redirect to admin page on successful verification
      }
    } else {
      alert(data.message || 'Login failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login.');
  } finally {
    submitButton.innerHTML = 'Login';
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '';
  }
});
