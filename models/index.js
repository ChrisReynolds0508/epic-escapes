const User = require('./user');
const Reviews = require('./review');

User.hasMany(Reviews, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Reviews.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Reviews };
