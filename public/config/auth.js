app.factory('AuthenticationService', function($cookies) {
    var auth = {        
        role: 2            
    }

    auth.login = function(){
        $cookies.put("auth", true);
    }
    
    auth.logout = function(){
        $cookies.remove("auth");
    }

    auth.isLogged = function(){
        var _return = false;
        var logged = $cookies.get("auth");        
        if (logged == undefined) _return = false;
        else _return = true;
     
        return _return;       
    }

 
    return auth;
});


//
app.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        console.log(nextRoute.access);
       // $("body").removeClass("menubar-visible");
        //$("#main-menu .expanded").removeClass("expanded");
        if ($("body").hasClass("menubar-visible"))
            $(".menubar-toggle").click();
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged()) {
            $location.path("/login");
            toastr.warning("Por favor, efetue o login");
        }else
        if (AuthenticationService.role < nextRoute.access.requiredRole){
            console.log("invalid page: check role");
            toastr.warning("Você não tem permissão para acessar esta página");
        }
        $rootScope.isLogged = AuthenticationService.isLogged();
    });
});