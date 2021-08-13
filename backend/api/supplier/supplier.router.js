const {createSupplier, getSupplier, getSupplierBySupplierId, updateSupplier, deleteSupplier} = require('./SupplierController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/',  createSupplier);
router.get('/',  getSupplier);
router.get('/:id',  getSupplierBySupplierId);
router.patch('/', updateSupplier);
router.delete('/:id',  deleteSupplier);
//router.post('/login', login);



module.exports = router;