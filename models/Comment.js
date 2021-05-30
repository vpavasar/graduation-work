const {Schema, model} = require('mongoose');

const schema = new Schema({
    text: String,
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now
    },
    commentObjectId: String,
    mediaType: String,
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
            },
            reactions: {
                likesCount: {
                    type: Number,
                    default: 0
                },
                dislikesCount: {
                    type: Number,
                    default: 0
                },
                users: [
                    {
                        isPositive: {
                            type: Schema.Types.Boolean,
                        },
                        userName: String,
                        userId: {
                            type: Schema.Types.ObjectId,
                            ref: 'User'
                        },
                        date: {
                            type: Schema.Types.Date,
                            default: Date.now
                        }
                    }
                ]
            }
        }
    ],
    reactions: {
        likesCount: {
            type: Number,
            default: 0
        },
        dislikesCount: {
            type: Number,
            default: 0
        },
        users: [
            {
                isPositive: {
                    type: Schema.Types.Boolean,
                },
                userName: String,
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                date: {
                    type: Schema.Types.Date,
                    default: Date.now
                }
            }
        ]
    }
});

module.exports = model('Comment', schema);