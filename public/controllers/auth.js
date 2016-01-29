app.controller('AuthController', 
function(JsonService, AuthenticationService, $cookies, $cookieStore, $routeParams, $scope, $http, $sce, $rootScope, $location) {
	console.log("Login");
	$scope.usuario = {login: "testnado"};

	$scope.authEntrar = function(usuario){
		console.log("loginFunction");
		var login = {login: usuario.email, senha: usuario.senha};
		JsonService.login(login, function success(response){
			if (response.length > 0){
				AuthenticationService.login();
				AuthenticationService.role = AuthRoles.admin;
				$cookies.put("login", response[0]);
				$location.path("/");				
			}else{
				toastr.error('Usuário ou senha incorretos');
			}

			console.log(response);
		}, function error(response){
			console.log(response);
		});
	}

	$scope.authCadastrar = function(){
		$location.path("/cadastro");
	}

	$scope.cancelar = function(){
		$location.path("/login");
	}
	$scope.cadastrar = function(cadastro){
		JsonService.cadastrar(cadastro, function success(response){
			if (response.ativo == true){
				AuthenticationService.login();			
				$location.path("/auth");
			}else{
				toastr.error('Não foi possível cadastrar. Tente novamente mais tarde');
			}

			console.log(response);
		}, function error(response){
			if (response == 'EMAIL_EXISTS'){
				toastr.error('Este email já está cadastrado');	
			}
			console.log(response);
		});
	}



});