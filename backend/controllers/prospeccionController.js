
var Cliente_llamada = require('../models/Cliente_llamada');

const crear_llamada_prospeccion_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        let llamada = await Cliente_llamada.create(data);
        res.status(200).send({data: llamada});
    }else{
        res.status(401).send({data: undefined, message: 'NoToken'});
    }
}

const listar_llamadas_prospeccion_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let lista = await Cliente_llamada.find({cliente:id}).populate('asesor').sort({createdAt:-1});
        res.status(200).send({data: lista});
    }else{
        res.status(401).send({data: undefined, message: 'NoToken'});
    }
}

module.exports = {
    crear_llamada_prospeccion_admin,
    listar_llamadas_prospeccion_admin,
    
}