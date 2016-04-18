var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/ordernow');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var EmpresaSchema = new Schema({
	empresa_id  : ObjectId,
	nome     	: String,
	cnpj      	: {type: String, unique: true },
	endereco	: {
		cep			: String,
		rua			: String,
		numero		: String,
		complemento	: String,
		cidade		: String,
		estado		: String,
		pais		: String
	},
	logo		: String,
	data_criacao: Date
});

var UsuarioSchema = new Schema({
	usuario_id  : ObjectId,
	empresa_id  : { type: ObjectId, required: true },	
	nome     	: String,
	login		: {type: String, unique: true },
	email		: {type: String, unique: true },
	senha      	: String,
	auth_token	: String,
	endereco	: {
		cep			: String,
		rua			: String,
		numero		: String,
		complemento	: String,
		cidade		: String,
		estado		: String,
		pais		: String
	},	
	data_criacao: Date,
	data_entrada: Date,
	ativo		: Boolean
});


var ProdutoSchema = new Schema({
	produto_id  : ObjectId,
	empresa_id  : { type: ObjectId, required: true },
	nome		: String,
	valor		: String,
	//Links das imagens na galeria
	galeria		: [String],
	data_criacao: Date,
	descricao	: String,
	fornecedor	: String,
	categoria	: String,
	estoque 	: Number,
	ativo		: Boolean
});

var FornecedorSchema = new Schema({
	fornecedor_id  : ObjectId,
	nome	: String,
});

exports.formatMoney = function formatMoney(num, c, d, t){
	var n = num, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


var ProdutoPedidoSchema = new Schema({
	produto_pedido_id  : ObjectId,
	produto_id  : ObjectId,	
	nome		: String,
	valor		: String,
	//Links das imagens na galeria
	imagem		: String,
	data_criacao: Date,
	fornecedor	: String,
	categoria	: String,	
	quantidade	: Number,
});

var PedidoSchema = new Schema({
	pedido_id   : { type:ObjectId},
	usuario_id  : { type:ObjectId, required: true},
	empresa_id  : { type: ObjectId, required: true },
	codigo		: String,
	valor		: String,
	cliente		: String,
	infos		: String,
	produtos	: [ProdutoPedidoSchema],
	data_pedido	: Date,
	aceito		: Boolean, //Servidor recebeu pedido
	entregue	: Boolean, //Pedido entregue ao cliente
	pago		: Boolean //Deu baixa na venda
});

var ClienteSchema = new Schema({	
	cliente_id  : { type: ObjectId },
	codigo		: String,
	nome		: String,
	telefone	: String,
	celular		: String,
	endereco	: String,
	ativo		: Boolean,
});

var EstoqueSchema = new Schema({	
	estoque_id  : { type: ObjectId },
	produto_id  : { type: ObjectId, required: true },
	quantidade	: Number,
});




exports.empresa = mongoose.model("Empresa", EmpresaSchema);
exports.usuario = mongoose.model("Usuario", UsuarioSchema);
exports.produto = mongoose.model("Produto", ProdutoSchema);
exports.fornecedor = mongoose.model("Fornecedor", FornecedorSchema);
exports.pedido  = mongoose.model("Pedido", PedidoSchema);
exports.produtoPedido = mongoose.model("ProdutoPedido", ProdutoPedidoSchema);
exports.cliente = mongoose.model("Cliente", ClienteSchema);