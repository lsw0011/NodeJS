const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let uri = "mongodb+srv://luke:ouwOaTJhmBu4W4wm@cluster-71glu.mongodb.net/test?retryWrites=true";

let _db;

const mongoConnect = callback => {
    MongoClient.connect(uri)
        .then(client => {
            console.log('connected')
            _db = client.db()
            callback();
        }).then(err => {
            console.log(err);
            throw err;
        })
    }

const testing = (x, y) => {
    console.log(x+y);
}
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.testing = testing;