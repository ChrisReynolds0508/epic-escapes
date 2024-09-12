const loginFormHandler = async event => {
  event.preventDefault();

  // Collect values from the login form
  const comment = document.querySelector("#comment-box").value.trim();


  if (comment) {
    if (comment.length > 1000) {
      alert("Password must be at most 1000 characters long");
      return;
    }
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", loginFormHandler);
