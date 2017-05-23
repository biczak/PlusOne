// create bookshelf model of eventTags from knex schema here
const db = require('../config/config');
const SkillRating = require('./skillRating.js')
const EventTag = require('./eventTag.js')

let Tag = db.Model.extend({
    tableName: 'tag',
    hasTimestamps: true,
    skillRating: () => this.hasMany(SkillRating),
    events: () => this.hasMany(Event).through(EventTag),
});

module.exports = Tag;