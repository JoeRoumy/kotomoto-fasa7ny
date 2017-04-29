myapp.factory('serviceProvidersSRV', function($http) {
  return {
    viewAllServiceProviders: function() {
      return $http.get('/view_all_service_providers/');
    }
  };
});
