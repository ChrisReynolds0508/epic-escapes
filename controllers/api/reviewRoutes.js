const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to create a new review (returns JSON)
router.post("/", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      city_name: req.body.city_name,
      review: req.body.review, 
      user_id: req.session.user_id,
    });
    res.status(200).json(newReview);  // Return JSON data, no redirection
  } catch (err) {
    res.status(400).json(err);
  } 
});

// DELETE route to delete a review (returns JSON)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
