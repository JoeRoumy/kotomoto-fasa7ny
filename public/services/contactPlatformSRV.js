myapp.factory('contactPlatformSRV', function($http) {
  return {
    contactPlatform: function(msg) {
      //console.log("done");
        return $http.post('/contact_platform',{message:msg});
    }
  };
});
