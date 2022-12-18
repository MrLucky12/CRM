var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_salonSchema = Schema({

    days: [{type: Object, required: true}], //FORM
    course: {type: Schema.ObjectId, ref: 'curso', required: false}, //FORM
    ciclo_curso: {type: Schema.ObjectId, ref: 'ciclo_curso', required: false}, //FORM
    room: {type: String, required: true}, //FORM
    total_capacity: {type: Number, required: true}, //FORM
    current_capacity: {type: Number, default: 0, required: true},
    start_time: {type: String, required: true}, //FORM
    end_time: {type: String, required: true}, //FORM
    // state: {type: Boolean, defaul: true, required: true},

    colaborador: {type: Schema.ObjectId, ref: 'colaborador', required: false}, //STATIC
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('ciclo_salon', Ciclo_salonSchema)