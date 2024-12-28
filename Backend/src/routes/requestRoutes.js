const express = require('express');
const requestController = require('../controllers/requestControler');
const router = express.Router();

router.post('/create', requestController.createRequest);
router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestById);
router.get('/user/:userId', requestController.getRequestsByUserId);
router.get('/founder', requestController.getRequestsByFounderId);
router.patch('/:id/response', requestController.responseRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
