
//Função validação da requisicao
exports.validate = function(req, res, next){
	//Habilita CORS
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	  
	//validar usuário que esta fazendo requisição
	console.log("validate");
	
	/*res.status(403);
    res.json({
      "status": 403,
      "message": "Not authorized"
    });
    return;*/
    
	//continua a requisição
	next();
};
