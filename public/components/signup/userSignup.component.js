angular.module('myapp').
  component('userSignup',{
    templateUrl:'components/signup/userSignup.template.html',
    controller: function userSignupController($window,$scope,$state,signupSRV){
      var self = this;
      this.signupStepTwo = function() {
       signupSRV.sendUserProfileDetails($scope.firstName,$scope.lastName,$scope.bdate,$scope.gender==undefined? true:$scope.gender,$scope.privacy).success(function(data) {
         if(data.stepTwoOK){
           $window.localStorage['userAccount']=$window.localStorage['tempSignup'];
           $window.localStorage['userProfile'] = angular.toJson(data.userProfile);
           $state.go('home');
       }
       else {
         $scope.errors=(data.validationErrors)?data.validationErrors:data.errors;
       }
       });
      }

    }
});
