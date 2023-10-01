
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Images = sequelize.define('images', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publicId: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Images;