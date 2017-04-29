myapp.factory('adminSRV', function($http) {
  return {
    viewServiceProviderRequests: function() {
      return $http.get('/view_sp_requests');
    },
    acceptServiceProviderRequests: function(id){
      return $http.post('/accept_sp_requests',{serviceProviderId:id});
    },
    rejectServiceProviderRequests: function(id){
      return $http.post('/reject_sp_requests',{serviceProviderId:id});
    }
  };
});
