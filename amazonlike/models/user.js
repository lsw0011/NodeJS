const getDb = require('../util/database').getDb

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save(callback) {
        let db = getDb();
        db.collection('users').insertOne(this)
            .then(() => {
                callback();
            })
    }
}
module.exports = User