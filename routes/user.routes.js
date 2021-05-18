const {Router} = require('express');
const User = require('../models/User');

const router = Router();

router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({
            message: `Server error (/users/${id} GET)`
        })
    }
})

module.exports = router;