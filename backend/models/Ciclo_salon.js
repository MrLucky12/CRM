var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_salonSchema = Schema({

    days: [{type: Object, required: true}],
    course: {type: Schema.ObjectId, ref: 'curso', required: false},
    ciclo_curso: {type: Schema.ObjectId, ref: 'ciclo_curso', required: false},
    room: {type: String, required: true},
    total_capacity: {type: Number, required: true},
    current_capacity: {type: Number, required: true},
    start_time: {type: String, required: true},
    end_time: {type: String, required: true},
    state: {type: String, required: true},

    colaborado: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('ciclo_salon', Ciclo_salonSchema)