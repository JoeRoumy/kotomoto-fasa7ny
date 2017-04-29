myapp.factory('confirmCheckinSRV',function ($http) {
  return{
    confirmCheckin:function(userName,password,email,type) {
      return $http.post('/signup',{'userName':userName,'password':password,'email':email,'type':type});
    },


  }
});
