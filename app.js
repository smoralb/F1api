const DEFAULT_PORT = 3000
const connectionString = 'mongodb+srv://smoralber:admin@cluster0.bodor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// require function is a Node js function that helps to use this library, it is like and import
const express = require('express')
const bodyParser= require('body-parser')
const mongoClient = require('mongodb').MongoClient

//Creates an express application
const app = express()
/*
The urlencoded method within body-parser tells body-parser to extract data from 
the <form> element and add them to the body property in the request object.

That's because Express does not read data from the form.
*/
app.use(bodyParser.urlencoded( { extended: true } ))

//Mongo DB supports promises and callbacks

// This is the implementation with callback
/*
mongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })
  */

  //And this, with promises
  mongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
      console.log('Connected to DB')
  }).catch ( error => console.log(error))

//ROUTES
app.get('/', (req, res) => {
    res.send("Hello World again")
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/teams', (req, res) => {
    console.log(req.body);
})

app.listen(DEFAULT_PORT, () => console.log('Server started'))