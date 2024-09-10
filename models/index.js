const User = require('./user');
const Reviews = require('./review');
const Comment = require('./comment');

// User has many Reviews
User.hasMany(Reviews, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Reviews belongs to User
Reviews.belongsTo(User, {
  foreignKey: 'user_id'
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// Reviews has many Comments
Reviews.hasMany(Comment, {
  foreignKey: 'review_id',
  onDelete: 'CASCADE'
});

// Comment belongs to Reviews
Comment.belongsTo(Reviews, {
  foreignKey: 'review_id'
});

module.exports = { User, Reviews, Comment };