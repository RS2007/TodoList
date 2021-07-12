const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
const requireAuth = require('./middleware/authMiddleware')
const mongoDB = process.env.DB
const port = 80


app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'ejs')

const mongooseConnect = async() => {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    try {
        console.log('connected to database')
    } catch (err) {
        console.log(err)
    }
}
mongooseConnect();
let arr = []


app.use(authRoutes)
app.use('/todo', todoRoutes)

app.listen(port, () => {
    console.log('sever up and runnning');
})