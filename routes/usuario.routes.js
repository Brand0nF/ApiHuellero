const { Router } = require('express');
const { 
    obtenerUsuarios, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario 
} = require('../controllers/usuario.controller');

const router = Router();

router.get('/', obtenerUsuarios);

router.post('/', crearUsuario);

router.put('/:id', actualizarUsuario);

router.delete('/:id', eliminarUsuario);

module.exports = router;
