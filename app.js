const DEFAULT_PORT = 3000;

// require function is a Node js function that helps to use this library, it is like and import
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

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
    app.use(bodyParser.json());

    //ROUTES

    app.get("/", (req, res) => {
      teamsCollection
        .find()
        .toArray()
        .then((results) => {
          res.send(results);
        })
        .catch((error) => console.log(error));
    });

    app.get("/form", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.get("/:id", (req, res) => {
      teamsCollection
        .find(ObjectId(req.params.id))
        .toArray()
        .then((results) => {
          res.send(results);
        })
        .catch((error) => console.error(error));
    });

    app.post("/teams", (req, res) => {
      teamsCollection
        .insertOne(req.body)
        .then(res.redirect("/"))
        .catch((error) => console.error(error));
    });

    app.put("/update/:id", (req, res) => {
      console.log(req.body);
      teamsCollection
        .updateOne(
          { _id: ObjectId(req.params.id) },
          { $set: { name: req.body.name, color: req.body.color } }
        )
        .then(res.send("Element updated"))
        .catch((error) => console.error(error));
    });

    app.delete("/:id", (req, res) => {
      teamsCollection
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(res.send("Element deleted"))
        .catch((error) => console.error(error));
    });

    app.listen(DEFAULT_PORT, () => console.log("Server started"));
  })
  .catch((error) => console.log(error));
