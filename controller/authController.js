const userModel = require("../model/userSchema")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const handleErrors = (err) => {

    let errorObject = { email: '', password: '' }
    if (err.message.includes('registeredusers validation failed')) {

        Object.values(err.errors).forEach(error => {

            errorObject[error.properties.path] = error.properties.message
        })
        return errorObject
    }
    if (err.code === 11000) {
        errorObject.email = 'This email is already registered'

        return errorObject
    }
    if (err.message === 'incorrect email') {
        errorObject.email = 'This email is not registered'
        return errorObject
    }
    if (err.message === 'incorrect password') {
        errorObject.password = 'This password is incorrect'
        return errorObject
    } else {
        console.log(err)
    }
}
const maxAge = 3 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_PASS, { expiresIn: maxAge })
}
module.exports.signup_get = (req, res) => {
    res.render('register.ejs')
}
module.exports.login_get = (req, res) => {
    res.render('login.ejs')
}
module.exports.signup_post = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = new userModel({

            email,
            password
        })
        await user.save()
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        try {
            res.status(201).json({ user: user._id })
        } catch (err) {
            res.status(400).json(err)
        }
    } catch (err) {
        const problem = handleErrors(err)
        res.status(400).json({ problem: problem })


    }
}
module.exports.login_post = async function(req, res) {
    const { email, password } = req.body

    try {

        const userFind = await userModel.login(email, password)
        const token = createToken(userFind._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: userFind._id })
    } catch (err) {
        const problem = handleErrors(err)

        res.status(400).json({ problem: problem })
    }

}
module.exports.logout_get = async function(req, res) {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}