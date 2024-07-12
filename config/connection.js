const { MongoClient } = require('mongodb');

const state = {
    db: null
};

module.exports.connect = async function (done) {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'shopping';

    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        state.db = client.db(dbName);
        console.log('MongoDB connected successfully');
        done();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        done(err);
    }
};

module.exports.get = function () {
    return state.db;
};


