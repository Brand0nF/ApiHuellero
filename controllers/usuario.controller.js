const Usuario = require('../models/usuario.model');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().lean();

        const usuariosFormateados = usuarios.map(usuario => ({
            ...usuario,
            fechaNacimiento: usuario.fechaNacimiento.toISOString().split('T')[0]
        }));

        res.json(usuariosFormateados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};


const crearUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();


        const usuarioFormateado = {
            ...usuario.toObject(),
            fechaNacimiento: usuario.fechaNacimiento.toISOString().split('T')[0]
        };

        res.json(usuarioFormateado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear el usuario' });
    }
};

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true }).lean();

        if (!usuarioActualizado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        usuarioActualizado.fechaNacimiento = usuarioActualizado.fechaNacimiento.toISOString().split('T')[0];

        res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }
};


const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id).lean();

        if (!usuarioEliminado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        usuarioEliminado.fechaNacimiento = usuarioEliminado.fechaNacimiento.toISOString().split('T')[0];

        res.json(usuarioEliminado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
