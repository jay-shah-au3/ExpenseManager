const router = require('express').Router();
const transactionController = require('../../controllers/transaction.controller');

router.get('/all', transactionController.getCombinedAllTransactions);
router.get('/:type', transactionController.getAllTransactions);
router.get('/custom/:d1/:d2', transactionController.getCustomDateAllTransactions);

module.exports = router;