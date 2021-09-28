const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
        comment :{
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        }
        
        
}, {timestamp: true})

module.exports = mongoose.model('comment', commentSchema);