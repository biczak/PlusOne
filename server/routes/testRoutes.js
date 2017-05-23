// Put all routing for user skill and peer ratings here// Put all routing for events here
const testRouter = require('express').Router();
const User = require('../models/user')
const Event = require('../models/event')
const Attendee = require('../models/attendee')
const Category = require('../models/category')
const Tag = require('../models/tag')
const SkillRating = require('../models/skillRating')
const UserRating = require('../models/userRating')
const EventTag = require('../models/eventTag')


// Create route handles user ratings

testRouter.post('/test/users', (req, res) => {
  req.body.data.forEach(obj => {
    new User(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/attendees', (req, res) => {
  req.body.data.forEach(obj => {
    new Attendee(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/categories', (req, res) => {
  req.body.data.forEach(obj => {
    new Category(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/events', (req, res) => {
  req.body.data.forEach(obj => {
    new Event(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/eventTags', (req, res) => {
  req.body.data.forEach(obj => {
    new EventTag(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/skillRatings', (req, res) => {
  req.body.data.forEach(obj => {
    new SkillRating(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/tags', (req, res) => {
  req.body.data.forEach(obj => {
    new Tag(obj).save().then(model => console.log(model))
  })
});
testRouter.post('/test/userRatings', (req, res) => {
  req.body.data.forEach(obj => {
    new UserRating(obj).save().then(model => console.log(model))
  })
});



module.exports = testRouter;
