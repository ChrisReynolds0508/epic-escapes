const moment = require('moment');

module.exports = {
  format_date: (date) => {
    // Format date as relative time using moment
    return moment(date).fromNow();
  },
};