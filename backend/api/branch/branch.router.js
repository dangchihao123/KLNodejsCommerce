const {createBranch, getBranch, getBranchByBranchId, updateBranch, deleteBranch} = require('./BranchController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/', checkToken, createBranch);
router.get('/', checkToken, getBranch);
router.get('/:id', checkToken, getBranchByBranchId);
router.patch('/', checkToken, updateBranch);
router.delete('/:id', checkToken, deleteBranch);
//router.post('/login', login);



module.exports = router;