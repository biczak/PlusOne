// create collection from user table 
const db = require('../config/config');
const User = require('../models/user');

const Users = new db.Collection();

Users.model = User;

module.exports = Users;