const { Schema, model } = require('mongoose');

const AccesoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    puerta: {
        type: Schema.Types.ObjectId,
        ref: 'Puerta',
        required: true
    },
    accesoPermitido: {
        type: Boolean,
        required: true
    },
    tipoAcceso: {
        type: String,
        enum: ['entrada', 'salida'],
        required: true
    },
    horaAcceso: {
        type: Date,
        required: true
    }
});

module.exports = model('Acceso', AccesoSchema);
