module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
    courseCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preRequisites: {
        type: DataTypes.JSON, 
    },
    antiRequisites: {
        type: DataTypes.JSON, 
    },
    topics: {
        type: DataTypes.JSON,
    },
});

return Course;
};
