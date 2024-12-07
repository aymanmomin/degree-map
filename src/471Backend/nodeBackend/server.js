const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const seedDatabase = require('./seeds/seed');  // import the seed function
const { sequelize } = require('./proper_models'); // import models
//import necessary routes
const studentRoutes = require('./routes/studentRoutes');
const programRoutes = require('./routes/programRoutes');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

//initialize Express backend
const app = express();

//use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is running');
});

//use routes
app.use('/api/students', studentRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);

//sync Sequelize models
sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

const PORT = process.env.PORT || 5000;

//main function to seed and start server
async function startServer() {
  try {
    //run database seeding
    await seedDatabase();
    
    //after seeding is complete, start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
}

//start the server after seeding
startServer();
