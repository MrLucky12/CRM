var mongoose = require('mongoose');
var schema = mongoose.Schema;

var MatriculaSchema = Schema(
{
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    source: {type: String, required: true},
    price: {type: Number, required: true},
    scholarship: {type: Number, required: true},
    channel: {type: String, required: true},
    discount: {type: Number, required: true},
    day: {type: String, required: true},
    month: {type: String, required: true},
    day: {type: String, required: true},
    cupon: {type: String, required: false},
    state: {type: String, required: true},
    
    renewal: {type: Schema.ObjectId, ref: 'matricula', required: false},
    renewal_boolean: {type: Date, default: Date.now, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
}
);

module.exports = mongoose.model('matricula', MatriculaSchema);