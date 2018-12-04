const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        notNull: true
    },
    email: {
        type: Sequelize.STRING,
        notNull: true
    }
})

module.exports = User;