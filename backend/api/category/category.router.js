const {createCategory, getCategory, getCategoryByCategorytId, updateCategory, deleteCategory} = require('./CategoryController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/', checkToken, createCategory);
router.get('/', checkToken, getCategory);
router.get('/:id', checkToken, getCategoryByCategorytId);
router.patch('/', checkToken, updateCategory);
router.delete('/:id', checkToken, deleteCategory);
//router.post('/login', login);



module.exports = router;