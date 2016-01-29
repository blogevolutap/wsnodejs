app.controller('PrecosController', ['JsonService', 'AuthenticationService','$routeParams','$scope', '$http', '$sce','$rootScope', '$location', '$window',
function(JsonService, $rootScope, $routeParams, $scope, $http, $sce, $rootScope, $location, $window) {
	console.log($routeParams);
	$scope.assinar = function(){
		JsonService.assinar("item",function success(response){
			console.log(response);
			$window.location.href = response.links[1].href;
		}, function error(response){
			console.log(response);
		});
	}


}]);