const {createProduct, getProduct, getProductByProductId, updateProduct, deleteProduct, deleteAllProduct, getProductByProductName} = require('./ProductController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/',  createProduct);
router.get('/',  getProduct);
router.get('/:id',  getProductByProductId);
router.get('/search/:name', getProductByProductName);
router.patch('/', updateProduct);
router.delete('/:id', deleteProduct);
router.delete('/', deleteAllProduct);
//router.post('/login', login);



module.exports = router;