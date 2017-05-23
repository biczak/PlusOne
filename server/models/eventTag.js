// create bookshelf model of tagEventJoin from knex schema here
const db = require('../config/config');
const Tag = require('./tag');
const Event = require('./event');

let EventTag = db.Model.extend({
    tableName: 'event_tag',
    hasTimestamps: true,
    tags: () => this.belongsToMany(Tag),
    events: () => this.belongsToMany(Event)
});

module.exports = EventTag;