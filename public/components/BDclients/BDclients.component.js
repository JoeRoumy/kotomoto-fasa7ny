angular.module('myapp').
component('BDclients',{
  templateUrl:'components/BDclients/BDclients.template.html',
  controller: function BDController($scope,$state){
      $scope.promote = function(clientId){
        $state.go("promote",{clientId:clientId})
      }
  },
   bindings: {
     data: '='
   }
})
