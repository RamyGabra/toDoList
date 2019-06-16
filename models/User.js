const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String
    },
    password:{
        type: String
    },
    toDoList:{
        type: [
            {
                item: {
                    type: String
                },
                completed: {
                    type: Boolean
                }
            }
        ]
    }
})

module.exports = Users = mongoose.model('Users', userSchema)