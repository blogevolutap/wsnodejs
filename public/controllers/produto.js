app.controller('ProdutoController', ['JsonService', 'FileReader', '$routeParams','$scope', '$http', '$sce','$rootScope', '$location',
function(JsonService, FileReader ,$routeParams, $scope, $http, $sce, $rootScope, $location) {
	var id = $routeParams.id;

	$scope.produto = {};

	//Se for edição de produto
	if (id){
		console.log(id);
		JsonService.getProduto(id, function success(response){
			$scope.produto = response;
			$scope.produto.imagem = $scope.produto.galeria[0];
			console.log(response);
		}, function error(response){
			console.log(response);
		});
	}	

	//Verifica mudança no campo
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {  
        	  FileReader.readAsDataURL(args.file, $scope)		
			    .then(function (resp) {
			        $scope.produto.imagem = resp;
			    }, function (err) {
			        // Do stuff
			        console.log(err);	
			    });
        });
    });

	$scope.salvarProduto = function(produto){
		JsonService.salvarProduto(produto, function success(response){
			toastr.success('Produto salvo');
			$location.path("/produtos");
			console.log(response);
		}, function error(response){
			console.log(response);
		});		
	}


	$scope.cancelar = function(){
		$location.path("/produtos");
	}
	/*$scope.pedidos = [
		{
			"_id":"565e2ef1c24ede542618bef5",
			"usuario_id":"565e2bb281f1b0a0150bd9b0",
			"empresa_id":"565e280f3786a03c26caada3",
			"infos":"",
			"data_pedido":"2015-11-20T23:32:00.000Z",
			"aceito":true,
			"entregue":false,
			"pago":false,
			"__v":0,
			"produtos":[]
		},
		{
			"_id":"565e2ef1c24ede542618bef5",
			"usuario_id":"565e2bb281f1b0a0150bd9b0",
			"empresa_id":"565e280f3786a03c26caada3",
			"infos":"",
			"data_pedido":"2015-11-20T23:32:00.000Z",
			"aceito":true,
			"entregue":false,
			"pago":false,
			"__v":0,
			"produtos":[]
		}
	];*/
	
	/*usuario_id  : { type:ObjectId, required: true},
	empresa_id  : { type: ObjectId, required: true },
	infos		: String,
	data_pedido	: Date,
	aceito		: Boolean, //Servidor recebeu pedido
	entregue	: Boolean, //Pedido entregue ao cliente
	pago		: Boolean //Deu baixa na venda*/
	
}]);