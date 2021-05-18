const {Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    lists: {
        favorite: [],
        watched: [],
        wish: []
    }
});

module.exports = model('User', schema);