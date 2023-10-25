const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://fwadino:MfoyEltchgPwe8tm@cluster0.naosiia.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db

async function mongoConnection() {
  try {
    const database = client.db('news_db');
    db = database
  } catch(err) {
    await client.close();
  }
}


function getDb(){
    return db
}

module.exports = {
    mongoConnection,
    getDb
}