var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_activillamada = Schema({
    type: {type: String, required: true},
    activity: {type: String, required: true},
    
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('cliente_llamada', Cliente_llamadaSchema);