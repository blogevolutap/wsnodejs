var mongoose = require('./lib/mongoose');
var Estoque = mongoose.estoque;
var Produto = mongoose.produto;

//Inserção de um novo item no Estoque
exports.insertEstoque = function(req, res, next){
	
	var estoque = new Estoque({		
		produto_id  : req.body.produto_id,
		quantidade		: req.body.quantidade,		
	});

	if (req.body._id){
		estoque._id = req.body._id,
		Estoque.findOneAndUpdate({ _id: req.body._id}, estoque, {upsert: true}, function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}else{
		estoque.save(function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		})
	}
};

exports.fetchAll = function(req, res, next){
	
	Estoque.find(function(err, result){
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
	Estoque.findById(req.params.id, function(err, result){
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