require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const teamsRouter = require("./src/routes/teams.routes");

const app = express();

mongoose
  .connect(process.env.DATABASE_STRING_SECRET, { useNewUrlParser: true })
  .then(console.log("Connected to Database"))
  .catch((error) => console.error(error));

mongoose.Promise = global.Promise;

/*
  The urlencoded method within body-parser tells body-parser to extract data from 
  the <form> element and add them to the body property in the request object.
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES
app.use("/teams", teamsRouter);

app.listen(process.env.DEFAULT_PORT, () => console.log("Server started"));

module.exports = app;
