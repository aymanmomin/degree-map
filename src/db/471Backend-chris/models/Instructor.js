module.exports = (sequelize, DataTypes) => {
const Instructor = sequelize.define('Instructor', {
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
    departmentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    teachingCourseList:{
        type: DataTypes.JSON,
    },
});

return Instructor;
};
