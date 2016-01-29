app.controller('RetornoController', ['JsonService', 'AuthenticationService','$routeParams','$scope', '$http', '$sce','$rootScope', '$location', '$window',
function(JsonService, $rootScope, $routeParams, $scope, $http, $sce, $rootScope, $location, $window) {
	console.log($routeParams);
	var paymentId = $routeParams.paymentId;
	var token = $routeParams.token;	

}]);