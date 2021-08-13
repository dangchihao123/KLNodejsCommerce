const { createUser, getUser, getUserByUserId, updateUser, deleteUser, login } = require('./UserController');
const router = require('express').Router();
const { checkToken } = require('../../Auth/token_validation');
//const { body, validationResult } = require('express-validator');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUser);
router.get('/:id', checkToken, getUserByUserId);
router.patch('/', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', login);



module.exports = router;