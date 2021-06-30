const router = require('express').Router()
const User = require('../models/user')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')






router.get('/login', (req, res) => {
    res.render('login.ejs')
})
router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.post('/register', async(req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking if user is in database
    const emailExist = await User.findOne({ username: req.body.username })
    if (emailExist) return res.status(400).send('email already exists')

    //hashing passwords using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })
    try {
        console.log('try')
        const savedUser = await user.save()
        res.redirect('/login')
    } catch (err) {
        res.status(400).send()
    }

})

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    //checking if the email exists
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send('username does not exist')
        //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('invalid password')
        //Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'])

    res.redirect(`/todo?token=${token}`)
})



module.exports = router