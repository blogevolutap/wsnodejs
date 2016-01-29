app.controller('PedidosController', ['JsonService', '$route', '$scope', '$http', '$sce','$rootScope', '$location',
function(JsonService, $route, $scope, $http, $sce, $rootScope, $location) {
	
	JsonService.getPedidos(function success(response){
		$scope.pedidos = response;
		console.log(response);
	}, function error(response){
		console.log(response);
	});

	$scope.novoPedido = function(id){
		$location.path("/pedido");
	}

	$scope.editarPedido = function(id){
		$location.path("/pedido/"+id);
	}

	$scope.pagarPedido = function(){

	}

	$scope.imprimirPedido = function(id){
		JsonService.getPedido(id, function success(response){
			$scope.pedido = response;
			$scope.produtos = response.produtos;			
			console.log(response);
		}, function error(response){
			console.log(response);
		});
		var printContents = "<b>Bold</b>";//document.getElementById(divName).innerHTML;
		var popupWin = window.open('', '_blank', 'width=300,height=300');
		popupWin.document.open()
		popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents + '</html>');
		popupWin.document.close();
	}

	$scope.pagarPedido = function(index){
		$scope.pagarIndex = index;
		console.log("deletarProduto: " + index);
	}

	$scope.confirmaPagar = function(){		
		if ( $scope.pagarIndex == -1 ) return;
		var id = $scope.pedidos[$scope.pagarIndex]._id;
		JsonService.pagarPedido(id, function success(response){
			toastr.success('Pedido pago');
			$scope.pedidos[$scope.pagarIndex].pago = true;
			$scope.pagarIndex = -1;
			console.log(response);
		}, function error(response){
			console.log(response);
		});	
		console.log("confirmaDeletar: " + $scope.pagarIndex);
	}

}]);