const Puerta = require('../models/puerta.model');

const crearPuerta = async (req, res) => {
    try {
        const puerta = new Puerta(req.body);
        await puerta.save();
        res.status(201).json(puerta);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la puerta', error });
    }
};

const obtenerPuertas = async (req, res) => {
    try {
        const puertas = await Puerta.find();
        res.json(puertas);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las puertas', error });
    }
};

const obtenerPuertaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const puerta = await Puerta.findById(id);

        if (!puerta) {
            return res.status(404).json({ msg: 'Puerta no encontrada' });
        }

        res.json(puerta);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la puerta', error });
    }
};

const actualizarPuerta = async (req, res) => {
    try {
        const { id } = req.params;
        const puerta = await Puerta.findByIdAndUpdate(id, req.body, { new: true });

        if (!puerta) {
            return res.status(404).json({ msg: 'Puerta no encontrada' });
        }

        res.json(puerta);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la puerta', error });
    }
};

const eliminarPuerta = async (req, res) => {
    try {
        const { id } = req.params;
        const puerta = await Puerta.findByIdAndDelete(id);

        if (!puerta) {
            return res.status(404).json({ msg: 'Puerta no encontrada' });
        }

        res.json({ msg: 'Puerta eliminada exitosamente', puerta });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar la puerta', error });
    }
};

module.exports = {
    crearPuerta,
    obtenerPuertas,
    obtenerPuertaPorId,
    actualizarPuerta,
    eliminarPuerta
};
