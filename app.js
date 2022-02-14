const DEFAULT_PORT = 3000;

// require function is a Node js function that helps to use this library, it is like and import
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;

//Creates an express application
const app = express();

//Mongo DB supports promises and callbacks

// This is the implementation with callback
/*
mongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })
  */

//And this, with promises
mongoClient
  .connect(process.env.DATABASE_STRING_SECRET, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to DB");
    const db = client.db("F1-api");

    //COLLECTIONS
    const teamsCollection = db.collection("teams");

    /*
    The urlencoded method within body-parser tells body-parser to extract data from 
    the <form> element and add them to the body property in the request object.
    
    That's because Express does not read data from the form.
    */
    app.use(bodyParser.urlencoded({ extended: true }));

    //ROUTES

    app.get("/", (req, res) => {
      const cursor = db
        .collection("teams")
        .find()
        .toArray()
        .then((results) => {
          console.log(results.json());
        })
        .then(res.send("alo"))
        .catch((error) => console.log(error));
      console.log(cursor);
    });

    app.get("/index", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/teams", (req, res) => {
      teamsCollection
        .insertOne(req.body)
        .then(res.redirect("/"))
        .catch((error) => console.error(error));
    });

    app.listen(DEFAULT_PORT, () => console.log("Server started"));
  })
  .catch((error) => console.log(error));
