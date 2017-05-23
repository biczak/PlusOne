// Put all routing for events here
const eventRouter = require('express').Router();
const eventUtils = require('../utils/eventUtils.js')
const Event = require('../models/event');
const eventHandlers = require('../handlers/eventHandlers.js')

// Create route handles for events

eventRouter.route('/')
  .get(eventHandlers.getEventList)
  .post(eventHandlers.createEvent);

eventRouter.route('/join/:eventId')
  .post(eventHandlers.joinEvent);

eventRouter.route('/attendees')
  .put(eventHandlers.editAttendees);

eventRouter.route('/:eventId')
  .get(eventHandlers.getEvent)
  .put(eventHandlers.updateEvent)
  .delete(eventHandlers.deleteEvent);


module.exports = eventRouter;
