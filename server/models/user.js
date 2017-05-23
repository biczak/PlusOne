// create bookshelf model of user from knex schema here
const db = require('../config/config');
const Event = require('./event.js');
const Attendee = require('./attendee.js');
const UserRating = require('./userRating.js');
const SkillRating = require('./skillRating.js');

let User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  events: function() {
    return this.belongsToMany(Event).through(Attendee).withPivot(['flag']);
  },
  createdEvents: function () {
    return this.belongsToMany(Event).through(Attendee).query({ where: { flag: 'creator' } });
  },
  userRatings: function () {
    return this.hasMany(UserRating);
  },
  skillRatings: function () {
    return this.hasMany(SkillRating);
  },
});

module.exports = User;