const { MongoClient } = require('mongodb');
const fs = MongoClient;

const database = 'mongodb://localhost:27017';
// const database = 'mongodb://lab123:lab123@ds259255.mlab.com:59255/weatherapp';
//const database = 'mongodb://paulc:abc123@ds129801.mlab.com:29801/placesdb';

const appname = 'placesdb';
const collectionname = 'placescollection';

const saveData = newdata => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        const length = newdata.length;
        for (var i = 0; i < length; i++) {
          db.collection(collectionname).insertOne(newdata[i], (err, result) => {
            if (err) {
              reject('Unable to insert');
            }
          });
        }

        resolve(1);

        client.close();
      }
    );
  });
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        db.collection(collectionname)
          .find()
          .toArray()
          .then(
            docs => {
              resolve(docs);
            },
            err => {
              reject('Unable to fetch docs');
            }
          );

        client.close();
      }
    );
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        db.collection(collectionname)
          .remove({})
          .then(
            result => {
              resolve(result);
            },
            err => {
              reject('Unable to delete');
            }
          );

        client.close();
      }
    );
  });
};

module.exports = {
  saveData,
  getAllData,
  deleteAll
};
