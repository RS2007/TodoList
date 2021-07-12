const todoModel = require('../model/todoSchema')
const mongoose = require('mongoose')
let arr = []

module.exports.todo_get = async(req, res) => {
    try {
        const list = await todoModel.array()

        res.render('todo', { list })

    } catch (err) {
        console.log(err);
    }

}
module.exports.todo_post = async(req, res) => {
    try {
        const list = await todoModel.array()

    } catch (err) {
        throw Error('boom')
    }
    const { todo } = req.body

    try {
        const todoElem = new todoModel({
            todo: todo,
        })
        await todoElem.save()

        try {
            res.redirect('/todo')
        } catch (err) {
            res.status(400).json(err)
        }
    } catch (err) {
        console.log(err.message)
    }

}
module.exports.todo_delete = (req, res) => {
    //res.send(req.query.id)
    todoModel.findByIdAndDelete(req.query.id, (err, deletedRecord) => {
        if (err) { console.log(err) } else {

            res.redirect('/todo')
        }
    })
}