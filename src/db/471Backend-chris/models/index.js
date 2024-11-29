const { Sequelize } = require('sequelize');
const path = require('path');

//initialize Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite', //use 'postgres' or 'mysql' for those databases
    storage: path.join(__dirname, '../database.sqlite'), //path to SQLite database file
    logging: false,
});

//import models
const Faculty = require('./Faculty')(sequelize, Sequelize.DataTypes);
const Department = require('./Department')(sequelize, Sequelize.DataTypes);
const Course = require('./Course')(sequelize, Sequelize.DataTypes);
const Program = require('./Program')(sequelize, Sequelize.DataTypes);
const GraduationReqs = require('./GraduationReqs')(sequelize, Sequelize.DataTypes);
const Major = require('./Major')(sequelize, Sequelize.DataTypes);
const Minor = require('./Minor')(sequelize, Sequelize.DataTypes);
const Student = require('./Student')(sequelize, Sequelize.DataTypes);
const Admin = require('./Admin')(sequelize, Sequelize.DataTypes);
const Instructor = require('./Instructor')(sequelize, Sequelize.DataTypes);

//set up relationships (example)
Faculty.hasMany(Department, { foreignKey: 'facultyId' });
Department.belongsTo(Faculty, { foreignKey: 'facultyId' });
Program.belongsTo(Department, { foreignKey: 'departmentId' });
GraduationReqs.belongsTo(Program, { foreignKey: 'programId' });
Major.belongsTo(Program, { foreignKey: 'programId' });
Minor.belongsTo(Program, { foreignKey: 'programId' });
Student.belongsTo(Faculty, { foreignKey: 'facultyId' });

// export models and sequelize instance
module.exports = {
    sequelize,
    Faculty,
    Department,
    Course,
    Program,
    GraduationReqs,
    Major,
    Minor,
    Student,
    Admin,
    Instructor,
};
