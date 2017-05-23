// create bookshelf model of userRating from knex schema here
const db = require('../config/config');
const User = require('./user')

let UserRating = db.Model.extend({
    tableName: 'user_rating',
    hasTimestamps: true,
    rater: () => this.belongsTo(User),
    ratee: () => this.belongsTo(User),
});

module.exports = UserRating;