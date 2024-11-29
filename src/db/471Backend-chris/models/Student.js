const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Student = sequelize.define('Student', {
    ucid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    studyYear: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    programCodes: {
        type: DataTypes.JSON, //array of major and minor programs
        allowNull: true,
    },
    
    concentration: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

return Student;
};
