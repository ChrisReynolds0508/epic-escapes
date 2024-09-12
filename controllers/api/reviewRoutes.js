const router = require('express').Router();
const { Reviews, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Reviews.findAll({
      include: [{ model: Comments }],
    });

    res.status(200).json(reviewData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
}
);

router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Reviews.findByPk(req.params.id);

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);
router.post('/', async (req, res) => {
  try {
    const newReview = await Reviews.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(newReview);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Reviews.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
