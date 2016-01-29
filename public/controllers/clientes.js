app.controller('ClientesController', ['JsonService', '$routeParams','$scope', '$http', '$sce','$rootScope', '$location',
function(JsonService, $routeParams, $scope, $http, $sce, $rootScope, $location) {
	$scope.deleteIndex = -1;
	JsonService.getClientes(function success(response){
		$scope.clientes = response;
		console.log(response);
	}, function error(response){
		console.log(response);
	});

	$scope.novoCliente = function(id){
		$location.path("/cliente");
	}

	$scope.editarCliente = function(id){
		$location.path("/cliente/"+id);
	}
	

	$scope.deletarCliente = function(index){
		$scope.deleteIndex = index;
		console.log("deletarProduto: " + index);
	}

	$scope.confirmaDeletar = function(){		
		if ( $scope.deleteIndex == -1 ) return;
		var id = $scope.produtos[$scope.deleteIndex]._id;
		JsonService.deletarProduto(id, function success(response){
			toastr.success('Produto deletado');
			$scope.produtos.splice($scope.deleteIndex, 1);
			$scope.deleteIndex = -1;
			console.log(response);
		}, function error(response){
			console.log(response);
		});	
		console.log("confirmaDeletar: " + $scope.deleteIndex);
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