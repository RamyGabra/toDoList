const express = require('express')
const User = require('./routes/user')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.get('/', (req, res) => res.send('Hello World!'))

//setting up database
const db = 'mongodb+srv://ramyGabra:Nike-1234@cluster0-ymdpc.mongodb.net/test?retryWrites=true&w=majority'

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('the error is ====> ' , err))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//entry points
app.use('/api/user', User)
app.use((req, res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT | 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
