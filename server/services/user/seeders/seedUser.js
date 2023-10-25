const { MongoClient } = require("mongodb");
const userData = require('./_Users__202310121607.json')

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('news_db');
    const users = database.collection('users');
    const option = {ordered: true}
    await users.insertMany(userData, option);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);