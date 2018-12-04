const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderitem', {
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