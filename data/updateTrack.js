const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.ATLAS_CONNECTION;

const dbName = 'sonic-acuity';
const colName = 'tracks';

const settings = { useUnifiedTopology: true };

const updateTrack = (id, track) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to PUT a track");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({ _id: ObjectID(id) }, 
                    track,
                    { upsert: true },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ updated_id: id });
                            client.close();
                        };
                    }
                );
            };
        });
    });
    return iou;
};

const updateTrackValue = (id, track) => {

};

module.exports = {
    updateTrack,
    updateTrackValue
}