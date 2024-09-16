const router = require("express").Router();
const { User } = require("../../models");
const { ValidationError } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err.message);  // Log the error for debugging
    res.status(500).json({ message: "Failed to log in. Please try again." });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      // Log all validation errors
      console.error('Validation errors:', err.errors.map(e => e.message));
      res.status(400).json({ message: err.errors[0].message });
    } else {
      console.error('Error during sign-up:', err);
      res.status(500).json({ message: "Failed to sign up. Please try again." });
    }
  }
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
