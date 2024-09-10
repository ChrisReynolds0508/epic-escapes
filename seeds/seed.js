const sequelize = require('../config/connection');
const { User, Reviews, Comment } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const reviews = [];

  for (const review of reviewData) {
    const createdReview = await Reviews.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    reviews.push(createdReview);
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      review_id: reviews[Math.floor(Math.random() * reviews.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();