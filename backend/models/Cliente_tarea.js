var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_actividadSchema = Schema({
    date: {type: String, required: true},
    note: {type: String, required: true},
    type: {type: String, required: true},
    state: {type: Boolean, required: true},
    
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    marca_asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('cliente_actividad', Cliente_actividadSchema);