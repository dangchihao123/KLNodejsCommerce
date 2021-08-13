const {createUnit, getUnit, getUnitByUnitId, updateUnit, deleteUnit} = require('./UnitController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/', checkToken, createUnit);
router.get('/', checkToken, getUnit);
router.get('/:id', checkToken, getUnitByUnitId);
router.patch('/', checkToken, updateUnit);
router.delete('/:id', checkToken, deleteUnit);
//router.post('/login', login);



module.exports = router;