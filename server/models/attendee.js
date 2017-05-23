// create bookshelf model of waitList from knex schema here
const db = require('../config/config');
const User = require('./user')
const Event = require('./event')

let Attendee = db.Model.extend({
  tableName: 'attendee',
  hasTimestamps: true,
  users: function () {
    return this.belongsToMany(User);
  },
  events: function () {
    return this.belongsToMany(Event);
  },
});

module.exports = Attendee;