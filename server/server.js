// MODULES ==================================================
require('dotenv').config();
const express = require('express');

const app = express();

// CONFIGURATION =============================================
// configure our server with all the middlware and routing
require('./config/auth')(app);
require('./config/middleware.js')(app, express);



// Sets the port to either the Process environment's or 3000
const port = process.env.PORT || 3000;

// Run the Server and console.log the port;
if (!module.parent) {
  app.listen(port);
  console.log('Listening on port: ', port);
}

module.exports = app;
