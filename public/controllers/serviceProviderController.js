myapp.controller('serviceProviderController', function($scope,$stateParams,userSRV,serviceProviderSRV,loaderSRV) {

  loaderSRV.start();
  if($stateParams.serviceProviderId != undefined){
      serviceProviderSRV.viewServiceProvider($stateParams.serviceProviderId)
      .success(function(data){
        $scope.serviceProvider=data;
        $scope.media=$scope.serviceProvider.provider.media;

        console.log(data);
        loaderSRV.end();
      })
  }

  $scope.subscribe = function(serviceProviderId){
    userSRV.subscribe(serviceProviderId).success(function(){
      console.log("subscribed to service provider succesfully");
    })
  };
  $scope.submitComplain = function(){
      var complainBody = $scope.complainBody;
    serviceProviderSRV.submitComplain(complainBody).success(function(){
      console.log("subscribed to service provider succesfully");
    })
  }
});
