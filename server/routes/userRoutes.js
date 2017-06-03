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
//   })req.session

userRouter.route('/')
  .put((req, res) => {
    console.log('This is in req.body:')
    console.log(req.body)
    if (!req.session.user_id) res.status(403).send();

    new User({ id: req.session.user_id }).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model;
      })
      .then((model) => {
        return model.save(req.body, { patch: true });
      })
      .then((model) => {
        console.log('This is what the db returned')
        console.log(model.attributes)
        res.send(model);
      });
  });

userRouter.route('/:userId')
  /**
   * Respond with different information if the request is made by the user, another user,
   * or someone who is not logged in?
   */
  .post((req, res) => {
    const message = JSON.parse(JSON.stringify(req.body.message));
    new User().where({ id: message.targetUser }).fetch()
      .then((model) => {
        if (model.attributes.messages === '') {
          model.set('messages', [message]);
        } else {
          
           model.set('messages', JSON.stringify([message]));
        }
        model.save();
      });
  })
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
  .delete((req, res) => {
    new User({ id: req.params.user_id }).fetch()
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
