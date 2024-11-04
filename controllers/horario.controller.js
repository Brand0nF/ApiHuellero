const Horario = require('../models/horario.model');

const crearHorario = async (req, res) => {
    try {
        const horario = new Horario(req.body);
        await horario.save();
        res.status(201).json(horario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el horario', error });
    }
};

const obtenerHorarios = async (req, res) => {
    try {
        const horarios = await Horario.find().populate('usuario', 'nombre rut fechaNacimiento huellaDigital clavePersonalizada');
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los horarios', error });
    }
};

const obtenerHorarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const horario = await Horario.findById(id).populate('usuario', 'nombre rut fechaNacimiento huellaDigital clavePersonalizada');

        if (!horario) {
            return res.status(404).json({ msg: 'Horario no encontrado' });
        }

        res.json(horario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el horario', error });
    }
};

const actualizarHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const horario = await Horario.findByIdAndUpdate(id, req.body, { new: true }).populate('usuario', 'nombre rut fechaNacimiento huellaDigital clavePersonalizada');

        if (!horario) {
            return res.status(404).json({ msg: 'Horario no encontrado' });
        }

        res.json(horario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el horario', error });
    }
};

const eliminarHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const horario = await Horario.findByIdAndDelete(id);

        if (!horario) {
            return res.status(404).json({ msg: 'Horario no encontrado' });
        }

        res.json({ msg: 'Horario eliminado exitosamente', horario });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el horario', error });
    }
};

module.exports = {
    crearHorario,
    obtenerHorarios,
    obtenerHorarioPorId,
    actualizarHorario,
    eliminarHorario
};
