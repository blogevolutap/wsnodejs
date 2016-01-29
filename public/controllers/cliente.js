app.controller('ClienteController', ['JsonService', 'AuthenticationService', '$routeParams','$scope', '$http', '$sce','$rootScope', '$location',
function(JsonService, AuthenticationService ,$routeParams, $scope, $http, $sce, $rootScope, $location) {
	var id = $routeParams.id;

	$scope.cliente = {};
	
	//Se for edição de produto
	if (id){
		console.log(id);
		JsonService.getCliente(id, function success(response){
			$scope.cliente = response;
			
			console.log(response);
		}, function error(response){
			console.log(response);
		});
	}	

	$scope.salvarCliente = function(cliente){
		if (validarCliente(cliente)){
			JsonService.salvarCliente(cliente, function success(response){
				toastr.success('Cliente salvo');
				$location.path("/clientes");
				console.log(response);
			}, function error(response){
				console.log(response);
			});		
		}else{
			toastr.error("Para registrar um cliente preencha o campo nome");
		}
	}

	$scope.cancelar = function(){
		$location.path("/clientes");
	}	

	function validarCliente( cliente ){
		if (!cliente.nome){
			return false;
		}		
		return true;
	}
	
}]);