const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser'); 
const { sequelize, Faculty, Department, Course, Program, GraduationRequirement, Major, Minor, Concentration, Student, Admin, Instructor  } = require('../proper_models');

//seed a single CSV file
async function seedFromCSV(model, csvFilePath) {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', async () => {
        try { 
          await model.bulkCreate(data);
          console.log(`Seeded data from ${path.basename(csvFilePath)} successfully!`);
          resolve();
        } catch (err) {
          console.error(`Error seeding data from ${path.basename(csvFilePath)}:`, err);
          reject(err);
        }
      });
  });
}

//main seeding function
async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    await sequelize.sync({ force: true });

    //seed CSV files
    const seedsDir = path.resolve(__dirname, './');
    await seedFromCSV(Faculty, path.join(seedsDir, 'faculties.csv'));
    await seedFromCSV(Department, path.join(seedsDir, 'departments.csv'));
    await seedFromCSV(Program, path.join(seedsDir, 'programs.csv'));
    await seedFromCSV(Course, path.join(seedsDir, 'courses.csv'));
    await seedFromCSV(GraduationRequirement, path.join(seedsDir, 'graduation_reqs.csv'));
    await seedFromCSV(Major, path.join(seedsDir, 'majors.csv'));
    await seedFromCSV(Minor, path.join(seedsDir, 'minors.csv'));
    await seedFromCSV(Concentration, path.join(seedsDir, 'concentrations.csv'));
    await seedFromCSV(Student, path.join(seedsDir, 'students.csv'));
    await seedFromCSV(Admin, path.join(seedsDir, 'admins.csv'));
    await seedFromCSV(Instructor, path.join(seedsDir, 'instructors.csv'));
    

    console.log('Database seeding completed!');
  } catch (err) {
    console.error('Error during database seeding:', err);
    process.exit(1); 
  }
}

module.exports = seedDatabase;
