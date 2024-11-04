const express = require('express');
const router = express.Router();
const {
    crearHorario,
    obtenerHorarios,
    obtenerHorarioPorId,
    actualizarHorario,
    eliminarHorario
} = require('../controllers/horario.controller');

router.post('/', crearHorario);

router.get('/', obtenerHorarios);

router.get('/:id', obtenerHorarioPorId);

router.put('/:id', actualizarHorario);

router.delete('/:id', eliminarHorario);

module.exports = router;
