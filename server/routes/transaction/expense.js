const router = require('express').Router();
const expenseController = require('../../controllers/expenseTransaction.controller');

router.post('/', expenseController.addExpenseTransaction);
router.get('/all', expenseController.getAllExpenseTransaction);
router.get('/report/all', expenseController.getAllExpenseTransactionReport)
router.get('/category/all', expenseController.getAllExpenseTransactionCategory);
router.get('/single/:id', expenseController.getExpenseTransactionById);
router.get('/:type', expenseController.getExpenseTransaction);
router.get('/custom/:d1/:d2', expenseController.getCustomDateExpenseTransaction);
router.get('/category/:type', expenseController.getExpenseTransactionCategory);
router.get('/category/custom/:d1/:d2', expenseController.getExpenseTransactionCategoryCustomDate);
router.put('/:id', expenseController.updateExpenseTransaction);
router.delete('/:id', expenseController.deleteExpenseTransaction);

module.exports = router;