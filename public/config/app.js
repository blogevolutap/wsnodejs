var app = angular.module('app', ['ngRoute', 'ngCookies', 'chart.js', 'filereader', 'autocomplete', 'ui.utils.masks']);

var AuthRoles = {
    'admin': 2,
    'user' : 1,
    'guest': 0
};

app.config(function($routeProvider, $locationProvider){

	$routeProvider
	
	.when('/pedidos', {
		templateUrl: 'views/pedidos.html',
		controller: 'PedidosController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Pedidos'},
			routes: [
				{name: 'Dashboard', url: '/'}
			]		
		}
	})
	.when('/pedido', {
		templateUrl: 'views/pedido.html',
		controller: 'PedidoController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Novo'},
			routes: [
				{name: 'Dashboard', url: '/'},
				{name: 'Pedidos', url: 'pedidos'}
			]		
		}
	})
	.when('/pedido/:id', {
		templateUrl: 'views/pedido.html',
		controller: 'PedidoController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Editar'},
			routes: [
				{name: 'Dashboard', url: '/'},
				{name: 'Pedidos', url: 'pedidos'}
			]		
		}
	})
	.when('/produtos', {
		templateUrl: 'views/produtos.html',
		controller: 'ProdutosController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Produtos'},
			routes: [
				{name: 'Dashboard', url: '/'},				
			]		
		}
	})
	.when('/produto', {
		templateUrl: 'views/produto.html',
		controller: 'ProdutoController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Novo'},
			routes: [
				{name: 'Dashboard', url: '/'},
				{name: 'Produtos', url: 'produtos'}
			]		
		}
	})
	.when('/produto/:id', {
		templateUrl: 'views/produto.html',
		controller: 'ProdutoController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Editar'},
			routes: [
				{name: 'Dashboard', url: '/'},
				{name: 'Produtos', url: 'produtos'}
			]		
		}
	})
	.when('/clientes', {
		templateUrl: 'views/clientes.html',
		controller: 'ClientesController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Clientes'},
			routes: [
				{name: 'Dashboard', url: '/'},				
			]		
		}
	})
	.when('/cliente', {
		templateUrl: 'views/cliente.html',
		controller: 'ClienteController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Novo'},
			routes: [
				{name: 'Dashboard', url: '/'},
				{name: 'Clientes', url: 'clientes'}
			]		
		}
	})
	.when('/cliente/:id', {
		templateUrl: 'views/cliente.html',
		controller: 'ClienteController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		},
		breadcrumb:{
			active: {name: 'Editar'},
			routes: [
				{name: 'Dashboard', url: '/'},
				{name: 'Clientes', url: 'clientes'}
			]		
		}
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'AuthController',
		access:{
			requiredLogin: false,
			requiredRole: AuthRoles.guest
		}
	})
	.when('/cadastro', {
		templateUrl: 'views/cadastro.html',
		controller: 'AuthController',
		access:{
			requiredLogin: false,
			requiredRole: AuthRoles.guest
		}
	})
	.when('/produtosvendidos', {
		templateUrl: 'views/produtosvendidos.html',
		controller: 'ProdutosVendidosController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.admin
		}
	})
	.when('/precos', {
		templateUrl: 'views/precos.html',
		controller: 'PrecosController',
		access:{
			requiredLogin: false,
			requiredRole: AuthRoles.guest
		}
	})
	.when('/retorno', {
		templateUrl: 'views/retorno.html',
		controller: 'RetornoController',
		access:{
			requiredLogin: false,
			requiredRole: AuthRoles.guest
		}
	})
	.otherwise( {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardController',
		access:{
			requiredLogin: true,
			requiredRole: AuthRoles.guest
		}
	});
	//$locationProvider.html5Mode(true);
})
.run(function($rootScope, $location, $routeParams, $route) {
	
	$rootScope.irPara = function(path){		
		$location.path(path);
	}

	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
		if ($route.current.$$route){
			$rootScope.breadcrumb = $route.current.$$route.breadcrumb;		  				
		}
	});
});;

toastr.options = {
	positionClass: 'toast-top-center'
}
