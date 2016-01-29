var mongoose = require('./lib/mongoose'),
	mail = require('./lib/mail'),
	crypto = require('crypto');
var Usuario = mongoose.usuario;
var Empresa = mongoose.empresa;
//Validação login do usuario
exports.login = function(req, res, next){
	
	console.log(req.body);
	Usuario.find(req.body, function(err, result){
		if (err){
			if (err.name == 'CastError'){
				res.status(404);
				res.send('row id not found');
			}
			res.status(404);
			res.send('row id not found');
		}
		var token = randomValueHex(20);
		//Usuario.
		result.auth_token = token;
		console.log(result);
		res.send(result);	
	})
};

exports.cadastrar = function(req, res, next){
	
	var empresa = new Empresa({				
		nome		: req.body.enome,
		cnpj		: req.body.ecnpj,
		//Links das imagens na galeria
		logo		: req.body.elogo,		
		data_criacao: new Date(''),		
	});
	var empresa_id = 0;

	Empresa.find({cnpj: req.body.ecnpj}, function(err, result){
		if (err){
			if (err.name == 'CastError'){
				res.status(404);
				res.send('row id not found');
			}
			res.status(404);
			res.send('row id not found');
		}
		if (result.length > 0){
			console.log(result[0]._id);
			cadastrarUsuario(req, res, result[0]._id);
		}else{
			empresa.save(function(err,result){
				if (err){
					console.log(err);
				}
				if (result){						
					cadastrarUsuario(req, res, result._id);
				}
			});
		}
		console.log(result);
	});
	

};

exports.email = function(req, res, next){
	mail.sendemail();
};

function cadastrarUsuario(req, res, empresa_id){
	console.log("Cadastrar: " + empresa_id);
	var usuario = new Usuario({
		nome     	: req.body.nome,
		empresa_id  : empresa_id,
		login		: req.body.email,
		email		: req.body.email,
		senha      	: req.body.senha,
		data_criacao: new Date(''),
		data_entrada: new Date(''),
		ativo		: true
	});

	if (req.body._id){
		usuario._id = req.body._id,
		Usuario.findOneAndUpdate({ _id: req.body._id}, usuario, {upsert: true}, function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}else{					
		usuario.save(function(err, result){
			if (err){
				if (err.code == 11000){
					res.status(404);
					res.send('EMAIL_EXISTS');	
				}				
				return console.log(err);	
			} 
			res.send(result);	
		});
	}
}

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}
