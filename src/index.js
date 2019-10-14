require('dotenv').config();

const express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  PORT = process.env.PORT;

const { PropertyManagerFromENV, PropertyManager } = require('config-properties-manager');
const { ConfigSchema } = require('./schema/config-schema');

try {
  PropertyManager.config({
    source: PropertyManagerFromENV,
    requiredProperties: ConfigSchema.requiredProperties
  });
  global.config = PropertyManager.init();
  console.log('All required config properties are set!');
} catch(error) {
  console.log(error.message);
  process.exit(1);
}

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('This is an express app!');
});

app.get('/test', (req, res, next) => {
  res.send('This is a test express app!');
});

const server = http.createServer(app).listen(PORT);
server.on('listening', onListening);

function onListening() {
  console.log(`App Listening on PORT ${PORT}`);
}

module.exports = app;
