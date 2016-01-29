app.controller('AppController', function($scope, $rootScope, $http, $sce, $rootScope, $location, AuthenticationService) {
	//$rootScope.isLogged = AuthenticationService.isLogged();

	$scope.logout = function(){		
		AuthenticationService.logout();
		$location.path("/login");
	}


});