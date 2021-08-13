const {createDiscount, getDiscount, getDiscountByDiscountId, updateDiscount, deleteDiscount} = require('./DiscountController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/', checkToken, createDiscount);
router.get('/', checkToken, getDiscount);
router.get('/:id', checkToken, getDiscountByDiscountId);
router.patch('/', checkToken, updateDiscount);
router.delete('/:id', checkToken, deleteDiscount);
//router.post('/login', login);



module.exports = router;