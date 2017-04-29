myapp.controller('serviceProvidersForUserController', function($scope,$state,serviceProvidersSRV) {

        $scope.currentPage=1;
        serviceProvidersSRV.viewAllServiceProviders().success(function(data){

            $scope.serviceProviders = data.filter(function(sp){
              return sp.banned ==0;
            })
        })

});
