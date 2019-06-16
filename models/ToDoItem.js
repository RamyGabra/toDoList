const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoItemSchema = new Schema({
    content: {
        type: String
    },
    completed:{
        type: Boolean
    },
    UserID: {
    	type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = toDoItems = mongoose.model('toDoItems', toDoItemSchema)