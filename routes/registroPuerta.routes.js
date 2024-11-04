const express = require('express');
const router = express.Router();
const {
    crearRegistroPuerta,
    obtenerRegistrosPuerta,
    obtenerRegistroPuertaPorId,
    actualizarRegistroPuerta,
    eliminarRegistroPuerta
} = require('../controllers/registroPuerta.controller');

router.post('/', crearRegistroPuerta);

router.get('/', obtenerRegistrosPuerta);

router.get('/:id', obtenerRegistroPuertaPorId);

router.put('/:id', actualizarRegistroPuerta);

router.delete('/:id', eliminarRegistroPuerta);

module.exports = router;
