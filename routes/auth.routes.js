const { Router } = require('express');
const { check } = require('express-validator');
const { registrarAdmin, loginAdmin } = require('../controllers/auth.controller');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

// Ruta para registrar administrador
router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    registrarAdmin
);

// Ruta para login
router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields
    ],
    loginAdmin
);

module.exports = router;
