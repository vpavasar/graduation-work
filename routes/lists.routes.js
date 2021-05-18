const {Router} = require('express');
const User = require('../models/User');

const router = Router();

router.get('/:userId', async (req, res) => {
    const {userId} = req.params;

    try{
        const user = await User.findById(userId);
        res.status(200).json(user.lists);
    } catch (e) {
        res.status(500).json({
            message: `Server error (GET /listls/${listName}/${userId})`,
            error: e.message
        })
    }
})

router.get('/:listName/:userId', async (req, res) => {
    const {userId, listName} = req.params;

    try{
        const user = await User.findById(userId);
        const list = user.lists[listName];
        res.status(200).json(list);
    } catch (e) {
        res.status(500).json({
            message: `Server error (GET /listls/${listName}/${userId})`,
            error: e.message
        })
    }
})

router.post('/item', async (req, res) => {
    const {userId, itemId, listName} = req.body;

    try{
        const user = await User.findById(userId);
        const list = [...user.lists[listName]];

        list.push(itemId);
        user.lists[listName] = list;
        user.save();

        res.status(201).json(list);
    } catch (e) {
        res.status(500).json({
            message: `Server error (POST /listls)`,
            error: e.message
        })
    }
})

router.delete('/item', async (req, res) => {
    const {userId, itemId, listName} = req.body;
    
    try{
        const user = await User.findById(userId);
        let list = [...user.lists[listName]];

        list = list.filter(id => id !== itemId);
        user.lists[listName] = list;
        user.save();

        res.status(200).json(list);
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /listls)`,
            error: e.message
        })
    }
})

router.delete('/clearList', async (req, res) => {
    const {userId, listName} = req.body;
    
    try{
        const user = await User.findById(userId);
        user.lists[listName] = [];
        user.save();

        res.status(200).json(user.lists[listName]);
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /listls/clearList)`,
            error: e.message
        })
    }
})

router.delete('/clearAll', async (req, res) => {
    const {userId} = req.body;
    
    try{
        const user = await User.findById(userId);

        const lists = {...user.lists};

        for(let listName in lists) {
            if(listName === '$init') continue;
            lists[listName] = [];
        }

        user.lists = {...lists};
        await user.save();

        res.status(200).json(user.lists);
    } catch (e) {
        res.status(500).json({
            message: `Server error (DELETE /listls/clearAll)`,
            error: e.message
        })
    }
})

module.exports = router;