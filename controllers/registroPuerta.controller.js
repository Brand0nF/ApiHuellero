const RegistroPuerta = require('../models/registroPuerta.model');

const crearRegistroPuerta = async (req, res) => {
    try {
        const registro = new RegistroPuerta(req.body);
        await registro.save();
        res.status(201).json(registro);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el registro de puerta', error });
    }
};

const obtenerRegistrosPuerta = async (req, res) => {
    try {
        const registros = await RegistroPuerta.find().populate('puerta', 'ubicacion');
        res.json(registros);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los registros de puertas', error });
    }
};

const obtenerRegistroPuertaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await RegistroPuerta.findById(id).populate('puerta', 'ubicacion');
        
        if (!registro) {
            return res.status(404).json({ msg: 'Registro de puerta no encontrado' });
        }

        res.json(registro);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el registro de puerta', error });
    }
};

const actualizarRegistroPuerta = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await RegistroPuerta.findByIdAndUpdate(id, req.body, { new: true }).populate('puerta', 'ubicacion');
        
        if (!registro) {
            return res.status(404).json({ msg: 'Registro de puerta no encontrado' });
        }

        res.json(registro);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el registro de puerta', error });
    }
};

const eliminarRegistroPuerta = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await RegistroPuerta.findByIdAndDelete(id);
        
        if (!registro) {
            return res.status(404).json({ msg: 'Registro de puerta no encontrado' });
        }

        res.json({ msg: 'Registro de puerta eliminado exitosamente', registro });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el registro de puerta', error });
    }
};

module.exports = {
    crearRegistroPuerta,
    obtenerRegistrosPuerta,
    obtenerRegistroPuertaPorId,
    actualizarRegistroPuerta,
    eliminarRegistroPuerta
};
