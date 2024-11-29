const express = require('express');
const cors = require('cors');
const sequelize = require('./db'); //database connection
const defineRelationships = require('../../../../471BackEnd/relationships');//datatable relationships
require('./models/index'); //brings in all models
require('./routes/index'); //API routes for functions(need to implement)

const app = express();

//middleware
app.use(cors()); //enable CORS
app.use(express.json()); //parse JSON bodies

//database connection tet
sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error connecting to database:', err));


defineRelationships();//define relationships before ssyncing table

//sync database and recreate tables if necessary
sequelize
    .sync({ force: true }) //drops tables and recreates them on every restart
    .then(() => console.log('Database synced'))
    .catch((err) => console.log('Error syncing database:', err));

//API routes
// app.use('/api/users', routes);//need to update once routes are set

//default route for testing server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

//start server
const PORT = 5000; //random server, can be changed if necesary
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
