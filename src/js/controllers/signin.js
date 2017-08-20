'use strict';

/* Controllers */
//   // signin controller
// app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
//     $scope.user = {};
//     $scope.authError = null;
//     $scope.login = function() {
//       $scope.authError = null;
//       // Try to login
//       $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
//       .then(function(response) {
//         if ( !response.data.user ) {
//           $scope.authError = 'Email or Password not right';
//         }else{
//           $state.go('app.dashboard-v1');
//         }
//       }, function(x) {
//         $scope.authError = 'Server Error';
//       });
//     };
//   }])
// ;



app.controller('SigninFormController', ['$scope', '$filter','$http', '$state', 'MyService','toaster', function($scope,$filter, $http, $state, MyService,toaster) {
    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Datos de cuenta actualizados con exito',
  };
  $scope.filter = '';

  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    $scope.user = {};
    $scope.users=[];
    $scope.miembros=[];
    $scope.full=[];
    $scope.authError = null;
    $scope.item={};
    MyService.data.full=[];
    $scope.item.nombre=MyService.data.nombre;
    $scope.item.apellido=MyService.data.apellido;
    $scope.item.email=MyService.data.email;
    $scope.item.password=MyService.data.password;
    $scope.editItem = function(item){
      if(item){
        item.editing = true;
      }
    };
 

  $scope.doneEditingDatos = function(item){
    var usuarioAct = {};
    MyService.data.idenUser=item.id;
    usuarioAct.nombre=item.nombre;
    usuarioAct.apellido=item.apellido;
    usuarioAct.email=item.email;
    usuarioAct.password=item.password;
    $scope.app.nombre=item.nombre;
    $http.put('http://54.202.62.62:1345/userCot/'+MyService.data.idUsuarioCuenta , usuarioAct)
    MyService.data.datos=item;
    item.editing = false;
    $scope.pop();
  };

  $scope.consultaUsers=function(){
    
    $http.get('http://54.202.62.62:1349/useryii/' ).success(function(respuesta){
    $scope.users = respuesta.results;    
        });
  };
  $scope.consultaMiembros=function(){
    // var existente="no";
    $http.get('http://54.202.62.62:1345/miembro/' ).success(function(respuesta){
      $scope.miembros = respuesta.results; 
        MyService.data.miembros=$scope.miembros;
    });
  };
$scope.selector=function(){
  for (var i=0; i<$scope.users.length; i++) 
      {
        $scope.full.push($scope.users[i]);
      }
  // for (var i=0; i<$scope.miembros.length; i++) 
  //       {
  //       $scope.full.push($scope.miembros[i]);
  //       }     
      if ($scope.full){MyService.data.existente="si";};
    
  for (var i=0; i<$scope.full.length; i++) 
        {
        if ($scope.full[i].email == $scope.user.email && $scope.full[i].password == $scope.user.password)         
          {
          if ($scope.full[i].nivel == 1 )
            {
            MyService.data.nombre=$scope.full[i].nombre;
            MyService.data.apellido=$scope.full[i].apellido;
            MyService.data.email=$scope.full[i].email;
            MyService.data.password=$scope.full[i].password;
            MyService.data.nivel=$scope.full[i].nivel;
            MyService.data.status=$scope.full[i].status;
            $scope.app.status=MyService.data.status;
            $scope.app.nombre=MyService.data.nombre;
            $scope.app.email=MyService.data.email;
            $scope.app.nivel=MyService.data.nivel;
            $scope.app.password=MyService.data.password;
            MyService.data.idUsuarioCuenta=$scope.full[i].id;
            $scope.app.usuario=$scope.full[i].email;
            $state.go('app.dashboard-v1');
            MyService.data.existente="si";
            } 
          if ($scope.full[i].nivel == 3 )
            {
            MyService.letra=$scope.full[i].letra;
            MyService.data.nombre=$scope.full[i].nombresC+" "+$scope.full[i].apellidosC;
            MyService.data.email=$scope.full[i].email;
            MyService.data.password=$scope.full[i].password;
            MyService.data.nivel=$scope.full[i].nivel;
             MyService.data.status=$scope.full[i].status;
            $scope.app.status=MyService.data.status;
            $scope.app.letra=MyService.letra;
            $scope.app.nombre=MyService.data.nombre;
            $scope.app.email=MyService.data.email;
            $scope.app.nivel=MyService.data.nivel;
            $scope.app.password=MyService.data.password;
            MyService.data.idUsuarioCuenta=$scope.full[i].id;
            $scope.app.usuario=$scope.full[i].email; 
            if ($scope.app.status=="pendiente"){
              $state.go('app.finish');
            }
            if ($scope.app.status=="actualizado"){
              $state.go('app.finish');
            }
            MyService.data.existente="si";
            } 
          }
        } 
$scope.comprobador=MyService.data.existente;
      if ( $scope.comprobador=="si"){
        $scope.app.mensaje="";
       $scope.authError = '';    ;
      }
      if ( $scope.comprobador=="no"){
        $scope.app.existente="no";
        $scope.authError = 'Error en los datos, por favor vuelva a intentarlo';    
      }
};
  $scope.consultaUsers();
  // $scope.consultaMiembros();
  $scope.login = function() {
    MyService.data.existente="no";
     $scope.authError = '';
    MyService.data.contador=0;
    setTimeout(function() {
      $scope.selector();
      
      }, 300);
    };

  }]);