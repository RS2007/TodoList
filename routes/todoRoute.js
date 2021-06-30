const router = require('express').Router()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const todoSchema = require('../models/todoSchema')
const auth = require('../verifyToken')

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get('/todo', auth, async(req, res) => {
    let arr = await todoSchema.find()
    res.render('todo.ejs', { arr })
})
router.post('/todo', async(req, res) => {

    console.log(req.body);
    const { todo } = req.body
    const toSaveTodo = new todoSchema({ todo: todo })

    toSaveTodo.save().then(() => console.log('saved succesfully')).catch((err) => console.log(err))
    let arr = await todoSchema.find()
    res.render('todo.ejs', { arr })
})
router.post('/todo/delete', async(req, res) => {
    console.log(req.query)
    const deletedTodo = await todoSchema.deleteOne({ _id: req.query.id })
    let arr = await todoSchema.find()
    res.render('todo.ejs', { arr })
})
module.exports = router