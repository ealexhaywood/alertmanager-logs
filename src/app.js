const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3005;
const config = require('../config.json');

const mongoDbClient = require('./mongodb/MongoDBClient');


const initializeClients = () => {
  if (config.mongodb.enabled) {
    mongoDbClient.connect(config.mongodb.url, config.mongodb.dbName);
  }
};

app.use(bodyParser.json());

app.post('/alerts', (req, res) => {
  let alerts = req.body;
  // Do stuff with alerts
  console.log(alerts);

  if (config.mongodb.enabled) {
    mongoDbClient.insert(config.mongodb.collectionName, alerts)
  }

  res.status(200).send(alerts);
});

app.listen(port, () => {
  initializeClients();
  console.log(`Listening on port ${port}`);
});
