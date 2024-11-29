const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Major = sequelize.define('Major', {
        programCode: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        facultyId: {
            type: DataTypes.INTEGER,
        },
        concentrations:{
            type: DataTypes.JSON, //array of concentration options
        },
    });

    return Major;
    };