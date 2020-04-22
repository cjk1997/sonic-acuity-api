const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.ATLAS_CONNECTION;

const dbName = 'sonic-acuity';
const colName = 'tracks';

const settings = { useUnifiedTopology: true }

const deleteTrack = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to DELETE a track");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                try {
                    const _id = new ObjectID(id);
                    collection.findOneAndDelete({ _id }, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            if(data.lastErrorObject.n > 0) {
                                resolve(data.value);
                            } else {
                                resolve({ error: "ID doesn't exist" });
                            };
                        };
                    });
                } catch {
                    console.log(data);
                    reject({ error: "ID has to be in ObjectID format" })
                }
            }
        })
    })
    return iou;
};

module.exports = deleteTrack;