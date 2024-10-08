const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: {type: 'String', required: true},
    summary: {type: 'String'},
    author: {type: 'String'},
    imageUrl: {type: 'String'},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const BookModel = mongoose.model('books', BookSchema)
module.exports = BookModel;