module.exports = (sequelize, DataTypes) => {
const GraduationReqs = sequelize.define('GraduationReqs', {
    programId: {
        type: DataTypes.STRING, //program id (ie: cpsc, seng..)
        allowNull: false,
    },
    requiredCourses: {
        type: DataTypes.JSON, //array of course codes stored as JSON
    },
    optionalCourses: {
        type: DataTypes.JSON, //array of course codes stored as JSON
    },
    requiredUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, //number of total units required to be completed
});

return GraduationReqs;

}; 
