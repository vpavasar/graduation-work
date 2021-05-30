const {Router} = require('express');
const Comment = require('../models/Comment');

const router = Router();

router.post('/', async (req, res) => {
    const {
        text,
        commentObjectId,
        mediaType,
        authorName,
        authorId
    } = req.body;

    try {
        const comment = new Comment({
            text,
            commentObjectId,
            mediaType,
            authorName,
            authorId
        });
        
        await comment.save();

        res.status(201).json({message: 'Комментарий создан', comment});
    } catch (e) {
        res.status(500).json({
            message: `Server error (POST /comments)`,
            error: e.message
        })
    }
})

router.post('/answer', async (req, res) => {
    const {
        commentId,
        text,
        authorName,
        authorId
    } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        comment.comments.push({
            text,
            authorName,
            authorId
        });
        
        await comment.save();

        res.status(201).json({message: 'Ответ на комментарий создан', comment});
    } catch (e) {
        res.status(500).json({
            message: `Server error (POST /comments/answer)`,
            error: e.message
        })
    }
})

router.get('/user/:userId', async (req, res) => {
    const {userId} = req.params;
    
    try {
        const comments = await Comment.find({authorId: userId});
        
        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({
            message: `Server error (GET /comments/user/:userId)`,
            error: e.message
        })
    }
})

router.get('/:mediaType/:id', async (req, res) => {
    const {mediaType, id} = req.params;
    
    try {
        const comments = await Comment.find({ commentObjectId: id, mediaType: mediaType });
        
        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({
            message: `Server error (GET /comments/:mediaType/:id)`,
            error: e.message
        })
    }
})

router.delete('/comment/:id', async (req, res) => {
    try {
        await Comment.deleteOne({_id: req.params.id});

        res.status(200).json({message: "Комментарий удалён"});
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /comments)`,
            error: e.message
        })
    }
})

router.delete('/answer', async (req, res) => {
    const {rootCommentId, answerId} = req.body;

    try {
        const rootComment = await Comment.findById(rootCommentId);
        let answers = [...rootComment.comments];
        
        answers = answers.filter(answer => answer._id.toString() !== answerId);
        rootComment.comments = answers;

        await rootComment.save();

        res.status(200).json({message: "Ответ удалён"});
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /comments/answer)`,
            error: e.message
        })
    }
})

router.post('/reaction', async (req, res) => {
    const {
        commentId,
        isPositive,
        userName,
        userId
    } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        const userReaction = {
            isPositive,
            userName,
            userId
        };

        comment.reactions.users.push(userReaction);

        if (isPositive) {
            comment.reactions.likesCount = comment.reactions.likesCount + 1;
        } else {
            comment.reactions.dislikesCount = comment.reactions.dislikesCount + 1;
        }
        
        await comment.save();

        res.status(201).json({message: 'Реакция на комментарий создана', comment});
    } catch (e) {
        res.status(500).json({
            message: `Server error (POST /comments/reaction)`,
            error: e.message
        })
    }
})

router.delete('/reaction', async (req, res) => {
    const {
        commentId,
        isPositive,
        userId
    } = req.body;

    try {
        const comment = await Comment.findById(commentId);
        const users = comment.reactions.users.filter(user => user._id.toString() !== userId);
        
        comment.reactions.users = [...users];

        if (isPositive) {
            comment.reactions.likesCount = comment.reactions.likesCount - 1;
        } else {
            comment.reactions.dislikesCount = comment.reactions.dislikesCount - 1;
        }
        
        await comment.save();

        res.status(201).json({message: 'Реакция на комментарий удалена', comment});
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /comments/reaction)`,
            error: e.message
        })
    }
})

router.post('/answer/reaction', async (req, res) => {
    const {
        rootCommentId,
        answerId,
        isPositive,
        userName,
        userId
    } = req.body;

    try {
        const comment = await Comment.findById(rootCommentId);

        const userReaction = {
            isPositive,
            userName,
            userId
        };
        
        const answerIdx = comment.comments.findIndex(answer => answer._id.toString() === answerId);
        
        const answer = comment.comments[answerIdx];

        answer.reactions.users.push(userReaction);

        if (isPositive) {
            answer.reactions.likesCount = answer.reactions.likesCount + 1;
        } else {
            answer.reactions.dislikesCount = answer.reactions.dislikesCount + 1;
        }
        
        await comment.save();

        res.status(201).json({message: 'Реакция на отзыв к комментарию создана', comment});
    } catch (e) {
        res.status(500).json({
            message: `Server error (POST /comments/answer/reaction)`,
            error: e.message
        })
    }
})

router.delete('/answer/reaction', async (req, res) => {
    const {
        rootCommentId,
        answerId,
        isPositive,
        userId
    } = req.body;

    try {
        const comment = await Comment.findById(rootCommentId);

        const answerIdx = comment.comments.findIndex(answer => answer._id.toString() === answerId);
        const answer = comment.comments[answerIdx];

        const users = answer.reactions.users.filter(user => userId.toString() !== userId);

        answer.reactions.users = [...users];

        if (isPositive) {
            answer.reactions.likesCount = answer.reactions.likesCount - 1;
        } else {
            answer.reactions.dislikesCount = answer.reactions.dislikesCount - 1;
        }

        await comment.save();

        res.status(201).json({message: 'Реакция на отзыв к комментарию удалена', comment});
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /comments/answer/reaction)`,
            error: e.message
        })
    }
})

module.exports = router;