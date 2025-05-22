const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// reading .env files
require('dotenv/config');
const connectionString = process.env.CONNECTION_STRING
const port = process.env.PORT 
const api = process.env.API_URL

// middleware
app.use(cors());
app.use(express.json());


// importing routes
const userRoutes = require('./routes/users.route');

// using routes
app.use(`${api}/users`,userRoutes);


// connect to mongo database
mongoose.connect(connectionString).then(() => {
  console.log("Database is ready to connect");
}).catch((err) => {
  console.log("Error while connecting to database",err);
})

app.listen(port,() => {
  console.log("App is running succesfully");
})