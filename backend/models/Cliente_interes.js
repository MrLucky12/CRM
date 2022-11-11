var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_interesSchema = Schema({
    date: {type: String, required: true},
    note: {type: String, required: true},
    type: {type: String, required: true},
    level: {type: String, required: true},
    cycle: {type: String, required: true},
    
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    course: {type: Schema.ObjectId, ref: 'curso', required: false},

    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('cliente_interes', Cliente_interesSchema);