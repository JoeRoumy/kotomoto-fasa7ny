myapp.factory('logInSRV', function($http){
  return{
      login: function(userName,password){
      return $http.post('/login', {'userName':userName, 'password':password});

    }
  };
});
