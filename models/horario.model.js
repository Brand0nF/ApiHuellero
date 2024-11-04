const { Schema, model } = require('mongoose');

const HorarioSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    entrada: {
        type: String, 
        required: true
    },
    salida: {
        type: String, 
        required: true
    }
});

module.exports = model('Horario', HorarioSchema);
