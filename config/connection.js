const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const state = {
    db: null,
    store: null
};

module.exports.connect = function(done) {
    const url = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
    const dbname = 'shopping';

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) return done(err);
        state.db = client.db(dbname);

        // Initialize MongoDBStore for session storage
        state.store = new MongoDBStore({
            uri: url,
            collection: 'sessions' // Collection name to store sessions
        });

        done();
    });
};

module.exports.get = function() {
    return state.db;
};

module.exports.getSessionStore = function() {
    return state.store;
};
