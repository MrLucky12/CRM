var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_llamadaSchema = Schema({

    date: {type: String, required: true},
    time: {type: String, required: true},
    result: {type: String, required: true},
    note: {type: String, required: false},
    
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('cliente_llamada', Cliente_llamadaSchema);