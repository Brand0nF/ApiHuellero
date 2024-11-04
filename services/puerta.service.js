const Puerta = require('../models/puerta.model');

const obtenerPuertas = async () => {
    try {
        const puertas = await Puerta.find().lean(); 
    } catch (error) {
        throw new Error('Error al obtener puertas');
    }
};

const crearPuerta = async (data) => {
    try {
        const nuevaPuerta = new Puerta(data);
        await nuevaPuerta.save();
        return nuevaPuerta;
    } catch (error) {
        throw new Error('Error al crear puerta');
    }
};

const actualizarPuerta = async (id, data) => {
    try {
        const puerta = await Puerta.findById(id);

        if (!puerta) {
            throw new Error('Puerta no encontrada');
        }

        Object.assign(puerta, data);
        await puerta.save();
        return puerta;
    } catch (error) {
        throw new Error('Error al actualizar puerta');
    }
};

const eliminarPuerta = async (id) => {
    try {
        const puerta = await Puerta.findById(id);

        if (!puerta) {
            throw new Error('Puerta no encontrada');
        }

        await puerta.remove();
        return { msg: 'Puerta eliminada correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar puerta');
    }
};

module.exports = {
    obtenerPuertas,
    crearPuerta,
    actualizarPuerta,
    eliminarPuerta
};
