'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state','MyService', function($scope, $http, $state,MyService) {
    $scope.user = {};
    $scope.datos={};
   
      


    $scope.ok = function(user) {

      // Try to create
      $http.post('http://54.202.62.62:1349/useryii/', {nombre: $scope.user.nombre, email: $scope.user.email, password: $scope.user.password});
      $scope.entrar();
   };

     
    $scope.entrar = function(user) {
    $http.get('http://54.202.62.62:1349/useryii/?email=' +$scope.user.email).success(function(respuesta){
                // if ($scope.email=== 'undefined'){$scope.mensaje="usuario no registrado"}
                     // if (vm.dato !== vm.login.usuario){vm.login.mensaje="usuario no registrado"}
      $scope.datos = respuesta.results[0];
      MyService.data.datos=$scope.datos;
        MyService.data.idUsuario=$scope.datos.id;
             $scope.app.usuario=$scope.datos.email;
             
      });
      $state.go('app.dashboard-v1');
    };
}])