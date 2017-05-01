myapp.factory('recoverPasswordSRV', function($http){
  return{
    recover:function(userName){
      return $http.post('/recover_password',{'userName':userName});
    }
  };
});
