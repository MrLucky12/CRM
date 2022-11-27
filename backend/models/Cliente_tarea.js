var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_tareaSchema = Schema({

    task: {type: String, required: true},
    priority: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    note: {type: String, required: false},
    type: {type: String, required: true},
    state: {type: Boolean, required: true, default: false},
    
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    marca_asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('cliente_tarea', Cliente_tareaSchema);