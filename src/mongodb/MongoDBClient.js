const MongoClient = require('mongodb').MongoClient;

let _db;

module.exports = {
  connect: async (url, dbName) => {
    const client = new MongoClient(url, {
      useNewUrlParser: true
    });
    try {
      await client.connect();
      console.log('Connected successfully to MongoDB');
      _db = client.db(dbName);
    } catch (err) {
      console.log(err.stack);
    }
  },
  insert: async (collectionName, alert) => {
    try {
      await _db.collection(collectionName).insertOne(alert);
    } catch (err) {
      console.log(err.stack);
    }
  }
};
