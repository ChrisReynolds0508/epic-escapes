const router = require("express").Router();
const { Reviews, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const reviewData = await Reviews.findAll({
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });

    // Serialize data so the template can read it
    const reviews = reviewData.map(review => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      reviews,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/reviews/:id", async (req, res) => {
  try {
    const reviewData = await Reviews.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });

    const review = reviewData.get({ plain: true });

    res.render("review", {
      ...review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Reviews }]
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

// add auth to /comment
router.get("/comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });
    // Find the logged in user based on the session ID
    const comment = commentData.get({ plain: true });

    res.render("comment", {
      ...comment,
      logged_in: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
