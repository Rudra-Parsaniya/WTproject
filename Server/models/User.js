const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: 'String', required: true, unique: true},
    password: {type: 'String', required: true},
    savedBooks: [{type: mongoose.Schema.Types.ObjectId, ref:"Book"}]
})

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;