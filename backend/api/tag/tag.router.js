const {createTag, getTag, getTagByTagId, updateTag, deleteTag} = require('./TagController');
//const {login} = require('../user/UserController');
const router = require('express').Router();
const {checkToken} = require('../../Auth/token_validation');
//const { getUnit, getUnitByUnitId } = require('./unit.service');

router.post('/', checkToken, createTag);
router.get('/', checkToken, getTag);
router.get('/:id', checkToken, getTagByTagId);
router.patch('/', checkToken, updateTag);
router.delete('/:id', checkToken, deleteTag);
//router.post('/login', login);



module.exports = router;