const User = require('./user');
const Reviews = require('./review');
const Comments = require('./comment');

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
User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Comment belongs to User
Comments.belongsTo(User, {
  foreignKey: 'user_id'
});

// Reviews has many Comments
Reviews.hasMany(Comments, {
  foreignKey: 'review_id',
  onDelete: 'CASCADE'
});

// Comment belongs to Reviews
Comments.belongsTo(Reviews, {
  foreignKey: 'review_id'
});

module.exports = { User, Reviews, Comments };