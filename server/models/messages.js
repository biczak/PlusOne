// create bookshelf model of userRating from knex schema here
const db = require('../config/config');
const User = require('./user')

let Message = db.Model.extend({
    tableName: 'messages',
    hasTimestamps: true,
    sender_id: () => this.belongsTo(User),
    recipient_id: () => this.belongsTo(User),
});

module.exports = Message;