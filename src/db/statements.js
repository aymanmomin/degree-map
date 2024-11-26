// creating database
const db = require("better-sqlite3")("database.db");
// const db = new sqlite3.Database;

// creating students table
const createTable = () => {
  const sql = `

CREATE TABLE IF NOT EXISTS students (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
mmc_id INT
intake_date DATE,
year_of_study INT,
date_of_birth  DATE NOT NULL,
faculty_id INT
)`;
  db.prepare(sql).run();
};
createTable();
// db.run(`
//     INSERT INTO students (name, email, mmc_id, intake_date, year_of_study, date_of_birth, faculty_id) VALUES ('John Doe', 'john.doe@ucalgary.ca', 1, '2024-05-23', 1, '1999-05-23', 1);
//   `);
