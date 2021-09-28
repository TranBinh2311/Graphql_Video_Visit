const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
        userName: {
            type: String,
            required: true,
        },
        passWord: {
            type: String,
            required: true,
            select: false
        },
        email: 
        {
            type: String,
            required: true,
            unique: true,
        },
        displayName: 
        {
            type: String,
            required: true,
        },
        age:{
            type: String,
            required: true
        },
}, {timestamp: true} )

module.exports = mongoose.model('user', userSchema);