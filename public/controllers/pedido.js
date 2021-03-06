app.controller('PedidoController', ['JsonService', '$scope', '$routeParams', '$http', '$sce','$rootScope', '$location',
function(JsonService, $scope, $routeParams, $http, $sce, $rootScope, $location) {
	$scope.produtos = [];
	$scope.nproduto = {};
	$scope.pedido = { valor: '0' };
	$scope.pedido.codigo = gerarCodigo() ;
	var id = $routeParams.id;

	//Se for edição de produto
	if (id){
		console.log(id);
		JsonService.getPedido(id, function success(response){
			$scope.pedido = response;
			$scope.produtos = response.produtos;			
			console.log(response);
		}, function error(response){
			console.log(response);
		});
	}	

	JsonService.getProdutosList().then(function success(response){
		$scope.listProdutos = response;
		console.log(response);
	}, function error(response){
		console.log(response);
	});

	JsonService.getClientesList().then(function success(response){
		$scope.listClientes = response;
		console.log(response);
	}, function error(response){
		console.log(response);
	});

	$scope.selectCliente = function(item){
		$scope.pedido.cliente = item.value._id;
		console.log(item);
	}

	$scope.$watch(
        "nproduto.cliente",
        function handleFooChange( newValue, oldValue ) {
        	if (newValue == undefined) return;
        	if (newValue.length > 3){
		    	JsonService.getClienteByName(newValue, function success(response){		
	    			if (response.length > 0){
	    				var item = response[0];
	    				$scope.pedido.cliente = item._id;
	    			}	
					console.log(response);
				}, function error(response){
					console.log(response);
				});
		    }else{
		    	$scope.pedido.cliente = "";
		    }            
        }
    );

	$scope.$watch(
        "nproduto.nome",
        function handleFooChange( newValue, oldValue ) {
        	if (newValue == undefined) return;
        	if (newValue.length > 3){
		    	JsonService.getProdutoByName(newValue, function success(response){		
	    			if (response.length > 0){
	    				var item = response[0];
	    				$scope.nproduto.valor = item.valor;
						$scope.nproduto.produto_id = item._id;
						$scope.nproduto.quantidade = 1;
	    			}
		    		
					
				}, function error(response){
					console.log(response);
				});
		    }else{
		    	$scope.nproduto.valor = "";
				$scope.nproduto.produto_id = "";
				$scope.nproduto.quantidade = "";
		    }            
        }
    );

	$scope.selectProduto = function(item){
		$scope.nproduto.valor = item.value.valor;
		$scope.nproduto.produto_id = item.value._id;
		$scope.nproduto.quantidade = 1;
		console.log(item);
	}

	$scope.salvarPedido = function(pedido){
		pedido.produtos = $scope.produtos;
		if (validarPedido(pedido)){			
			console.log(pedido);
			JsonService.salvarPedido(pedido, function success(response){
				$scope.produtos = [];
				toastr.success('Pedido salvo');
				$location.path("/pedidos");
				console.log(response);
			}, function error(response){
				console.log(response);
			});		
		}else{
			//Mensagem erro pedido
			toastr.error('Para registrar um pedido você deve preencher o campos de cliente e adicionar um produto');
		}
	}


	$scope.editarProdutoPedido = function($index){
		var produto = $scope.produtos[$index];
		$scope.nproduto = produto;
		$scope.produtos.splice($index, 1);
	}

	$scope.deletarProdutoPedido = function(index){	
		var produto = $scope.produtos[index];
		$scope.pedido.valor = parseInt($scope.pedido.valor) - produto.valor * produto.quantidade;
		$scope.produtos.splice(index, 1);
	}

	$scope.addProduto = function(produto){
		console.log(produto);
		if (validateProduto(produto)){
			$scope.pedido.valor = parseInt($scope.pedido.valor) + produto.valor * produto.quantidade;
			$scope.produtos.push(angular.copy(produto));
			produto.nome = "";
			produto.quantidade = "";
			produto.imagem = "";
			produto.produto_id = "";
			produto.valor = ""
		}else{
			toastr.error('Para adicionar um produto você deve preencher o nome');
		}
	}

	$scope.cancelar = function(){
		$location.path("/pedidos");
	}
	function gerarCodigo(){
		var dDate = new moment(new Date()).format("YYYY-MM-DD-00-hh-mm-ss").toString();
		dDate = dDate.replace(new RegExp("-", 'g'), "");
		return dDate;
	}
	function validarPedido( pedido ){
		if (!pedido.cliente){
			return false;
		}
		if (!pedido.produtos){
			return false;
		}
		return true;
	}

	function validateProduto( produto ){
		if (!produto.nome){
			return false;
		}	
		if (!produto.quantidade){
			return false;
		}

		return true;
	}

}]);