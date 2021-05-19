const {Schema, model} = require('mongoose');

const schema = new Schema({
    text: String,
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now
    },
    commentObjectId: String,
    commentObjectType: String,
    authorName: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            text: String,
            authorName: String,
            authorId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Schema.Types.Date,
                default: Date.now
            }
        }
    ]
});

module.exports = model('Comment', schema);