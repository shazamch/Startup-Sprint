const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');

router.post('/', investmentController.createInvestment);
router.get('/', investmentController.getAllInvestments);
router.get('/:id', investmentController.getInvestmentById);
router.get('/user/me', investmentController.getInvestmentsByUserId);
router.get('/startup/:startupId', investmentController.getInvestmentsByStartupId);
router.put('/:id', investmentController.updateInvestment);
router.delete('/:id', investmentController.deleteInvestment);

module.exports = router;