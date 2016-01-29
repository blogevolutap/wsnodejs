var mongoose = require('./lib/mongoose');
var Usuario = mongoose.usuario;
//Validação login do usuario
exports.insertUsuario = function(req, res, next){
	var usuario = new Usuario({
		empresa_id : '565e280f3786a03c26caada3',
		nome: 'Bruno Ramos Botelho',
		login: 'brunor.botelho',
		email: 'brunor.botelho@gmail.com'
			
	});
	
	if (req.body._id){
		usuario._id = req.body._id,
		Usuario.findOneAndUpdate({ _id: req.body._id}, usuario, {upsert: true}, function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}else{
		usuario.save(function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		})
	}
	
};

exports.fetchAll = function(req, res, next){
	
	Usuario.find(function(err, result){
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
	Usuario.findById(req.params.id, function(err, result){
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