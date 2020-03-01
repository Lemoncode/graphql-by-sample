const { MongoClient } = require('mongodb');

require('dotenv').config();


MongoClient.connect(process.env.MONGO_HOST, (err, client) => {
    const db = client.db(process.env.DB_NAME);
});