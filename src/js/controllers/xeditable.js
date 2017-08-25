app.controller('XeditableCtrl', ['$scope', '$filter',  '$http', 'editableOptions', 'editableThemes','$modal','MyService','toaster',
  function($scope, $filter, $http, editableOptions,  editableThemes, $modal, MyService,toaster){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
$scope.app={
  color:{azulOscuro: '#58dedf'
  }
};

 $scope.today = function() {
        $scope.filter = '';
      var bandera2="";
      var bandera ="";
      $scope.dt = new Date();
      bandera = $scope.dt;

     bandera2= $filter('date')(new Date(bandera),'dd/MM/yyyy')
    $scope.dt=bandera2;
    };
    $scope.today();



// '#3a3f51';
    $scope.html5 = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null
    };

    $scope.user = {
     //  nombres:'nombres',
     //  apellidos:'apellidos',
    	// name: 'awesome',
    	// desc: 'Dirección',
     //  nacionalidad:'V',
     //  status: 1,
     //  fechaNacimiento:'00/00/0000',
     //  identificacion: 00000000,
     //  sexo: 'M',
     //  remember: false,
     //  profesion: 'Profesion'
    }; 
    $scope.cuenta=[];
    var identificador = MyService.data.idUsuarioCuenta;

 
   $scope.cargaDatos=function(){
      $http.get('http://54.202.62.62:1349/useryii/'+identificador).success(function(respuesta){        
        item=respuesta;
        $scope.cuenta=item;
      });
   };
   $scope.cargaDatos();
    // $scope.cuenta = {
    //   // nombreRazon:'Clinica / Consultorio',
    //   // nRegistro:'J-00000000-0',
    //   // telefono: '(000)-000-0000',
    //   // movil: '(000)-000-0000',
    //   // email: 'email@email.com',
    //   // // telefono: 'awesome',
    //   // direccion: 'Dirección',
    //   // desc: 'Dirección',
    //   // nacionalidad:'V',
    //   // status: 1,
    //   // identificador: 'RIF',
    //   // remember: false,
    //   // profesion: 'Profesion'
    // }; 

    $scope.statuses = [
      {value: 1, text: 'Activo'},
      {value: 2, text: 'Inactivo'},
      {value: 3, text: 'Archivado'}
    ];
       $scope.nacionalidades = [
      {value: 'V', text: 'Venezolano'},
      {value: 'E', text: 'Extranjero'}
    ];

    $scope.sexos = [
      {value: 'H', text: 'hombre'},
      {value: 'M', text: 'mujer'}
    ];
     $scope.identificadores = [
      {value: 'RIF', text: 'Registro de Información Fiscal (RIF)'},
      {value: 'RUF', text: 'Registro Único Tributario (RUT)'},
      {value: 'OTRO', text: 'Otro'}
    ];

     $scope.toaster = {
      typeCuenta: 'success',
      textCuenta: 'Datos de cuenta actualizados con éxito',
      titleCuenta: 'Exito'
    };

     $scope.popCuenta = function(){
      toaster.pop($scope.toaster.typeCuenta, $scope.toaster.titleCuenta, $scope.toaster.textCuenta);
    };
    $scope.openFacebook=function(item){
    MyService.data.cuentaFacebook = item.cuentaF;

  var item=[];
  $scope.items =[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalFacebook.html',
    controller: 'ModalInstanceCtrl',
    size: 'sm',
    resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem,timeout) {
      }, function () {
        $scope.cargaDatos();
    });
};



 $scope.openInstagram=function(item){
    MyService.data.cuentaInstagram = item.cuentaI;

  var item=[];
  $scope.items =[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalInstagram.html',
    controller: 'ModalInstanceCtrl',
    size: 'sm',
    resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem,timeout) {
      }, function () {
        $scope.cargaDatos();
    });
};

 $scope.openTwitter=function(item){
    MyService.data.cuentaTwitter = item.cuentaT;

  var item=[];
  $scope.items =[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalTwitter.html',
    controller: 'ModalInstanceCtrl',
    size: 'sm',
    resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem,timeout) {
      }, function () {
        $scope.cargaDatos();
    });
};


    $scope.save=function(item){
      var user = item;
      var identif = item.id;
      $http.put('http://54.202.62.62:1349/useryii/'+identif, user).success(function(data){
        $scope.popCuenta();
        // $state.go('apps.capgestionar'); 
        });
    };

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : 'Seleccione';
    };

    $scope.showSexo = function() {
      var selected = $filter('filter')($scope.sexos, {value: $scope.user.sexo});
      return ($scope.user.sexo && selected.length) ? selected[0].text : 'Seleccione';
    };
    $scope.showNacionalidad = function() {
      var selected = $filter('filter')($scope.nacionalidades, {value: $scope.user.nacionalidad});
      return ($scope.user.nacionalidad && selected.length) ? selected[0].text : 'Seleccione';
    };
     $scope.showIdentificadores = function() {
      var selected = $filter('filter')($scope.identificadores, {value: $scope.cuenta.identificador});
      return ($scope.cuenta.identificador && selected.length) ? selected[0].text : 'Seleccione';
    };

    // editable table
    $scope.users = [
      {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
      {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
      {id: 3, name: 'awesome user3', status: 2, group: null}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user && user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };
 

    $scope.checkName = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('api/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null 
      };
      $scope.users.push($scope.inserted);
    };

}]);
