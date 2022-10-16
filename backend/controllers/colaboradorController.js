
var Colaborador = require('../models/Colaborador');
var bcrypt = require('bcrypt-nodejs');

const registro_colaborador_admin = async function(req, res) {
    let data = req.body;
    // console.log(data);
    try {

        var colaboradores = await Colaborador.find({email: data.email});

        bcrypt.hash('123456789', null, null, async function(err, hash)
        {
            if (err) {
                res.status(200).send({data: undefined, message: 'No se pudo generar la password'});        
            }else{
                if (colaboradores.length >= 1) { res.status(200).send({data: undefined, message: 'El correo ya existe'}); } 
                else 
                {
                    data.fullname = data.name +' '+ data.lastName;
                    data.password = hash;
                    let colaborador = await Colaborador.create(data);
                    res.status(200).send({data: colaborador});    
                }
            }
        });

    } catch (error) {
        res.status(200).send({data: undefined, message: 'Verifica los campos del formulario'});
    }

}

module.exports = {
    registro_colaborador_admin
}