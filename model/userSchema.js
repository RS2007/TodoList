const mongoose = require('mongoose')
const { Schema } = mongoose
const { model } = mongoose
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'minimum length of password is 6 characters']
    }
})


userSchema.post('save', function(doc, next) {
    console.log('new user created and saved', doc)
    next();
})
userSchema.pre('save', async function(next) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)

        next();
    })
    //adding a static function to apply it to all instances/models of userSchema
userSchema.statics.login = async function(email, password) {


    const user = await this.findOne({ email })

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }

        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const userModel = model('registeredusers', userSchema)
module.exports = userModel