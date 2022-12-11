var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    slug: {type: String, required: true},
    banner: {type: String, required: true},
    state: {type: Boolean, default: true, required: false},

    createdAt: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('curso', CursoSchema);