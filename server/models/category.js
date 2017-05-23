// create bookshelf model of categories from knex schema here
const db = require('../config/config');
const Event = require('./event.js')

let Category = db.Model.extend({
    tableName: 'category',
    hasTimestamps: true,
    events: () => this.hasMany(Event)
});

module.exports = Category;