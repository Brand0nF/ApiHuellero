const { Router } = require('express');
const { check } = require('express-validator');
const {
    obtenerAccesos,
    crearAcceso,
    actualizarAcceso,
    eliminarAcceso
} = require('../controllers/acceso.controller');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.get('/', obtenerAccesos);

router.post(
    '/',
    [
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('puerta', 'La puerta es obligatoria').not().isEmpty(),
        check('accesoPermitido', 'El campo accesoPermitido es obligatorio').isBoolean(),
        check('tipoAcceso', 'El tipo de acceso es obligatorio').isIn(['entrada', 'salida']),
        check('horaAcceso', 'La hora de acceso es obligatoria').matches(/^\d{2}-\d{2}-\d{2}, \d{2}:\d{2}:\d{2}$/),
        validateFields
    ],
    crearAcceso
);

router.put(
    '/:id',
    [
        check('accesoPermitido', 'El campo accesoPermitido es obligatorio').isBoolean(),
        check('tipoAcceso', 'El tipo de acceso es obligatorio').isIn(['entrada', 'salida']),
        check('horaAcceso', 'La hora de acceso es obligatoria').matches(/^\d{2}-\d{2}-\d{2}, \d{2}:\d{2}:\d{2}$/),
        validateFields
    ],
    actualizarAcceso
);

router.delete('/:id', eliminarAcceso);

module.exports = router;
