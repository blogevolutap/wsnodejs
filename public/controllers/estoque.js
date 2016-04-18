app.controller('EstoqueController', ['JsonService', 'FileReader', '$routeParams','$scope', '$http', '$sce','$rootScope', '$location',
function(JsonService, FileReader ,$routeParams, $scope, $http, $sce, $rootScope, $location) {
	
	JsonService.getEstoques(function success(response){
		$scope.estoque = response;
		console.log(response);
	}, function error(response){
		console.log(response);
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
	
	
}]);