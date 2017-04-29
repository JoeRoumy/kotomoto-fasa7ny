myapp.factory('promotionSRV', function($http) {
  return {
    getBDCLients: function() {
      return $http.get('/view_birthDay_clients')
    }

      

  };
});