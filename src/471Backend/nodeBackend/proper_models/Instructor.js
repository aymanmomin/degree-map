require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Instructor = sequelize.define('Instructor', {
    EmployeeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    GivenName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        contains: '@ucalgary.ca',
      },
    },
  });
  return Instructor;
};