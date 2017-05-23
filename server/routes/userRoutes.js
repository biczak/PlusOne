// Put all routing for users here
const userRouter = require('express').Router();
const userUtils = require('../utils/userUtils.js')

const User = require('../models/user');


// Create route handles for users

/*
 * These two endpoints seem unnecessary. Implement?
 */
// userRouter.route('/')
//   /**
//    * When would we need to return a list of all users?
//    */
//   .get((req, res) => {
//       res.send('Returns a list of users.')
//   })
//   /**
//    * Do we need this, or just handle user creation in the /auth routes?
//    */
//   .post((req, res) => {
//       res.send('Create a user')
//   })

userRouter.route('/:userId')
  /**
   * Respond with different information if the request is made by the user, another user,
   * or someone who is not logged in?
   */
  .get((req, res) => {
      new User({id: req.params.userId}).fetch()
        .then(model => {
          if (model) {
            res.send(model);
          } else {
            res.status(404).send();
          }
        })
  })
  .put((req, res) => {
    new User({id: req.params.userId}).fetch()
      .then(model => {
        if (!model) {
          res.status(404).send();
        } else {
          return model;
        }
      })
      .then(model => {
        return model.save(req.body, {patch: true});
      })
      .then(model => {
        res.send(model)
      })
  })
  .delete((req, res) => {
    new User({id: req.params.userId}).fetch()
      .then(model => {
        if (!model) {
          res.status(404).send();
        } else {
          return model;
        }
      })
      .then(model => {
        return model.destroy();
      })
      .then(model => {
        res.send(model);
      })
  });

module.exports = userRouter;
