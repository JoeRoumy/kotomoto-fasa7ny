angular.module('myapp').
component('serviceProviderBox',{
  templateUrl:'components/serviceProviderBox/serviceProviderBox.template.html',
  controller: function serviceProviderBoxController($scope,$state,userSRV){
      $scope.openServiceProvider = function(serviceProviderId){
        $state.go("service provider",{serviceProviderId:serviceProviderId})
      }
      
  },
   bindings: {
     data: '='
   }
})
