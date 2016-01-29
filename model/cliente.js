var mongoose = require('./lib/mongoose');
var Cliente = mongoose.cliente;

//Validação login do usuario
exports.insertCliente = function(req, res, next){
	var cliente = new Cliente({		
		nome		: req.body.nome,
		codigo		: req.body.codigo,
		telefone	: req.body.telefone,
		celular		: req.body.celular,
		endereco	: req.body.endereco,
		ativo		: true,
		
	});
	
	if (req.body._id){
		cliente._id = req.body._id,
		Cliente.findOneAndUpdate({ _id: req.body._id}, cliente, {upsert: true}, function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}else{		
		cliente.save(function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}
};

exports.deleteCliente = function(req, res, next){
	Cliente.update({ _id: req.params.id},{ ativo: false }, function(err, result){
		if (err) return console.log(err);
		res.send(result);	
	});
	
};

exports.fetchAll = function(req, res, next){
	
	Cliente.find({ativo: true}, function(err, result){
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

exports.fetchAllList = function(req, res, next){
	
	Cliente.find({ativo: true}, function(err, result){
		if (err){
			if (err.name == 'CastError'){
				res.status(404);
				res.send('row id not found');
			}
			res.status(404);
			res.send('row id not found');
		}
		var list = [];
		console.log(result.length);
		for (var i = 0; i < result.length; i++){
			var item = result[i];

			if (item.nome)
				list.push({key: item.nome, value: item});
		}
		res.send(list);	
	})
};

exports.fetchById = function(req, res, next){
	Cliente.findById(req.params.id, function(err, result){
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