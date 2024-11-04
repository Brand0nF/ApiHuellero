const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// Registrar un nuevo administrador
const registrarAdmin = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el email ya está registrado
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }

        // Crear nuevo administrador
        admin = new Admin(req.body);

        // Guardar administrador
        await admin.save();

        // Generar JWT
        const token = await generarJWT(admin.id);

        res.status(201).json({
            ok: true,
            admin: {
                nombre: admin.nombre,
                email: admin.email,
                uid: admin.id
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar administrador'
        });
    }
};

// Login del administrador
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el administrador existe
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            });
        }

        // Generar JWT
        const token = await generarJWT(admin.id);

        // Devolver la respuesta con el admin y el token
        res.json({
            ok: true,
            admin: {
                nombre: admin.nombre,
                email: admin.email,
                uid: admin.id
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el login'
        });
    }
};

module.exports = {
    registrarAdmin,
    loginAdmin
};
