const db = require('../config/config');
const Event = require('../models/event');
const Attendee = require('../models/attendee.js');

module.exports = {

  createEvent: (req, res) => {
    const eventObj = req.body;
    if (!['title', 'description', 'date_time'].every(k => k in eventObj)) {
      res.status(400).send();
    } else {
      // Assumes the category field is an integer value referencing a category ID.
      eventObj.full = false;
      new Event(eventObj).save()
        .then((model) => {
          console.log('New event', model.attributes);
          new Attendee({
            event_id: parseInt(model.attributes.id, 10),
            user_id: req.session.user_id,
            flag: 'creator',
          }).save();
          return model;
        })
        .then((model) => {
          res.send(model);
        });
    }
  },

  getEventList: (req, res) => {
    /*
    * takes a query param: page. Return 5 events at a time.
    * Increase to 50 once things are working.
    *
    * Add a query param for category or tags? Return 50 events
    * satisfying that search.
    */
    new Event().fetchPage({
      pageSize: 5,
      page: req.query.page || 1,
    })
      .then((models) => {
        res.send(models);
      });
  },

/**
 * getEvent should respond with attendee data, but the models are broken
 * and the query cannot be run with `{ withRelated: 'users' }`
 */

  getEvent: (req, res) => {
    const eventId = req.params.eventId;
    Event.where('id', eventId).fetch()
      .then((model) => {
        res.send(model);
      })
      .catch(err => console.error('There has been a terrible error: ----------', err));
  },

  updateEvent: (req, res) => {
    Event.where('id', req.params.eventId).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send()
        } else {
          return model.save(req.body, { patch: true });
        }
      })
      .then((model) => {
        res.send(model);
      });
  },

  deleteEvent: (req, res) => {
    Event.where('id', parseInt(req.params.eventId, 10)).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model.destroy();
      })
      .then((model) => {
        res.send(model);
      });
  },

  joinEvent: (req, res) => {
    new Attendee({
      event_id: req.params.eventId,
      user_id: req.session.user_id,
      flag: 'pending',
    })
    .save()
    .then((model) => {
      res.send(model);
    });
  },

  editAttendees: (req, res) => {
    const { id, flag } = req.body;
    new Attendee({ id }).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model.save({ flag }, { patch: true });
      })
    .then((model) => {
      res.send(model);
    });
  },
};
