document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();  // Prevent the default link behavior
      logout();  // Call the logout function
    });
  }
});

// Define the logout function
async function logout() {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}