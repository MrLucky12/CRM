
const prueba_test = async function(req, res) {
    // console.log("HOLA TEST")
    res.status(200).send({message: 'HOLA TEST'});
}

module.exports = {
    prueba_test
}