var mongoose = require('./lib/mongoose');
var Empresa = mongoose.empresa;
//Validação login do usuario
exports.insertEmpresa = function(req, res, next){
	var empresa = new Empresa({
		nome: 'Bruno Ramos Botelho',
		cnpj: '0000000000'
	});
	
	empresa.save(function(err, result){
		if (err) return console.log(err);
		res.send(result);	
	})
};

exports.fetchAll = function(req, res, next){
	
	Empresa.find(function(err, result){
		if (err){
			if (err.name == 'CastError'){
				res.status(404);
				res.send('row id not found');
			}
			res.status(404);
			res.send('row id not found');
		}
		res.send(result);	
	})
};

exports.fetchById = function(req, res, next){
	Empresa.findById(req.params.id, function(err, result){
		if (err){
			if (err.name == 'CastError'){
				res.status(404);
				res.send('row id not found');
			}
			res.status(404);
			res.send('row id not found');		
		}
		res.send(result);	
	})
};