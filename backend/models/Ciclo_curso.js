var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_cursoSchema = Schema({

    months: [{type: Object, required: true}],
    course: {type: String, required: false}, //STATIC
    level: {type: String, required: true}, //FORM
    location: {type: String, required: true}, //FORM
    description: {type: String, required: false}, //FORM
    start_sold: {type: String, required: true},
    start_course: {type: String, required: true}, //FORM
    end_course: {type: String, required: true}, //FORM
    year: {type: Number, required: true},
    price: {type: Number, required: true}, //FORM
    state: {type: Boolean, default:false, required: true},

    colaborador: {type: Schema.ObjectId, ref: 'colaborador', required: false}, //STATIC

    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('ciclo_curso', Ciclo_cursoSchema)