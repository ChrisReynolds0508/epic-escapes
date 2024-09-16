document.addEventListener("DOMContentLoaded", () => {
  const newCommentHandler = async event => {
    event.preventDefault();

    const reviewId = event.target.getAttribute("data-id");
    const commentText = document.querySelector(`#comment-box-${reviewId}`).value.trim();

    if (commentText) {
      const response = await fetch(`/review/${reviewId}/comments`, {
        method: "POST",
        body: JSON.stringify({ comment_text: commentText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const newComment = await response.json();  // Only parse JSON if it's actually JSON

        // Remove "No comments yet" message if it exists
        const noCommentsMessage = document.querySelector(`#no-comments-${reviewId}`);
        if (noCommentsMessage) {
          noCommentsMessage.remove();
        }

        // Append the new comment to the comment list
        const commentList = document.querySelector(`.comment-list[data-id="${reviewId}"]`);
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `<p>${newComment.comment_text} by You</p>`;
        commentList.appendChild(commentItem);

        // Clear the comment input field
        document.querySelector(`#comment-box-${reviewId}`).value = '';
      } else {
        // If the response is not JSON, log it to the console to inspect
        const responseText = await response.text();  // Get the HTML response
        console.log("Non-JSON response:", responseText);
        alert("You can't comment without login or sign up.");
      }
    }
  };

  // Attach event listener to all comment forms
  document.querySelectorAll(".new-comment-form").forEach(form => {
    form.addEventListener("submit", newCommentHandler);
  });
});
