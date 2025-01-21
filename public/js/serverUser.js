document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.target;
        const newUser = {
            firstname: form.firstname.value.trim(),
            lastname: form.lastname.value.trim(),
            username: form.username.value.trim(),
            email: form.email.value.trim(),
            password: form.password.value.trim(),
        };

        const validationResult = validateForm(newUser);
        if (!validationResult.isValid) {
            alert(validationResult.message);
            return;
        }

        try {
            const response = await fetch('https://taskforcewallet-webapp.onrender.com/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            const data = await response.json();

            if (data.success) {
                alert(data.message); // Show success message
            } else {
                alert('Registration failed: ' + data.message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        }
    });

    function validateForm(data) {
        if (!data.firstname) return { isValid: false, message: 'First name is required.' };
        if (!data.lastname) return { isValid: false, message: 'Last name is required.' };
        if (!data.username) return { isValid: false, message: 'Username is required.' };
        if (!data.email) return { isValid: false, message: 'Email is required.' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { isValid: false, message: 'Invalid email format.' };
        if (!data.password) return { isValid: false, message: 'Password is required.' };
        if (data.password.length < 6) return { isValid: false, message: 'Password must be at least 6 characters long.' };

        return { isValid: true };
    }
});
