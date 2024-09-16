const loginFormHandler = async event => {
  event.preventDefault();

  // Get the values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
    if (email && password) {
      // Send a POST request to the login route
      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok && response.status !== 400) {
        document.location.replace("/homepage"); // Redirect after successful login
      } else {
        alert("Failed to log in. Please check your email and password.");
      }
    } else {
      alert(
        "Please enter both email and password to log in, and please enter correct email or passowrd."
      );
      return;
    }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
