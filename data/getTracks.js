const MongoClient = require('mongodb').MongoClient;

const url = process.env.ATLAS_CONNECTION;

const dbName = 'sonic-acuity';
const colName = 'tracks';

const settings = { useUnifiedTopology: true };

const getTracks = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to GET Tracks");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Found the following records");
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

module.exports = getTracks;