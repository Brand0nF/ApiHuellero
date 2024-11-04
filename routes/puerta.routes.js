const express = require('express');
const router = express.Router();
const {
    crearPuerta,
    obtenerPuertas,
    obtenerPuertaPorId,
    actualizarPuerta,
    eliminarPuerta
} = require('../controllers/puerta.controller');

router.post('/', crearPuerta);

router.get('/', obtenerPuertas);

router.get('/:id', obtenerPuertaPorId);

router.put('/:id', actualizarPuerta);

router.delete('/:id', eliminarPuerta);

module.exports = router;
