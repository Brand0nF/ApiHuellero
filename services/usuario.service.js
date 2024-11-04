const Usuario = require('../models/usuario.model');

const obtenerUsuarios = async () => {
    try {
        const usuarios = await Usuario.find().lean(); 
        return usuarios;
    } catch (error) {
        throw new Error('Error al obtener usuarios');
    }
};

const crearUsuario = async (data) => {
    try {
        const nuevoUsuario = new Usuario(data);
        await nuevoUsuario.save();
        return nuevoUsuario;
    } catch (error) {
        throw new Error('Error al crear usuario');
    }
};

const actualizarUsuario = async (id, data) => {
    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        Object.assign(usuario, data);
        await usuario.save();
        return usuario;
    } catch (error) {
        throw new Error('Error al actualizar usuario');
    }
};

const eliminarUsuario = async (id) => {
    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        await usuario.remove();
        return { msg: 'Usuario eliminado correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar usuario');
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
