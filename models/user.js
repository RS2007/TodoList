const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },

}, { timestamps: true })

module.exports = new mongoose.model('usernew', userSchema)