const DEFAULT_PORT = 3000

const express = require('express')
const bodyParser= require('body-parser')

const app = express()
/*
The urlencoded method within body-parser tells body-parser to extract data from 
the <form> element and add them to the body property in the request object.

That's because Express does not read data from the form.
*/
app.use(bodyParser.urlencoded( { extended: true } ))

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