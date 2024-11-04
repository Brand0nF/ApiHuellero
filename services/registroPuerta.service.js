const RegistroPuerta = require('../models/registroPuerta.model');

const obtenerRegistrosPuerta = async () => {
    try {
        const registros = await RegistroPuerta.find()
            .populate('puerta', 'ubicacion _id')
            .lean();
        return registros;
    } catch (error) {
        throw new Error('Error al obtener registros de puerta');
    }
};

const crearRegistroPuerta = async (data) => {
    try {
        const nuevoRegistro = new RegistroPuerta(data);
        await nuevoRegistro.save();
        return nuevoRegistro;
    } catch (error) {
        throw new Error('Error al crear registro de puerta');
    }
};

module.exports = {
    obtenerRegistrosPuerta,
    crearRegistroPuerta
};
