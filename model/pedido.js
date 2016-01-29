var mongoose = require('./lib/mongoose');
var Pedido = mongoose.pedido;
var ProdutoPedido = mongoose.produtoPedido;
//Validação login do usuario
exports.insertPedido = function(req, res, next){
	var produtos = []
	
	for (var i = 0; i < req.body.produtos.length; i++){
		var produto =  req.body.produtos[i];
		produtos.push(
			new ProdutoPedido({
				produto_id  : produto.produto_id,	
				nome		: produto.nome,
				valor		: produto.valor,
				//Links das imagens na galeria
				imagem		: produto.imagem,
				data_criacao: new Date(),
				fornecedor	: produto.fornecedor,
				categoria	: produto.categoria,	
				quantidade	: produto.qnt,
			})
		);

	}

	var pedido = new Pedido({
		usuario_id  : '565e2bb281f1b0a0150bd9b0',
		empresa_id  : '565e280f3786a03c26caada3',
		codigo		: req.body.codigo,
		infos		: '',
		data_pedido	: new Date('2015-11-20 21:32:00'),
		produtos 	: produtos,
		aceito		: true, //Servidor recebeu pedido
		entregue	: false, //Pedido entregue ao cliente
		valor		: req.body.valor,
		cliente		: req.body.cliente,
		pago		: false //Deu baixa na venda
			
	});

	if (req.body._id){
		pedido._id = req.body._id,
		Pedido.findOneAndUpdate({ _id: req.body._id}, pedido, {upsert: true}, function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		});
	}else{
		pedido.save(function(err, result){
			if (err) return console.log(err);
			res.send(result);	
		})
	}
};

exports.pagarPedido = function(req, res, next){
	console.log("id: " + req.body._id );
	if (req.body._id){
		Pedido.findOne({_id: req.body._id}, function(err, result){
			if (err) return;
			var pedido = result;
			pedido.pago = true;
			Pedido.findOneAndUpdate({ _id: req.body._id}, pedido, {upsert: true}, function(err, result){
				if (err) return console.log(err);
				res.send(result);	
			});
		});		
		
	}
}

exports.fetchAll = function(req, res, next){
	
	Pedido.find(function(err, result){
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
	Pedido.findById(req.params.id, function(err, result){
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