const Acceso = require('../models/acceso.model');

const obtenerAccesos = async () => {
    try {
        const accesos = await Acceso.find()
            .populate('usuario', 'nombre _id')
            .populate('puerta', 'ubicacion _id')
            .lean(); 
        return accesos;
    } catch (error) {
        throw new Error('Error al obtener accesos');
    }
};

const crearAcceso = async (data) => {
    try {
        const nuevoAcceso = new Acceso(data);
        await nuevoAcceso.save();
        return nuevoAcceso;
    } catch (error) {
        throw new Error('Error al crear acceso');
    }
};

const actualizarAcceso = async (id, data) => {
    try {
        const acceso = await Acceso.findById(id);

        if (!acceso) {
            throw new Error('Acceso no encontrado');
        }

        Object.assign(acceso, data);
        await acceso.save();
        return acceso;
    } catch (error) {
        throw new Error('Error al actualizar acceso');
    }
};

const eliminarAcceso = async (id) => {
    try {
        const acceso = await Acceso.findById(id);

        if (!acceso) {
            throw new Error('Acceso no encontrado');
        }

        await acceso.remove();
        return { msg: 'Acceso eliminado correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar acceso');
    }
};

module.exports = {
    obtenerAccesos,
    crearAcceso,
    actualizarAcceso,
    eliminarAcceso
};
