const MongoClient = require('mongodb').MongoClient;

const url = process.env.ATLAS_CONNECTION;

const dbName = 'sonic-acuity';
const colName = 'tracks';

const settings = { useUnifiedTopology: true };

const invalidTrack = (track) => {
    let result;
    if(!track.track_title) {
        result = "Enter the track title.";
    } else if (!track.artist) {
        result = "Enter the artist name.";
    } else if (!track.album) {
        result = "Enter the album name.";
    } else if (!track.genre) {
        result = "Enter the genre";
    } else if (!track.year_released) {
        result = "Enter the release year.";
    } else if (isNaN(track.year_released) == true) {
        result = "Enter the correct release year."
    } else if (!track.description) {
        result = "Enter function description."
    };
};

const addTrack = (tracks) => {
    const iou = new Promise((resolve, reject) => {
        if (!Array.isArray(tracks)) {
            reject({ error: "Send an array of tracks" });
        } else {
            const invalidTracks = tracks.filter((track) => {
                const check = invalidTrack(track);
                if (check) {
                    track.invalid = check;
                };
                return track.invalid;
            });
            if (invalidTracks.legth > 0) {
                reject({
                    error: "The tracks were invalid",
                    data: invalidTracks
                });
            } else {
                MongoClient.connect(url, settings, async function(err, client) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Connected successfully to server to POST tracks");
                        const db = client.db(dbName);
                        const collection = db.collection(colName);
                        tracks.forEach((track) => {
                            track.date_added = new Date(Date.now()).toUTCString();
                        });
                        const results = await collection.insertMany(tracks);
                        resolve(results.ops);
                    };
                });
            };
        };
    });
    return iou;
};

module.exports = addTrack;