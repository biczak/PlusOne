// create collection from tagEventJoin table 
const db = require('../config/config');
const EventTag = require('../models/eventTag');

const EventTags = new db.Collection();

EventTags.model = Event;

module.exports = EventTags;