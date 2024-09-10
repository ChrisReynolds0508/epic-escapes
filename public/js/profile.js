const newFormHandler = async event => {
  event.preventDefault();

  const city_name = document.querySelector("#review-name").value.trim();
  const review = document.querySelector("#review-desc").value.trim();

  if (city_name && review) {
    const response = await fetch(`/api/reviews`, {
      method: "POST",
      body: JSON.stringify({ city_name, review }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      document.location.replace("/profile");
      console.log(response.body);
    } else {
      alert("Failed to create project");
    }
  }
};

const delButtonHandler = async event => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/reviews/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete review");
    }
  }
};

document
  .querySelector(".new-review-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".review-list")
  .addEventListener("click", delButtonHandler);
