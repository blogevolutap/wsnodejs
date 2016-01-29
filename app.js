var config = {
	port: '80',		
};

var express = require('express'),
	socketio = require('socket.io');


var app = express(),
	router = express.Router(),
	bodyParser = require('body-parser'),
	fs = require('fs'); //biblioteca de arquivos

//var io = require('socket.io').listen(app.listen(3000));

//carrega todas as funcoes da pasta '/routes'
var models = {}
, routes_path = process.cwd() + '/model'
fs.readdirSync(routes_path).forEach(function (file) {
	if (file.indexOf('.js') != -1) {
		models[file.split('.')[0]] = require(routes_path + '/' + file);
	}
});

app.use('/static', express.static('public'));
//parser para requisicoes post/put
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//valida todas as requisições recebidas
app.all('*', models.security.validate );


/*router.post('/signup', models.auth.signup);
router.post('/login', models.auth.login);
router.post('/validate', models.auth.validate);
router.post('/forgot', models.auth.forgot);
router.get('/userdata', models.auth.userData);
router.put('/userdata', models.auth.updateUserData);

//mapeamento rota routes.{arquivo}.{funcao}
router.get('/test1', models.security.validate);

router.get('/test', models.test.get);

//mapeamento rota com id
router.get('/test/:id', models.test.getById);
*/
router.post('/login', models.auth.login);
router.post('/cadastro', models.auth.cadastrar);
router.get('/email', models.auth.email);

router.post('/cliente', models.cliente.insertCliente);
router.delete('/cliente/:id', models.cliente.deleteCliente);
router.get('/clientes', models.cliente.fetchAll);
router.get('/clienteslist', models.cliente.fetchAllList);
router.get('/cliente/:id', models.cliente.fetchById);

router.post('/produto', models.produto.insertProduto);
router.delete('/produto/:id', models.produto.deleteProduto);
router.get('/produtos', models.produto.fetchAll);
router.get('/produtoslist', models.produto.fetchAllList);
router.get('/produto/:id', models.produto.fetchById);

router.post('/pedido', models.pedido.insertPedido);
router.post('/pagarpedido', models.pedido.pagarPedido);
router.get('/pedidos', models.pedido.fetchAll);
router.get('/pedido/:id', models.pedido.fetchById);

router.get('/usuarion', models.usuario.insertUsuario);
router.get('/usuario', models.usuario.fetchAll);
router.get('/usuario/:id', models.usuario.fetchById);

router.get('/empresa', models.empresa.fetchAll);
router.get('/empresa/:id', models.empresa.fetchById);
//inicia todas as rotas mapeadas
app.use('/api/v1', router);

app.listen(config.port, function() {

	// print a message when the server starts listening
  console.log("server starting on");
});

console.log("Express server listening on port " + config.port);