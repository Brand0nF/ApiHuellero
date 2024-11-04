const Acceso = require('../models/acceso.model');
const Usuario = require('../models/usuario.model');
const Puerta = require('../models/puerta.model');

const obtenerAccesos = async (req, res) => {
    try {
        const accesos = await Acceso.find()
            .populate('usuario', 'nombre')
            .populate('puerta', 'ubicacion');

        const accesosFormateados = accesos.map(acceso => ({
            _id: acceso._id,
            usuario: {
                _id: acceso.usuario._id,
                nombre: acceso.usuario.nombre
            },
            puerta: {
                _id: acceso.puerta._id,
                ubicacion: acceso.puerta.ubicacion
            },
            accesoPermitido: acceso.accesoPermitido,
            tipoAcceso: acceso.tipoAcceso,
            horaAcceso: formatDate(acceso.horaAcceso),
        }));

        res.json(accesosFormateados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los accesos' });
    }
};

const crearAcceso = async (req, res) => {
    const { usuario, puerta, accesoPermitido, tipoAcceso, horaAcceso } = req.body;

    try {
        const usuarioExistente = await Usuario.findById(usuario);
        const puertaExistente = await Puerta.findById(puerta);

        if (!usuarioExistente) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        if (!puertaExistente) {
            return res.status(404).json({ msg: 'Puerta no encontrada' });
        }

        const nuevoAcceso = new Acceso({
            usuario,
            puerta,
            accesoPermitido,
            tipoAcceso,
            horaAcceso: formatInputDate(horaAcceso)
        });

        await nuevoAcceso.save();
        res.status(201).json(nuevoAcceso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear el acceso', error });
    }
};


const actualizarAcceso = async (req, res) => {
    const { id } = req.params;
    const { accesoPermitido, tipoAcceso, horaAcceso } = req.body;

    try {
        const acceso = await Acceso.findByIdAndUpdate(
            id,
            {
                accesoPermitido,
                tipoAcceso,
                horaAcceso: formatInputDate(horaAcceso)
            },
            { new: true }
        );

        if (!acceso) {
            return res.status(404).json({ msg: 'Acceso no encontrado' });
        }

        res.json(acceso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el acceso' });
    }
};

const eliminarAcceso = async (req, res) => {
    const { id } = req.params;

    try {
        const acceso = await Acceso.findByIdAndDelete(id);

        if (!acceso) {
            return res.status(404).json({ msg: 'Acceso no encontrado' });
        }

        res.json({ msg: 'Acceso eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el acceso' });
    }
};

const formatDate = (date) => {
    const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const formattedDate = new Date(date).toLocaleDateString('en-GB', options)
        .replace(',', '');
    return formattedDate;
};

const formatInputDate = (date) => {
    if (!date) return null;

    const [datePart, timePart] = date.split(', ');
    const [day, month, year] = datePart.split('-').reverse();

    const yearFull = `20${year}`;

    const formattedDate = new Date(`${yearFull}-${month}-${day}T${timePart}`);

    if (isNaN(formattedDate.getTime())) {
        throw new Error('Fecha inválida');
    }

    return formattedDate;
};

module.exports = {
    obtenerAccesos,
    crearAcceso,
    actualizarAcceso,
    eliminarAcceso
};
