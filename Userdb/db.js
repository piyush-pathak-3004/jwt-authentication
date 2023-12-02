const mongoose = require('mongoose');

const host = '127.0.0.1';
const port = '27017';
const database = 'mongodb';
const dbName = 'userdb';

const url = `${database}://${host}:${port}/${dbName}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('successfully connected to db...'))
  .catch((e) => console.log(`error in connecting db${e.message}`));
