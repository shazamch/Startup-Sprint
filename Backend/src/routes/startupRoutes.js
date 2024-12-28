const express = require('express');
const router = express.Router();
const startupController = require('../controllers/startupController');

router.post('/', startupController.createStartup);
router.get('/', startupController.getAllStartups);
router.get('/:id', startupController.getStartupById);
router.put('/:id', startupController.updateStartup);
router.delete('/:id', startupController.deleteStartup);
router.post('/:id/links', startupController.addLinksToStartup);
router.delete('/:id/links/:linkType', startupController.removeLinkFromStartup);
router.get('/user/:userId', startupController.getStartupsByUserId);

module.exports = router;
