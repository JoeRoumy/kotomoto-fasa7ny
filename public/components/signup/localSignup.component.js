angular.module('myapp').
  component('localSignup',{
    templateUrl:'components/signup/localSignup.template.html',
    controller: function localSignupController($window,$scope,$state,signupSRV){
      var self = this;
      this.signupStepOne = function() {
       signupSRV.sendAccountDetails($scope.userName,$scope.password,$scope.email,$scope.type==undefined? 0:$scope.type).success(function(data) {
         if(data=='Already a username') return toastr.error("User name taken!");
         if(data=='Duplicate email') return toastr.error("Email already registered!");
         if(data.stepOneOK){
         $window.localStorage['tempSignup'] = angular.toJson(data.userAccount);
       }
       });
      }

    }
});
