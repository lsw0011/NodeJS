const getDb = require('../util/database').getDb;
var ObjectID = require('mongodb').ObjectID;

const Order  = sequelize.define('orderitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = OrderItem;