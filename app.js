const DEFAULT_PORT = 3000

const express = require('express')
const res = require('express/lib/response')
const app = express()

//ROUTES
app.get('/', (req, res) => {
    res.send("Hello World again")
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(DEFAULT_PORT, () => console.log('Server started'))