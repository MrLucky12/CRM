var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_cursoSchema = Schema({

    months: [{type: Object, required: true}],
    course: {type: String, required: true},
    level: {type: String, required: true},
    sold_start: {type: String, required: true},
    course_start: {type: String, required: true},
    course_end: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    state: {type: String, required: true},

    colaborado: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('ciclo_curso', Ciclo_cursoSchema)