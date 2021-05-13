const { Router, request } = require('express');
const { check } = require('express-validator');
const { createUser, getUserById, updateUser, getListUsers, deleteById } = require('../controllers/users.controller');
const {verifyEmail, verifyIfMongoIdExist} = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validar-jwt');

const router = Router();

router.get('/list', getListUsers);

router.get('/:id', [
    validateJWT,
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('id').custom(verifyIfMongoIdExist),    
    validateFields
],getUserById);


router.post('/', [
    validateJWT,
    check('name', 'Favor proporcionar un nombre con al menos dos caracteres').isLength({min: 2}),
    check('password', 'Constraseña debe ser de al menos 6 caracteres').isLength({min: 6}),
    check('email', 'Formato de correo inválido').isEmail(),
    check('email').custom(verifyEmail),
    validateFields
],createUser);

router.put('/:id', [
    validateJWT,
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('id').custom(verifyIfMongoIdExist),    
    check('name', 'Favor proporcionar un nombre con al menos dos caracteres').isLength({min: 2}),    
    check('email', 'Formato de correo inválido').isEmail(),
    check('email').custom(verifyEmail),
    validateFields
],updateUser);

router.delete('/:id', [
    validateJWT,
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('id').custom(verifyIfMongoIdExist),    
    validateFields
], deleteById);

module.exports = router;


