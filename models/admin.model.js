const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Método para encriptar la contraseña antes de guardar
AdminSchema.pre('save', async function(next) {
    const admin = this;
    if (!admin.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    next();
});

module.exports = model('Admin', AdminSchema);
