// create bookshelf model of skillRatings from knex schema here
const db = require('../config/config');
const User = require('./user.js');
const Tag = require('./tag.js');

let SkillRating = db.Model.extend({
    tableName: 'skill_rating',
    hasTimestamps: true,
    user: () => this.belongsTo(User),
    tag: () => this.belongsTo(Tag)
});

module.exports = SkillRating;