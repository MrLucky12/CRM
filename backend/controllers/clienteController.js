
var Cliente = require('../models/Cliente');
var bcrypt = require('bcrypt-nodejs');

const registro_cliente_admin = async function(req, res) {
    // console.log(req.user);
    if ( req.user ) {
        let data = req.body;
        // console.log(data);
        try {
            var clientes = await Cliente.find({email: data.email});

            bcrypt.hash('123456789', null, null, async function(err, hash)
            {
                if (err) {
                    res.status(200).send({data: undefined, message: 'No se pudo generar la password'});        
                }else{
                    if (clientes.length >= 1) { res.status(200).send({data: undefined, message: 'El correo ya existe'}); } 
                    else 
                    {
                        data.fullname = data.name +' '+ data.lastName;
                        data.password = hash;
                        let cliente = await Cliente.create(data);
                        res.status(200).send({data: cliente});    
                    }
                }
            });

        } catch (error) { 
            console.log(error);
            res.status(200).send({data: undefined, message: 'Verifica los campos del formulario'}); 
        } 

    } 
    else{ res.status(403).send({data: undefined, message: 'No Token'}); }
}

module.exports = {
    registro_cliente_admin
}