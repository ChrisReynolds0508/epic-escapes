const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',  // Change method to POST
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');  // Redirect to homepage after successful logout
  } else {
    alert(response.statusText);  // Display error message if something goes wrong
  }
};

document.querySelector('#logout').addEventListener('click', (event) => {
  event.preventDefault();  // Prevent the default link behavior
  logout();  // Call the logout function
});
