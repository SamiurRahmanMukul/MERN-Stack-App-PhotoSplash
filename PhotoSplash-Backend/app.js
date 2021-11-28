// application documentation
/*Title: PhotoSplash Backend (REST API) - app.js
  Description: PhotoSplash Backend (REST API) Development Using Node.JS & MongoDB Atlas
  Author: Md. Samiur Rahman (Mukul) 
  Website: http://www.SamiurRahmanMukul.epizy.com
  Github: https://www.github.com/SamiurRahmanMukul
  Email: example2022@gmail.com [FAKE EMAIL]
  Date: 27/11/2021 */

// application routes visualization for person
// app.get("api/v1/person");        // GET ALL THE PERSON
// app.get("api/v1/person/:id");    // GET A SINGLE PERSON
// app.post("api/v1/person");       // CREATE A PERSON
// app.put("api/v1/person/:id");    // UPDATE A PERSON
// app.delete("api/v1/person/:id"); // DELETE A PERSON

// external modules imports
const express = require("express");
const dotenv = require("dotenv");
const favicon = require("serve-favicon");

// internal modules imports
const connectDB = require("./src/db/connect");
const personRoute = require("./src/routes/personRoute");

// application config
const app = express();
dotenv.config();

// environment variables
const PORT = process.env.APP_PORT || 5000;
const APP_URL = process.env.APP_URL || "http://localhost:5000";
const MONGODB_URI = process.env.MONGODB_URI;

// database connection establishing
const dbConnection = async () => {
  try {
    connectDB(MONGODB_URI);
    console.log("Database connection established successfully !");
  } catch (error) {
    console.log("MongoBD connection error: " + error);
  }
};

dbConnection(); // database connection establishing called

// application static folder & favicon
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// application middleware
app.use(express.json());

// application routes
app.get("/", (req, res) => {
  res.send("Welcome to PhotoSplash Backend (REST API)");
});

app.use("/api/v1/person", personRoute); // application person routes

// application error handler
// application start
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server listening error: " + err);
  } else {
    console.log("Server is running on: " + APP_URL);
  }
});
