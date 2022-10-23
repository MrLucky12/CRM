
// SETTING FRAMEWORK EXPRESS
var express = require('express');
var bodyparser = require('body-parser');
var port = process.env.port || 4200;
var mongoose = require('mongoose');
var app = express();

var test_routes = require('./routes/test');
var colaborador_routes = require('./routes/colaborador');

// DB CONNECTION

mongoose.connect('mongodb://localhost:27017/IGP-CRM', {useUnifiedTopology: true, useNewUrlParser: true}, 
                                        (err, res)=>{
                                            if(err){console.log(err);}
                                            else{
                                                console.log("Server Running...");
                                                app.listen(port, function(){console.log("Port: "+port);});
                                            }});



app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

// BACKEND RECIVE DATA FROM EXTERNAL SEVER
app.use((req, res, next)=>{
    //INSERT DATA FROM ANY DOMAIN
    res.header('Access-Control-Allow-Origin', '*');
    // SEND DATA FROM FRONT TO Back
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    //REQUEST METHODS
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET-PUT-POST-DELETE-OPTIONS');
    next();
})

app.use('/api', test_routes);
app.use('/api', colaborador_routes);

// EXPORT VARIABLE APP
module.exports = app;