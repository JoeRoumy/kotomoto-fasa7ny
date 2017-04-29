myapp.controller('OffersController', function($scope,$stateParams,$state,offersSRV) {

  if($stateParams.searchInput != undefined || $stateParams.day != undefined){
      offersSRV.add_offer($stateParams.searchInput,$stateParams.day)
      .success(function(data){
        $scope.activities=data;

      })
  }


});
