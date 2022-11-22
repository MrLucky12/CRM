
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

module.exports = {
    crear_llamada_prospeccion_admin
    
}