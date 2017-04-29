myapp.factory('holdingReservationsSRV', function($http) {
  return {
    getHoldingReservations: function() {
      return $http.get('/holding_reservations')
    }

  };
});