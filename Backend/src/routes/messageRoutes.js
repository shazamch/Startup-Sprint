const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Set the Socket.IO instance
router.use((req, res, next) => {
    messageController.setSocketIO(req.app.get('io')); 
    next();
});

router.post('/send', messageController.sendMessage);
router.get('/:id', messageController.receiveMessage);

module.exports = router;
