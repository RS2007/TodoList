const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { model } = require('mongoose')


const todoSchema = new Schema({
    todo: {
        type: String,

    },
})
todoSchema.post('save', function(doc, next) {
    console.log('todo created and saved', doc)
    next();
})
todoSchema.statics.array = async function() {
    try {
        const list = await this.find()
        return list
    } catch (err) {
        return err
    }
}
const todoModel = model('todo', todoSchema)
module.exports = todoModel