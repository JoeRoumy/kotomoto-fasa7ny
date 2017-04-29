myapp.controller('holdingReservationsController', function($scope,holdingReservationsSRV) {
    //getting latest reviews
    holdingReservationsSRV.getHoldingReservations().success(function(data){
      $scope.reservations=data;
      
    })



});
