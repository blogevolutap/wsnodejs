var mongoose = require('./lib/mongoose');
var Produto = mongoose.produto;
var Fornecedor = mongoose.fornecedor;
//Validação login do usuario
exports.insertProduto = function(req, res, next){
	var produto = new Produto({		
		empresa_id  : '565e280f3786a03c26caada3',
		nome		: req.body.nome,
		valor		: mongoose.formatMoney(req.body.valor, 2),
		//Links das imagens na galeria
		galeria		: [
		       		   req.body.imagem
		],
		descricao	: req.body.descricao,
		data_criacao: new Date(''),
		fornecedor: req.body.fornecedor,
		categoria: req.body.categoria,
		ativo		: true			
	});

	var fornecedor = new Fornecedor({
		nome 		: req.body.fornecedor,
	});
	
	if (req.body._id){
		produto._id = req.body._id,
		Produto.findOneAndUpdate({ _id: req.body._id}, produto, {upsert: true}, function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}else{
		fornecedor.save(function(err,result){});
		produto.save(function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}
};

exports.deleteProduto = function(req, res, next){
	Produto.update({ _id: req.params.id},{ ativo: false }, function(err, result){
		if (err) return console.log(err);
		res.send(result);	
	});
	
};

exports.fetchAll = function(req, res, next){
	
	Produto.find({ativo: true}, function(err, result){
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
	
	Produto.find({ativo: true}, function(err, result){
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
	Produto.findById(req.params.id, function(err, result){
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

exports.fetchByName = function(req, res, next){
	Produto.find({nome: req.params.nome}, function(err, result){
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