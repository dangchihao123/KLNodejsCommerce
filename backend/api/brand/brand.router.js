const {createBrand, getBrand, getBrandByBrandId, updateBrand, deleteBrand} = require('./BrandController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/', checkToken, createBrand);
router.get('/', checkToken, getBrand);
router.get('/:id', checkToken, getBrandByBrandId);
router.patch('/', checkToken, updateBrand);
router.delete('/:id', checkToken, deleteBrand);
//router.post('/login', login);



module.exports = router;