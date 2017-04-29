myapp.factory('promotionsSRV', function($http) {
  return {
    getBDClients: function() {
      return $http.get('/view_birthDay_clients')
    },
      promoteToClient: function() {
        return $http.post('/promote_to_clients',{clientId:clientId});
    }
  };
});
