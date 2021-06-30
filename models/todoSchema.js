const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        max: 44
    }
})


module.exports = new mongoose.model('usertodo3', todoSchema)