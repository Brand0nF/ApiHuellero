const Horario = require('../models/horario.model');

const obtenerHorarios = async () => {
    try {
        const horarios = await Horario.find()
            .populate('usuario', 'nombre _id rut fechaNacimiento huellaDigital clavePersonalizada')
            .lean(); 
        return horarios;
    } catch (error) {
        throw new Error('Error al obtener horarios');
    }
};

const crearHorario = async (data) => {
    try {
        const nuevoHorario = new Horario(data);
        await nuevoHorario.save();
        return nuevoHorario;
    } catch (error) {
        throw new Error('Error al crear horario');
    }
};

const actualizarHorario = async (id, data) => {
    try {
        const horario = await Horario.findById(id);

        if (!horario) {
            throw new Error('Horario no encontrado');
        }

        Object.assign(horario, data);
        await horario.save();
        return horario;
    } catch (error) {
        throw new Error('Error al actualizar horario');
    }
};

const eliminarHorario = async (id) => {
    try {
        const horario = await Horario.findById(id);

        if (!horario) {
            throw new Error('Horario no encontrado');
        }

        await horario.remove();
        return { msg: 'Horario eliminado correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar horario');
    }
};

module.exports = {
    obtenerHorarios,
    crearHorario,
    actualizarHorario,
    eliminarHorario
};
