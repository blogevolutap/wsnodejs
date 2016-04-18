var config = {
	port: '80',
};

//Inclue o pacote do Express
var express = require('express');


var app = express();

//Iniciar o servidor na porta configurada
app.listen(config.port, function() {

	//Exibe mensagem no console informando porta do server
	console.log("Express server listening on port " + config.port);
});