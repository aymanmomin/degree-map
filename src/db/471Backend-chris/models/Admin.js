const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Admin = sequelize.define('Admin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courseList:{
        type: DataTypes.JSON,
    },
});

return Admin;
};
