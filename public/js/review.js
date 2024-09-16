document.addEventListener("DOMContentLoaded", () => {
  // Handle new review submission
  const newFormHandler = async event => {
    event.preventDefault();

    const city_name = document.querySelector("#city_name").value.trim();
    const review = document.querySelector("#review").value.trim();

    if (city_name && review) {
      alert("Review submitted successfully");
      const response = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({ city_name, review }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        document.location.reload(); // Reload the page after successful post
      } else {
        alert("Failed to create review");
      }
    }
  };

  // Handle delete review
  const delButtonHandler = async event => {
    // Ensure we're targeting the delete button
    if (event.target.matches(".btn-delete")) {
      const reviewId = event.target.getAttribute("data-id");

      if (reviewId) {
        const response = await fetch(`/api/review/${reviewId}`, {
          method: "DELETE"
        });

        if (response.ok) {
          alert("Review deleted successfully");
          document.location.reload(); // Reload the page after deletion
        } else {
          alert("You can only delete your own reviews");
        }
      }
    }
  };

  // Attach event listener for new review submission
  document
    .querySelector(".new-review-form")
    .addEventListener("submit", newFormHandler);

  // Attach event listener for delete button click
  document
    .querySelector(".review-list")
    .addEventListener("click", delButtonHandler);
});
