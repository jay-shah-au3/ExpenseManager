const router = require('express').Router();
const incomeController = require('../../controllers/incomeTransaction.controller');

router.post('/', incomeController.addIncomeTransaction);
router.get('/all', incomeController.getAllIncomeTransaction);
router.get('/category/all', incomeController.getAllIncomeTransactionCategory);
router.get('/report/all', incomeController.getAllIncomeTransactionReport);
router.get('/single/:id', incomeController.getIncomeTransactionById);
router.get('/:type', incomeController.getIncomeTransaction);
router.get('/custom/:d1/:d2', incomeController.getCustomDateIncomeTransaction);
router.get('/category/:type', incomeController.getIncomeTransactionCategory);
router.get('/category/custom/:d1/:d2', incomeController.getIncomeTransactionCategoryCustomDate);
router.put('/:id', incomeController.updateIncomeTransaction);
router.delete('/:id', incomeController.deleteIncomeTransaction);

module.exports = router;