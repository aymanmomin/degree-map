module.exports = (sequelize, DataTypes) => {
    const Minor = sequelize.define('Minor', {
        programCode: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        facultyId: {
            type: DataTypes.INTEGER,
        },
    });

    return Minor;
    };