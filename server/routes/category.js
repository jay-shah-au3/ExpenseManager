const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getCategories);
router.put('/', categoryController.updateCategory);
router.delete('/:type/:category', categoryController.deleteCategory);

module.exports = router