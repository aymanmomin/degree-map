module.exports = (sequelize, DataTypes) => {
const Faculty = sequelize.define('Faculty', {
    facultyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

return Faculty;

};
