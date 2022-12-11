var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Curso_nivelSchema = Schema({

    level: {type: String, required: true},
    
    curso: {type: Schema.ObjectId, ref: 'curso', required: true},

    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('curso_nivel', Curso_nivelSchema)