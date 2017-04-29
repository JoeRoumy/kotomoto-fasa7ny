myapp.controller('UserBookingsController', function($scope,userSRV) {
  userSRV.viewHistoryBookings().success(function(data){

    $scope.bookings= data;
    console.log($scope.bookings);
  });

});
