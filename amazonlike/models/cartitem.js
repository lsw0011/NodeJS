const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartitem', {
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

module.exports = CartItem;