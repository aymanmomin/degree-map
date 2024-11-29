const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize, DataTypes) => {
const Program = sequelize.define('Program', {
    programId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    type: DataTypes.STRING, //major or minor
});

return Program;
};
