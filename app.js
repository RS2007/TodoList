const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const loginRoute = require('./routes/loginRoute')
const todoRoute = require('./routes/todoRoute')


dotenv.config()
app.set('view engines', 'ejs')

mongoose.connect(process.env['DB_CONNECT'], { useNewUrlParser: true, useUnifiedTopology: true })

const port = 80
app.use(loginRoute)
app.use(todoRoute)
app.use(express.static('public'))


app.listen(port, () => console.log('server up and running'))