const User = require("./user");
const Review = require("./review");
const Comment = require("./comment");

// User has many Reviews
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// Reviews belongs to User
Review.belongsTo(User, {
  foreignKey: "user_id"
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: "user_id"
});

// Reviews has many Comments
Review.hasMany(Comment, {
  foreignKey: "review_id",
  onDelete: "CASCADE"
});

// Comment belongs to Reviews
Comment.belongsTo(Review, {
  foreignKey: "review_id"
});

module.exports = { User, Review, Comment };
