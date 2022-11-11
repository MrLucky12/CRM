var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    fullname: {type: String, required: true},
    phone: {type: String, required: true},
    gender: {type: String, required: true},
    type: {type: String, default: 'Prospecto', required: true},
    password: {type: String, required:true},
    verify: {type: Boolean, default: false, required: true},
    state: {type: Boolean, default: true, required: true},

    birth: {type: String, required: false},
    n_doc: {type: String, required: false},
    country: {type: String, required: false},
    city: {type: String, required: false},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    
    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('cliente', ClienteSchema);