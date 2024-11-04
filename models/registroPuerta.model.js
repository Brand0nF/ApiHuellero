const { Schema, model } = require('mongoose');

const RegistroPuertaSchema = Schema({
    puerta: {
        type: Schema.Types.ObjectId,
        ref: 'Puerta',
        required: true
    },
    accion: {
        type: String,
        required: true,
        enum: ['Apertura', 'Cierre']
    },
    hora: {
        type: String, 
        required: true
    }
});

module.exports = model('RegistroPuerta', RegistroPuertaSchema);
