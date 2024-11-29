const fs = require('fs');
const csv = require('csv-parser');
const { sequelize, Faculty, Department, Program, Course, GraduationReqs, Major, Minor, Student, Admin, Instructor } = require('../models');

//helper function to seed data
const seedModel = async (Model, filePath) => {
  const records = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        records.push(row); // collect each row
      })
      .on('end', async () => { 
        try {
          console.log(records); // debug CSV data
          await Model.bulkCreate(records); // insert data into the table
          console.log(`Seeded ${Model.name} from ${filePath}`);
          resolve();
        } catch (error) {
          console.error(`Error seeding ${Model.name}:`, error);
          reject(error);
        }
      });
  });
};


//main seeding function
const seed = async () => {
    try {
        console.log('Connecting to the database...');
        await sequelize.authenticate();
        console.log('Database connected.');

        console.log('Synchronizing models...');
        await sequelize.sync({ force: true });

        console.log('Seeding data...');
        await seedModel(Faculty, './data/faculties.csv');
        await seedModel(Department, './data/departments.csv');
        await seedModel(Program, './data/programs.csv');
        await seedModel(Course, './data/courses.csv' )
        await seedModel(GraduationReqs, './data/graduation_reqs.csv');
        await seedModel(Major, './data/majors.csv');
        await seedModel(Minor, './data/minors.csv');
        await seedModel(Student, './data/students.csv');
        await seedModel(Admin, './data/admins.csv');
        await seedModel(Instructor, './data/instructors.csv');

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
};

//run the seed script
seed();
