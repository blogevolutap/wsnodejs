app.service('JsonService', function($http, Base64,  $q) {
    var $URL = "http://localhost/api/v1";
    this.getEstoques = function(successCallback, errorCallback) {
       $http({
            method: 'GET',
            url: $URL + '/estoques'
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.getEstoque = function(id, successCallback, errorCallback) {
       $http({
            method: 'GET',
            url:  $URL + '/estoque/' + id
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.salvarEstoque = function(estoque, successCallback, errorCallback) {
       $http({
            method: 'POST',
            url:  $URL + '/estoque',
            data: estoque
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }   

    this.getPedidos = function(successCallback, errorCallback) {
       $http({
            method: 'GET',
            url: $URL + '/pedidos'
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.getPedido = function(id, successCallback, errorCallback) {
       $http({
            method: 'GET',
            url:  $URL + '/pedido/' + id
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.pagarPedido = function(id, successCallback, errorCallback) {
       $http({
            method: 'POST',
            url:  $URL + '/pagarpedido/',
            data: {_id: id}
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }


    this.salvarPedido = function(pedido, successCallback, errorCallback) {
       $http({
            method: 'POST',
            url:  $URL + '/pedido',
            data: pedido
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.getProdutosList = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url:  $URL + '/produtoslist'
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
           // successCallback(response.data);
            deferred.resolve(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            deferred.reject(response.data);
            //errorCallback(response.data);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }

    this.getProdutos = function(successCallback, errorCallback) {
        $http({
            method: 'GET',
            url:  $URL + '/produtos'
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);          
        }, function error(response) {
            // called asynchronously if an error occurs            
            errorCallback(response.data);
            // or server returns response with an error status.
        });     
    }
    
    this.getProduto = function(id, successCallback, errorCallback) {
       $http({
            method: 'GET',
            url:  $URL + '/produto/' + id
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.getProdutoByName = function(nome, successCallback, errorCallback) {
       $http({
            method: 'GET',
            url:  $URL + '/produto/byname/' + nome
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.salvarProduto = function(produto, successCallback, errorCallback) {
       $http({
            method: 'POST',
            url:  $URL + '/produto',
            data: produto
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }


    this.deletarProduto = function(id, successCallback, errorCallback) {
       $http({
            method: 'DELETE',
            url:  $URL + '/produto/'+id,
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.getClientes = function(successCallback, errorCallback) {
        $http({
            method: 'GET',
            url:  $URL + '/clientes'
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);          
        }, function error(response) {
            // called asynchronously if an error occurs            
            errorCallback(response.data);
            // or server returns response with an error status.
        });     
    }
    
    this.getClientesList = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url:  $URL + '/clienteslist'
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
           // successCallback(response.data);
            deferred.resolve(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            deferred.reject(response.data);
            //errorCallback(response.data);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }

    this.getCliente = function(id, successCallback, errorCallback) {
       $http({
            method: 'GET',
            url: $URL + '/cliente/' + id
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.getClienteByName = function(nome, successCallback, errorCallback) {
       $http({
            method: 'GET',
            url: $URL + '/cliente/byname/' + nome
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.salvarCliente = function(cliente, successCallback, errorCallback) {
       $http({
            method: 'POST',
            url:  $URL + '/cliente',
            data: cliente
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }


    this.deletarCliente = function(id, successCallback, errorCallback) {
       $http({
            method: 'DELETE',
            url:  $URL + '/cliente/'+id,
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }


    this.login = function(login, successCallback, errorCallback) {
        login.senha = Base64.encode(login.senha);
        console.log(login);
        $http({
            method: 'POST',
            url:  $URL + '/login',
            data: login,
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.cadastrar = function(cadastro, successCallback, errorCallback) {
        cadastro.senha = Base64.encode(cadastro.senha);
        $http({
            method: 'POST',
            url: $URL + '/cadastro',
            data: cadastro,
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }

    this.assinar = function(item, successCallback, errorCallback) {
       
        $http({
            method: 'GET',
            url:  $URL + '/pedido',
        }).then(function success(response) {
            // this callback will be called asynchronously
            // when the response is available
            successCallback(response.data);
        }, function error(response) {
            // called asynchronously if an error occurs
            errorCallback(response.data);
            // or server returns response with an error status.
        });
    }
 
});

