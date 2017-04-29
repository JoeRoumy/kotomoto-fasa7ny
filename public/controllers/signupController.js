myapp.controller('signupController',function ($window,$scope,signupSRV) {

  


  $scope.isLoggedIn = function() {
    return !($window.localStorage['tempSignup']==undefined);
  }

  $scope.isUser = function() {
    if(!($window.localStorage['tempSignup']==undefined)){
      return JSON.parse($window.localStorage['tempSignup']).type==0;

  }}

});
