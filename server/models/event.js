// create bookshelf model of events from knex schema here
const db = require('../config/config');
const Attendee = require('./attendee.js');
const User = require('./user.js');
const EventTag = require('./eventTag.js');
const Category = require('./category.js');

const clone = require('lodash').clone;

const Event = db.Model.extend({
  tableName: 'event',
  hasTimestamps: true,
  users: function () {
    return this.belongsToMany(User).through(Attendee);
  },
  tags: function () {
    return this.hasMany(Tags).through(EventTag);
  },
  category: function () {
    return this.belongsTo(Category);
  },
  serialize: function (options) {
    const attrs = clone(this.attributes);
    if (options && options.shallow) return attrs;
    const relations = this.relations;
    for (let key in relations) {
      const relation = relations[key];
      attrs[key] = relation.toJSON ? relation.toJSON(options) : relation;
    }
    if (options && options.omitPivot) return attrs;
    if (this.pivot) {
      const pivot = this.parse(this.pivot.attributes);
      attrs.role = pivot.flag;
    }
    return attrs;
  },
});

module.exports = Event;
