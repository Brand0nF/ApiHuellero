const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    huellaDigital: {
        type: String,
        required: true
    },
    clavePersonalizada: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);
