document.addEventListener("DOMContentLoaded", () => {
  const newCommentHandler = async event => {
    event.preventDefault();

    const reviewId = event.target.getAttribute("data-id");
    const commentText = document
      .querySelector(`#comment-box-${reviewId}`)
      .value.trim();

    // Basic validation for empty comment
    if (!commentText) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`/review/${reviewId}/comments`, {
        method: "POST",
        body: JSON.stringify({ comment_text: commentText }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const newComment = await response.json();

        // Remove "No comments yet" message if it exists
        const noCommentsMessage = document.querySelector(
          `#no-comments-${reviewId}`
        );
        if (noCommentsMessage) {
          noCommentsMessage.remove();
        }

        // Append the new comment to the comment list
        const commentList = document.querySelector(
          `.comment-list[data-id="${reviewId}"]`
        );
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `<p>${newComment.comment_text} by You</p>`;
        commentList.appendChild(commentItem);

        // Clear the comment input field
        document.querySelector(`#comment-box-${reviewId}`).value = "";
      } else {
        const responseText = await response.text();
        console.error("Server response error:", responseText);
        alert("You can't comment without login or sign up.");
      }
    } catch (error) {
      console.error("Error while submitting comment:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  document.querySelectorAll(".new-comment-form").forEach(form => {
    form.addEventListener("submit", newCommentHandler);
  });
});
