const router = require("express").Router();
const { user } = require("pg/lib/defaults");
const { User, Review, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render the list of reviews (used for dynamic updates)
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ["name"] }, { model: Comment, include: User }],
    });

    const plainReviews = reviews.map(review => review.get({ plain: true }));

    // Render a partial template that contains only the review list HTML
    res.render("partials/review-list", {
      reviews: plainReviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Existing route to render the homepage
// Route to get all reviews and render the homepage
// Route to get all reviews and render the homepage
router.get('/', async (req, res) => {
  try {
    console.log('Session Username on Homepage:', req.session.username);  // Check if the username is accessible

    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ['name'] }, { model: Comment, include: User }],
    });

    const user = await User.findByPk(req.session.user_id);

    res.render('homepage', {
      reviews: reviews.map(review => review.get({ plain: true })),
      logged_in: req.session.logged_in,
      username: user ? user.name : null // Pass the username to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// Route to post a new comment for a specific review
router.post('/review/:id/comments', withAuth, async (req, res) => {
  try {
    const { comment_text } = req.body;
    const { id: review_id } = req.params;
    const { user_id } = req.session;

    // Validate input
    if (!comment_text || !review_id || !user_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newComment = await Comment.create({
      comment_text,
      review_id,
      user_id,  // Associate the comment with the logged-in user
    });

    res.status(200).json(newComment);  // Return the newly created comment
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to post comment.', error: err.message });
  }
});

// route to specific review and get all commetns and their users' names
router.get("/review/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: Comment, include: User }]
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get all reviews and render the homepage
router.get('/homepage', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['name'] }, { model: Comment, include: User }],
    });

    const user = await User.findByPk(req.session.user_id);

    res.render('homepage', {
      reviews: reviews.map(review => review.get({ plain: true })),
      logged_in: req.session.logged_in,
      username: user ? user.name : null // Pass the username to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// get login page validation
router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/homepage");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get signup page 
router.get("/signup", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/homepage");
      return;
    }
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/review", withAuth, async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ['name'] }],  // Fetch associated user
    });

    res.render("review", {
      reviews: reviews.map(review => review.get({ plain: true })),  // Pass plain objects
      logged_in: req.session.logged_in,
      username: req.session.username,  // Pass the username to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
