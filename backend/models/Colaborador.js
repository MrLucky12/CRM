
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColaboradorSchema = Schema({
    name: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    fullname: {type: String, required:true},
    phone: {type: String, required:false},
    role: {type: String, required:true},
    gender: {type: String, required:true},
    n_doc: {type: String, required: false},
    password: {type: String, required:true},
    state: {type: Boolean, default: true, required:true},
    country: {type: String, required:false},

    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('colaborador', ColaboradorSchema);