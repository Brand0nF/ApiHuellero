const { Schema, model } = require('mongoose');

const PuertaSchema = Schema({
    ubicacion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['abierta', 'cerrada']
    }
});

module.exports = model('Puerta', PuertaSchema);
