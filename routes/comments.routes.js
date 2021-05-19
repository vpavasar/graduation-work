const {Router} = require('express');
const Comment = require('../models/Comment');

const router = Router();

router.post('/', async (req, res) => {
    const {
        text,
        commentObjectId,
        commentObjectType,
        authorName,
        authorId
    } = req.body;
    console.log("req.body: ", req.body);

    try {
        const comment = new Comment({
            text,
            commentObjectId,
            commentObjectType,
            authorName,
            authorId
        });
        console.log("New comment: ", req.body);
        
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
    console.log("req.body: ", req.body);

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

router.get('/:object/:id', async (req, res) => {
    const {object, id} = req.params;
    
    try {
        const comments = await Comment.find({ commentObjectId: id, commentObjectType: object });
        // console.log(comments);
        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({
            message: `Server error (GET /comments/:object/:id)`,
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
module.exports = router;