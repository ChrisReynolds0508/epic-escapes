const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get the values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the login route
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage'); // Redirect after successful login
    } else {
      alert('Failed to log in. Please check your email and password.');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
