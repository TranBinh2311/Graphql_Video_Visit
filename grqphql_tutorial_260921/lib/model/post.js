const mongoose = require('mongoose')



const postSchema = new mongoose.Schema({
        authorId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },

}, {timestamp: true})

module.exports = mongoose.model('post', postSchema);